# output "db_address" {
#   value = aws_db_instance.mysql.address
# }
 output "app_address_0" {
   value = module.trackify_ec2.instance_public[0]
 }
 output "app_address_1" {
   value = module.trackify_ec2.instance_public[1]
 }
// output "app_address_2" {
//   value = aws_instance.trackify_app[2].public_ip
// }

// output "lb_address" {
//   value = module.trackify_lb.dns_name
// }