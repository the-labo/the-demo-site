#!/bin/bash

sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw allow ssh
sudo ufw allow 22

sudo ufw allow http
sudo ufw allow 80

sudo ufw allow https
sudo ufw allow 443


sudo ufw allow in from 172.17.0.0/24

sudo mv /etc/iptables/iptables.rules /var/tmp
sudo reboot
