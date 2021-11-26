variable "region" {
  description = "The AWS region where the infrastructure will be deployed"
  type        = string
}
variable "database_admin_password" {
  description = "Password to be used to connect to the RDS Database"
  type        = string
}

variable "ssh_key" {
  description = "SSH key for connecting through ssh"
  type = string
}