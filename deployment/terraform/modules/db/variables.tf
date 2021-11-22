

variable "vpc_private_subnets" {
    description = "Private subnets from the vpc"
    type = list
}

variable "database_admin_password" {
    description = "password for the mysql root account"
    type = string
}

variable "vpc_db_sg" {
    description = "Security group for the database, from the vpc"
    type = string
}

variable "db_az" {
    description = "Availability zone for the database"
    type = string
}