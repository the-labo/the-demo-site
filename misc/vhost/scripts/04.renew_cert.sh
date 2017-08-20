#!/bin/bash
#
# Renew cert files
#
# `sudo vi /etc/crontab`
#
#    0 13  *  *  *  root certbot renew
#    0 13  *  *  *  root  nginx -s reload

certbot renew