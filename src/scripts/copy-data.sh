#!/usr/bin/env bash

set -euxo pipefail

echo "[INFO] [START] Executing $0"

DIR="../data/dist"
DATA_DIR="../data"
CLI_DIR="../cli"
LIB_DIR="../lib"
BLOG_DIR="../blog"
SERVER_DIR="../server/src"

if [ ! -d ${DIR} ]; then
    echo "[INFO] Directory ${DIR} does not exist."
    echo "[INFO] Building data project."
    cd ${DATA_DIR} && npm install && npm run build && cd ../scripts
    if [ ! -d ${DIR} ]; then
        echo "[INFO] Directory ${DIR} still does not exist. Aborting."
        exit 1
    fi
fi

if [ ! -d ${CLI_DIR} ]; then
    echo "[INFO] Creating directory ${CLI_DIR}."
    mkdir -p ${CLI_DIR}
fi
if [ ! -d ${LIB_DIR} ]; then
    echo "[INFO] Creating directory ${LIB_DIR}."
    mkdir -p ${LIB_DIR}
fi
if [ ! -d ${BLOG_DIR} ]; then
    echo "[INFO] Creating directory ${BLOG_DIR}."
    mkdir -p ${BLOG_DIR}
fi
if [ ! -d ${SERVER_DIR} ]; then
    echo "[INFO] Creating directory ${SERVER_DIR}."
    mkdir -p ${SERVER_DIR}
fi

echo "[INFO] Directory ${DIR} exist. Copying."
cp -r "${DIR}" "${CLI_DIR}/data"
cp -r "${DIR}" "${LIB_DIR}/data"
cp -r "${DIR}" "${BLOG_DIR}/data"
cp -r "${DIR}" "${SERVER_DIR}/data"

echo "[INFO] [DONE] Data successfully copied."
