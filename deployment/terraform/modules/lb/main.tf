# Create An Application Load Balancer
resource "aws_lb" "http_lb" {
  name               = "http-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.vpc_public_sg_id]
  subnets            = var.vpc_public_subnets

  enable_deletion_protection = false
}

# Listen for requests on port 80 and forward those requests to the target group
resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.http_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app_tg.arn
  }
}

# Create a target group that will send traffic over port 8080
resource "aws_lb_target_group" "app_tg" {
    name     = "app-tg"
    port     = 8000
    protocol = "HTTP"
    vpc_id   = var.vpc_id
}

# Direct the traffic to the ec2 instance
resource "aws_lb_target_group_attachment" "app_attachment_1" {
  port             = 8000
  target_group_arn = aws_lb_target_group.app_tg.arn
  # The id of the ec2 instance:
  target_id        = var.instance_ids[0]
}
resource "aws_lb_target_group_attachment" "app_attachment_2" {
  port             = 8000
  target_group_arn = aws_lb_target_group.app_tg.arn
  # The id of the ec2 instance:
  target_id        = var.instance_ids[1]
}
