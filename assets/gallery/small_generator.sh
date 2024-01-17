#!/bin/bash

# Set input and output directories
input_folder="$(pwd)"
output_folder="small"

# Create output folder if it doesn't exist
mkdir -p "$output_folder"

# Iterate through each image file in the input folder
for file in "$input_folder"/*.{jpg,png,webp,JPG,PNG,WEBP}; do
    if [ -f "$file" ]; then
        # Get the filename and extension
        filename=$(basename -- "$file")
        extension="${filename##*.}"
        extension_lowercase=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
        filename_without_extension="${filename%.*}"

        # Set output file path
        output_file="$output_folder/${filename_without_extension}_resized.${extension_lowercase}"

        # Resize the image using ffmpeg
        ffmpeg -i "$file" -vf scale=20:-1 "$output_file"

        echo "Resized: $filename -> ${filename_without_extension}_resized.${extension_lowercase}"
    fi
done

echo "Resize complete!"
