import argparse

# Add parser for command line argument
parser = argparse.ArgumentParser(description="Select which markdown file to parse")
parser.add_argument('-n', required=True, help="Choose session number")
arg = parser.parse_args()
session_number = arg.n

# set file to modify
filename= f'../articles/journal_notes/session{session_number}.md'
with open(filename, 'r') as f:
    text = f.read()

characters = ['Thalia', 'Talon', 'Kaimi', 'Lachlan', 'Sillidious']
# check if it needs formatting else don't do it
if not text.__contains__('span'):
    for character in characters:
        text = text.replace(character, f'<span class=\'name-{character.lower()}\'> {character} </span>')
        
    print(text)
    with open(filename, 'w') as f:
        f.write(text)
else:
    print("This file has been formatted already")
