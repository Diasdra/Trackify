
variable "vpc_cidr_block" {
    description = "cidr block for the VPC"
    type = string
}

variable "private_cidr_1" {
    description = "CIDR block for the first private subnet"
    type = string
}


variable "private_cidr_2" {
    description = "CIDR block for the second private subnet"
    type = string
}


variable "public_cidr_1" {
    description = "CIDR block for the first public subnet"
    type = string
}

variable "public_cidr_2" {
    description = "CIDR block for the second public subnet"
    type = string
}

variable "az1" {
    description = "First availability zone"
    type = string
}

variable "az2" {
    description = "Second availability zone"
    type = string
}