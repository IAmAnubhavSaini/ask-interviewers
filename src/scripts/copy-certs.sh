#!/usr/bin/env bash

set -euxo pipefail

echo "[INFO] [START] Executing $0"

DIR="../certs"
CERT_DIR="../certs/"
SERVER_DIR="../server/src"

if [ ! -d ${DIR} ]; then
    echo "[INFO] Directory ${DIR} does not exist."
    echo "[INFO] Making certs."
    ./generate-certs.sh
    if [ ! -d ${DIR} ]; then
        echo "[INFO] Directory ${DIR} still does not exist. Aborting."
        exit 1
    fi
fi
if [ ! -d ${SERVER_DIR} ]; then
    echo "[INFO] Creating serve directory ${SERVER_DIR}"
    mkdir -p ${SERVER_DIR}
fi

echo "[INFO] Directory ${DIR} exist. Copying certs."
cp -r ${CERT_DIR} ${SERVER_DIR}

echo "[INFO] [DONE] Certs successfully copied."
