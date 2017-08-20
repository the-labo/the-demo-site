#!/bin/bash
#
# Install Let's encrypt
#
# See:
#   https://medium.com/@gnowland/deploying-lets-encrypt-on-an-amazon-linux-ami-ec2-instance-f8e2e8f4fc1f


INSTALL_DIR=/opt/letsencrypt
INIT_CONFIG=/etc/letsencrypt/config.ini

echo "EMAIL:"
read EMAIL

if [ -d ${INSTALL_DIR} ]
then
  echo "Already installed"
else
  git clone https://github.com/letsencrypt/letsencrypt ${INSTALL_DIR}
  ${INSTALL_DIR}/letsencrypt-auto --debug

  echo "rsa-key-size = 4096" >> ${INIT_CONFIG}
  echo "email = ${EMAIL}" >> ${INIT_CONFIG}
fi