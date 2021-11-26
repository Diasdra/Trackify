
variable "db_url" {
    description = "Address of the mysql database"
    type = string
}

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