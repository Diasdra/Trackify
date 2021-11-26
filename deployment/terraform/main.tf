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

module "trackify_vpc" {
  source = "./modules/vpc"

  vpc_cidr_block = "10.0.0.0/16"
  public_cidr_1 = "10.0.1.0/24"
  public_cidr_2 = "10.0.2.0/24"
  private_cidr_1 = "10.0.3.0/24"
  private_cidr_2 = "10.0.4.0/24"
  az1 = "${var.region}a"
  az2 = "${var.region}b"
}

module "trackify_db" {
  source = "./modules/db"

  vpc_private_subnets = module.trackify_vpc.vpc_private_subnets
  database_admin_password = var.database_admin_password
  vpc_db_sg = module.trackify_vpc.db_sg
  db_az = data.aws_availability_zones.available.names[0]
}

module "trackify_ec2" {
  source = "./modules/ec2"

  db_url = module.trackify_db.db_url
  private_subnet_1 = module.trackify_vpc.private_subnet_1
  ssh_key = var.ssh_key
  private_sg = module.trackify_vpc.private_sg
  db_user = aws_db_instance.mysql.username
  db_pass = var.database_admin_password
  db_url  = aws_db_instance.mysql.endpoint
  db_name = aws_db_instance.mysql.name
}

module "trackify_lb" {
  source = "./modules/lb"

  vpc_public_sg_id = module.trackify_vpc.public_sg
  vpc_public_subnets = module.trackify_vpc.public_subnets
  vpc_id = module.trackify_vpc.vpc_id
  instance_ids = module.trackify_ec2.instance_ids
}