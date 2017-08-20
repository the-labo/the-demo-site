#!/bin/bash
#
# Setup ubuntu server

sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common \
    -y

### Git

sudo apt-get update
sudo apt-get install git


### Node

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc
nvm install 8

npm i pon yarn pm2 -g


### Docker

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update
sudo apt-get install docker-ce -y

sudo usermod -a -G docker $USER
docker run hello-world

### MySQL Client

sudo apt-get install mysql-client -y


### Nginx

sudo apt-get update
sudo apt-get install nginx -y


### Let's Encrypt

sudo apt-get update
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx -y
