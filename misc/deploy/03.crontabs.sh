#!/bin/bash
#
# Setup cron to renew

BASE_DIR=$(cd "$(dirname $0)/../.." && pwd)
cd ${BASE_DIR}

SRC=${BASE_DIR}/misc/crone/renew_cert.cron
DEST=/etc/cron.monthly/renew_cert.cron
sudo cp ${SRC} ${DEST}