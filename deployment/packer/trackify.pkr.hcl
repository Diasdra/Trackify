packer {
  required_plugins {
    amazon = {
      version = ">=1.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}
// Local Variables
locals {
  region    = "ca-central-1"
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}

// Source AMI to begin
source "amazon-ebs" "application" {
  ami_name      = "trackify-app-${local.timestamp}"
  instance_type = "t2.micro"
  region        = local.region

  source_ami_filter {
    filters = {
      name                = "amzn2-ami-hvm-2.*"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true
    owners      = ["amazon"]
  }
  //Even if we're not using it, the SSH_username is required.
  ssh_username  = "ec2-user"
}

build {
  sources = ["source.amazon-ebs.application"]
  // Create a compressed version of the application to easily load it up
  provisioner "shell-local" {
    command = "tar -C ../ -C ../ --exclude ./deployment --exclude ./.circleci --exclude ./.git --exclude ./node_modules -cvzf trackify_app.tgz ."
  }
  // Upload compressed file
  provisioner "file" {
    source      = "./trackify_app.tgz"
    destination = "/home/ec2-user/trackify.tgz"
    generated   = true
  }
  // Upload service file to run application
  provisioner "file" {
    source      = "./trackify.service"
    destination = "/tmp/trackify.service"
  }
  // Launch script to prep machine for use
  provisioner "shell" {
    script = "./bootup.sh"
  }
}