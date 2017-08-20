#!/bin/bash
#
# Prepare http conf into nginx

BASE_DIR=$(cd "$(dirname $0)/../" && pwd)

NGINX_AVAILABLE_DIR='/etc/nginx/sites-available/'
NGINX_ENABLED_DIR='/etc/nginx/sites-enabled/'

for filename in ${BASE_DIR}/http/*.*
do
  ln -sf ${filename} ${NGINX_AVAILABLE_DIR}
  ln -sf "${NGINX_AVAILABLE_DIR}/$(basename ${filename})" "${NGINX_ENABLED_DIR}/$(basename ${filename})"
done

nginx -s reload
