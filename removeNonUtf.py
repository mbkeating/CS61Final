# Code is copied from Chat-GPT

import csv

def remove_non_utf8(text):
    return ''.join(char for char in text if ord(char) < 128)

with open('cleaned_supplementary.csv', 'r', encoding='utf-8') as infile, open('cleaner_supplementary.csv', 'w', encoding='utf-8', newline='') as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)
    for row in reader:
        cleaned_row = [remove_non_utf8(cell) for cell in row]
        writer.writerow(cleaned_row)