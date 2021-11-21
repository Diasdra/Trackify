terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }

  required_version = ">= 0.14.9"
}
provider "aws" {
  region = var.region
}

data "aws_availability_zones" "available" {
  state = "available"
}

// VPC for all applications
resource "aws_vpc" "main" {
  cidr_block = "10.152.0.0/16"
  tags = {
    Name = "Trackify Private Cloud"
  }
}
//Private Subnet - For connection of RDS and EC2 Instances
resource "aws_subnet" "private1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.152.1.0/24"
  availability_zone = data.aws_availability_zones.available.names[0]

  tags = {
    Name = "Private Subnet"
  }
}
resource "aws_subnet" "private2" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.152.2.0/24"
  availability_zone = data.aws_availability_zones.available.names[1]
  
  tags = {
    Name = "Private Subnet"
  }
}
//Public Subnet - For attaching an internet gateway
resource "aws_subnet" "public" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.152.3.0/24"
  map_public_ip_on_launch = true

  tags = {
    Name = "Public Subnet"
  }
}
//Internet gateway to allow EC2 Instance to connect to Azure LB
resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "Trackify Internet Connection"
  }
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"

    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "public_route_association" {
  subnet_id = aws_subnet.public.id
  route_table_id = aws_route_table.public_route_table.id
}

// resource "aws_route_table" "internetConnect" {
//   vpc_id = aws_vpc.main.id

//   route {
//     cidr_block = aws_subnet.public.cidr_block
//     gateway_id = aws_internet_gateway.gw.id
//   }
// }

// RDS Security group to allow MySQL calls from EC2 Instances
resource "aws_db_subnet_group" "default" {
  name       = "main"
  subnet_ids = [aws_subnet.private1.id, aws_subnet.private2.id]
  tags = {
    Name = "DB Subet Group"
  }
}
resource "aws_security_group" "appdatabase" {
  name        = "allow_mysql"
  description = "Allow MySQL connections over private network"
  vpc_id      = aws_vpc.main.id
  tags = {
    Name = "allow_mysql"
  }

  ingress {
    description = "MySQL 3306 from VPC"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.main.cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


// MySQL (Free) DB using AWS RDS
resource "aws_db_instance" "mysql" {
  allocated_storage     = 20
  max_allocated_storage = 0
  engine                = "mysql"
  engine_version        = "8.0"
  instance_class        = "db.t2.micro"

  name     = "trackifydb"
  username = "prisma"
  password = var.database_admin_password

  parameter_group_name   = "default.mysql8.0"
  skip_final_snapshot    = true
  deletion_protection    = false
  db_subnet_group_name   = aws_db_subnet_group.default.name
  vpc_security_group_ids = [aws_security_group.appdatabase.id]
  availability_zone      = data.aws_availability_zones.available.names[0]
}


// Build Web application instances
// Source up to date AMIs
data "cloudinit_config" "server_config" {
  gzip          = true
  base64_encode = true
  part {
    content_type = "text/cloud-config"
    content = templatefile("${path.module}/trackify.yml", {
      db_url : aws_db_instance.mysql.address
    })
  }
}
//Application AMI built by Packer. Use most recent version
data "aws_ami" "trackify_ami" {
  most_recent = true
  name_regex  = "trackify-app-*"
  owners      = ["self"]
}

resource "aws_security_group" "applicationGroup" {
  name        = "allow 8000"
  description = "Allow connections to 8000 from anywhere"
  vpc_id      = aws_vpc.main.id
  tags = {
    Name = "allow_8000"
  }

  ingress {
    description = "Allow 8000 from anywhere"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "Allow 8000 from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

//Application instances to be load balanced
resource "aws_instance" "trackify_app" {
  count         = 2
  instance_type = "t2.micro"
  ami           = data.aws_ami.trackify_ami.id
  subnet_id     = aws_subnet.public.id
  key_name      = var.ssh_key

  vpc_security_group_ids      = [aws_security_group.applicationGroup.id]
  associate_public_ip_address = true

  user_data = data.cloudinit_config.server_config.rendered
}