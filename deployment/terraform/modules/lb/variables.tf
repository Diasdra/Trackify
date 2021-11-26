
variable "vpc_public_sg_id" {
    description = "The public security group from the vpc"
    type = string
}

variable "vpc_public_subnets" {
    description = "The public subnets from the vpc"
    type = list
}

variable "vpc_id" {
    description = "The ID of the VPC"
    type = string
}

variable "instance_ids" {
    description = "The IDs of the application instances"
    type = list
}