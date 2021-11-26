# output "db_address" {
#   value = aws_db_instance.mysql.address
# }
# output "app_address_0" {
#   value = aws_instance.trackify_app[0].public_ip
# }
# output "app_address_1" {
#   value = aws_instance.trackify_app[1].public_ip
# }
// output "app_address_2" {
//   value = aws_instance.trackify_app[2].public_ip
// }

output "lb_address" {
  value = module.trackify_lb.dns_name
}