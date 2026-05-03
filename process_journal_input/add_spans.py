# import argparse
import re
import os

# no longer using cli arguments 

# # Add parser for command line argument
# parser = argparse.ArgumentParser(description="Select which markdown file to parse")
# parser.add_argument('-n', required=True, help="Choose session number")
# arg = parser.parse_args()
# session_number = arg.n

# array of pre-defined chacacters
characters = ['Thalia', 'Talon', 'Kaimi', 'Lachlan', 'Sillidious']
# folder of the journal files to modify
folder = '../articles/journal_notes/'

# Replace all unwrapped names
def replace_unwrapped_names(text, name):
    wrapped = f"<span class='name-{name.lower()}'> {name} </span>"
    # replace already wrapped with a placeholder so it doesn't interfere with subsequent replacements
    placeholder = f"WRAPPED_{name.upper()}"
    text = text.replace(wrapped, placeholder)
    
    # replace all remaining unwrapped instances
    text = re.sub(
        rf'\b{name}\b',
        wrapped,
        text,
        flags=re.IGNORECASE
    )
    # restore wrapped version
    text = text.replace(placeholder, wrapped)
    
    return text

# Go through a file, format it and save the results
def format_file(filename):
    # read file
    filename_path = folder+filename
    with open(filename_path, 'r') as f:
        text = f.read()
    # wrap
    for character in characters:
        text = replace_unwrapped_names(text, character)
    # write to the file
    with open(filename_path, 'w') as f:
        f.write(text)
        
# Go through all journal files available in the folder and format
for file in os.listdir(folder):
    filename = os.fsdecode(file)
    if filename.endswith(".md"):
        print(f"Formatting file {filename}: ")
        format_file(filename)




# Write back to file


print("Formatting complete!")