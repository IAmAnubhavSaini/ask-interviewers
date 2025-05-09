#!/usr/bin/env bash

set -euxo pipefail

echo "[INFO] [START] Executing $0"
CERT_DIR=./certs

# Create certs directory if it doesn't exist
if [ ! -d "${CERT_DIR}" ]; then
    echo "[INFO] Directory ${CERT_DIR} does not exist. Creating."
    mkdir -p ${CERT_DIR}
else
    echo "[INFO] Directory ${CERT_DIR} exist."
fi

# Generate private key and certificate
openssl req -x509 -newkey rsa:2048 -keyout ${CERT_DIR}/key.pem -out ${CERT_DIR}/cert.pem -days 365 -nodes -subj "/CN=localhost"

echo "[INFO] [DONE] SSL certificates generated successfully in the certs directory."

# # Create a self-signed certificate
# openssl req -new -x509 -days 365 -keyout ${CERT_DIR}/key.pem -out ${CERT_DIR}/cert.pem -subj "/CN=localhost"

# # Verify the certificate
# openssl verify -CAfile ${CERT_DIR}/cert.pem ${CERT_DIR}/cert.pem
