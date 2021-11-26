

output "instance_ids" {
    value = [
        aws_instance.trackify_app[0].id,
        aws_instance.trackify_app[1].id
    ]
}
output "instance_ips" {
    value = [
        aws_instance.trackify_app[0].private_ip,
        aws_instance.trackify_app[1].private_ip
    ]
}