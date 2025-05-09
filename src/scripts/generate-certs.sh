#!/usr/bin/env bash

set -euxo pipefail

echo "[INFO] [START] Executing $0"

# Create certs directory if it doesn't exist
if [ ! -d "../certs" ]; then
    echo "[INFO] Directory ../certs does not exist. Creating."
    mkdir -p ../certs
else
    echo "[INFO] Directory ../certs exist."
fi

# Generate private key and certificate
openssl req -x509 -newkey rsa:2048 -keyout ../certs/key.pem -out ../certs/cert.pem -days 365 -nodes -subj "/CN=localhost"

echo "[INFO] [DONE] SSL certificates generated successfully in the certs directory."

# # Create a self-signed certificate
# openssl req -new -x509 -days 365 -keyout ../certs/key.pem -out ../certs/cert.pem -subj "/CN=localhost"

# # Verify the certificate
# openssl verify -CAfile ../certs/cert.pem ../certs/cert.pem
