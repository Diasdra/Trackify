#!/bin/bash

sleep 30

sudo yum update -y

sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
sudo yum install -y nodejs-14.17.1-1nodesource

sudo yum install tar -y

cd ~/ && tar -xf trackify.tgz
npm i --only=prod

sudo mv /tmp/trackify.service /etc/systemd/system/trackify.service
sudo systemctl enable trackify.service
sudo systemctl start trackify.service