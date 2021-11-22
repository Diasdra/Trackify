

output "instance_ids" {
    value = [
        aws_instance.trackify_app[0].id,
        aws_instance.trackify_app[1].id
    ]
}