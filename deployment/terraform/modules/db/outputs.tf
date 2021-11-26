
output "DBEndpoint" {
    value = aws_db_instance.mysql.endpoint
}
output "DBUsername" {
    value = aws_db_instance.mysql.username
}
output "DBName" {
    value = aws_db_instance.mysql.name
}