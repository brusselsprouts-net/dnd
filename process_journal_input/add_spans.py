filename = '../articles/journal_notes/session1.md'
with open(filename, 'r') as f:
    text = f.read()

characters = ['Thalia', 'Talon', 'Kaimi', 'Lachlan', 'Sillidious']
for character in characters:
    text = text.replace(character, f'<span class=\'name-{character.lower()}\'> {character} </span>')
    
print(text)
with open(filename, 'w') as f:
    f.write(text)
