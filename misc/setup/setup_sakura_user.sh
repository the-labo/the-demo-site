#!/bin/bash

echo "User Name?"
read USER_TO_CREATE
echo "Password?"
read PASSWROD_OF_USER_TO_CREATE

sudo useradd ${USER_TO_CREATE} -m -g sudo -s /bin/bash -p ${PASSWROD_OF_USER_TO_CREATE}

sudo su - ${USER_TO_CREATE}

id

ssh-keygen




