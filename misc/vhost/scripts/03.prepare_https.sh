#!/bin/bash
#
# Prepare https

BASE_DIR=$(cd "$(dirname $0)/../" && pwd)

NGINX_CONF_DIR='/etc/nginx/conf.d'

for filename in ${BASE_DIR}/https/*.https
do
  ln -s ${filename} . ${NGINX_CONF_DIR}
done

nginx -s reload
