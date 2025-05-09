#!/usr/bin/env bash

set -euxo pipefail

echo "[INFO] [START] Executing $0"

DIR="../data/dist"
DATA_DIR="../data/"
CLI_DIR="../cli/"
LIB_DIR="../lib/"
BLOG_DIR="../blog/"

if [ ! -d ${DIR} ]; then
    echo "[INFO] Directory ${DIR} does not exist."
    echo "[INFO] Building data project."
    cd ${DATA_DIR} && npm run build && cd ../scripts
    if [ ! -d ${DIR} ]; then
        echo "[INFO] Directory ${DIR} still does not exist. Aborting."
        exit 1
    fi
else
    echo "[INFO] Directory ${DIR} exist. Copying."
    cp -r ${DIR} ${CLI_DIR}
    cp -r ${DIR} ${LIB_DIR}
    cp -r ${DIR} ${BLOG_DIR}
fi

echo "[INFO] [DONE] Data successfully copied."
