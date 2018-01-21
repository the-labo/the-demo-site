#!/bin/bash
#
# Apply vhost settings to nginx

BASE_DIR=$(cd "$(dirname $0)/../.." && pwd)
cd ${BASE_DIR}

NGINX_AVAILABLE_DIR='/etc/nginx/sites-available'
NGINX_ENABLED_DIR='/etc/nginx/sites-enabled'

APP_DOMAIN=$(./misc/scripts/local_of.js APP_DOMAIN)

sudo ln -sf "${BASE_DIR}/misc/vhost/${APP_DOMAIN}" "${NGINX_AVAILABLE_DIR}"
sudo ln -sf "${NGINX_AVAILABLE_DIR}/${APP_DOMAIN}" "${NGINX_ENABLED_DIR}/${APP_DOMAIN}"

sudo ln -sf "${BASE_DIR}/misc/vhost/www.${APP_DOMAIN}" "www.${NGINX_AVAILABLE_DIR}"
sudo ln -sf "${NGINX_AVAILABLE_DIR}/www.${APP_DOMAIN}" "${NGINX_ENABLED_DIR}/www.${APP_DOMAIN}"

sudo nginx -s reload
