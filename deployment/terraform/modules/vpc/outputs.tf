

output "vpc_private_subnets" {
    value = [
        aws_subnet.private_subnet_1.id,
        aws_subnet.private_subnet_2.id
    ]
}

output "db_sg" {
    value = aws_security_group.database_sg.id
}

output "private_subnet_1" {
    value = aws_subnet.private_subnet_1.id
}

output "private_sg" {
    value = aws_security_group.private_sg.id
}

output "public_sg" {
    value = aws_security_group.public_sg.id
}

output "public_subnets" {
    value = [
        aws_subnet.public_subnet_1.id,
        aws_subnet.public_subnet_2.id
    ]
}

output "vpc_id" {
    value = aws_vpc.main.id
}