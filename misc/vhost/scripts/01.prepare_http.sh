#!/bin/bash
#
# Prepare http conf into nginx

BASE_DIR=$(cd "$(dirname $0)/../" && pwd)

NGINX_CONF_DIR='/etc/nginx/conf.d'

for filename in ${BASE_DIR}/http/*.http
do
  ln -s ${filename} . ${NGINX_CONF_DIR}
done

nginx -s reload
