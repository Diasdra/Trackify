

variable "private_subnet_1" {
    description = "Private subnet for the app instance"
    type = string
}

variable "ssh_key" {
    description = "SSH key name to connect to the instance with SSH"
    type = string
}

variable "private_sg" {
    description = "The private security group from the VPC"
    type = string
}

variable "DBEndpoint" {
    description = "Address of the mysql database"
    type = string
}
variable "DBUsername" {
    description = "Database connection Username"
    type = string
}
variable "DBPassword" {
    description = "Database connection Password"
    type = string
}
variable "DBName" {
    description = "Database's name"
    type = string
}