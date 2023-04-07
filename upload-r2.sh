#!/bin/bash

# Set your Cloudflare R2 credentials
AUTH_KEY_SECRET="${AUTH_KEY_SECRET}"

# Loop through each file in the "build" folder and upload it to R2
# TODO make it parallel
for file in $(find ./packages/**/build -type f); do
  filename=${file#./packages/}
  echo $filename
  curl -X PUT --header "X-Custom-Auth-Key: ${AUTH_KEY_SECRET}" \
  --upload-file "$file" \
  "https://sat-worker.super-app-temp.workers.dev/${filename}"
done

echo "All files uploaded to Cloudflare R2"