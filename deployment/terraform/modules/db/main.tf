
resource "aws_db_subnet_group" "db_subnet_group" {
    name = "main"
    subnet_ids = var.vpc_private_subnets

    tags = {
        Name = "DB Subnet Group"
    }
}

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
  db_subnet_group_name   = aws_db_subnet_group.db_subnet_group.name
  vpc_security_group_ids = [var.vpc_db_sg]
  availability_zone      = var.db_az
}