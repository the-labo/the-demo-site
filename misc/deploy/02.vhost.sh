#!/bin/bash
#
# Apply vhost settings to nginx

BASE_DIR=$(cd "$(dirname $0)/../.." && pwd)
cd ${BASE_DIR}

NGINX_AVAILABLE_DIR='/etc/nginx/sites-available'
NGINX_ENABLED_DIR='/etc/nginx/sites-enabled'

for filename in ${BASE_DIR}/misc/vhost/*.*
do
  sudo ln -sf ${filename} ${NGINX_AVAILABLE_DIR}
  sudo ln -sf "${NGINX_AVAILABLE_DIR}/$(basename ${filename})" "${NGINX_ENABLED_DIR}/$(basename ${filename})"
done

sudo nginx -s reload
