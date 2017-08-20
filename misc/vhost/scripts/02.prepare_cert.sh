#!/bin/bash
#
# Prepare cert files
#

BASE_DIR=$(cd "$(dirname $0)/../" && pwd)
HTTP_DIR="${BASE_DIR}/http"

INIT_CONFIG=/etc/letsencrypt/config.ini

for filename in ${BASE_DIR}/http/*.http
do
  name=$(basename ${filename} ".http")
  /opt/letsencrypt/letsencrypt-auto certonly --debug --webroot -w ${HTTP_DIR} -d ${name} --config ${INIT_CONFIG} --agree-tos
done