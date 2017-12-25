#!/bin/bash

sudo nginx -s stop
sudo certbot certonly --standalone -d the-demo-site.com --agree-tos -n
sudo certbot certonly --standalone -d www.the-demo-site.com --agree-tos -n
sudo nginx
  