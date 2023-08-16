#!/bin/bash

TARGET_DIR=$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH

# Define an array of directories
directories=(
  "packages/auth"
  "packages/booking"
  "packages/dashboard"
  "packages/shopping"
)

# For each directory
for dir in "${directories[@]}"; do
  echo "Processing directory: $dir..."

  # Check if directory exists
  if [[ -d "../../../$dir" ]]; then
    # Check if the source directory exists before copying
    if [[ -d "../../../$dir/build/outputs/ios/remotes" ]]; then
      echo "Copying files from $dir to target directory..."
      cp ../../../$dir/build/outputs/ios/remotes/* "$TARGET_DIR"
      echo "Files copied successfully from $dir."
    else
      echo "Error: Source directory $dir/build/outputs/ios/remotes does not exist."
      exit 1
    fi

  else
    echo "Error: Directory $dir does not exist."
    exit 1
  fi

  echo "Finished processing directory: $dir."
done

echo "Done!"
