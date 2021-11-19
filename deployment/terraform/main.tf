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

// VPC for all applications



// MySQL (Free) DB using AWS RDS




// Build Web application instances
// Source up to date AMIs