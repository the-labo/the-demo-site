#!/bin/bash
#
# Renew cert files
#
# `sudo vi /etc/crontab`
#
#    0 13  *  *  *  ec2-user  /opt/letsencrypt/letsencrypt-auto --no-bootstrap renew
#    0 13  *  *  *  root  nginx -s reload

/opt/letsencrypt/letsencrypt-auto --no-bootstrap renew
nginx -s reload
