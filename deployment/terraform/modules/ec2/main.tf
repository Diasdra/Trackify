
data "cloudinit_config" "server_config" {
  gzip          = true
  base64_encode = true
  part {
    content_type = "text/cloud-config"
    content = templatefile("${path.module}/trackify.yml", {
      db_user: aws_db_instance.mysql.username
      db_pass: var.database_admin_password
      db_url : aws_db_instance.mysql.endpoint
      db_name: aws_db_instance.mysql.name
    })
  }
}

data "aws_ami" "trackify_ami" {
  most_recent = true
  name_regex  = "trackify-app-*"
  owners      = ["self"]
}

resource "aws_instance" "trackify_app" {
  count         = 2
  instance_type = "t2.micro"
  ami           = data.aws_ami.trackify_ami.id
  subnet_id     = var.private_subnet_1
  key_name      = var.ssh_key

  vpc_security_group_ids      = [var.private_sg]
  associate_public_ip_address = false

  user_data = data.cloudinit_config.server_config.rendered
}