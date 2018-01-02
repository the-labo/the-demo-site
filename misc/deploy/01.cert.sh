#!/bin/bash
#
## Prepare nginx cert with certbot

BASE_DIR=$(cd "$(dirname $0)/../.." && pwd)
cd ${BASE_DIR}

APP_DOMAIN=$(./misc/scripts/local_of.js APP_DOMAIN)

sudo nginx -s stop
sudo certbot certonly --standalone -d ${APP_DOMAIN} --agree-tos -n
sudo certbot certonly --standalone -d www.${APP_DOMAIN} --agree-tos -n
sudo nginx
  