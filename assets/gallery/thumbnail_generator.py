import os
from PIL import Image

def process_image(file_path, output_folder):
    try:
        # Open the image
        with Image.open(file_path) as img:
            # Check if the image is animated (for WEBP)
            is_animated = hasattr(img, 'n_frames') and img.n_frames > 1
            
            # If it's a PNG, JPG, or non-animated WEBP, copy it to the thumbnail folder
            if img.format in ['PNG', 'JPEG'] or (img.format == 'WEBP' and not is_animated):
                img.save(os.path.join(output_folder, os.path.basename(file_path)))
            elif img.format == 'WEBP' and is_animated:
                # If it's an animated WEBP, extract the first frame and save it
                img.seek(0)  # Go to the first frame
                img.save(os.path.join(output_folder, os.path.splitext(os.path.basename(file_path))[0] + '.webp'))
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def main():
    current_folder = os.getcwd()
    output_folder = os.path.join(current_folder, 'thumbnail')

    # Create the 'thumbnail' folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Iterate through all files in the current folder
    for file_name in os.listdir(current_folder):
        file_path = os.path.join(current_folder, file_name)

        # Check if it's a file
        if os.path.isfile(file_path):
            # Check the file extension
            _, file_extension = os.path.splitext(file_name)
            file_extension = file_extension.lower()

            if file_extension in ['.png', '.jpg', '.jpeg', '.webp']:
                process_image(file_path, output_folder)

if __name__ == "__main__":
    main()
