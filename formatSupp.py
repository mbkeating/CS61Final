f = open('./supplementary_imdb_movies.csv')

data = {}

wanted = {0: 'names', 5: 'crew', 8: 'orig_lang', 9: 'budget_x'}

all_lines = ['names,actor,character,orig_lang,budget_x']

supp_names = set()
orig_names = set()

orig = open('./imdb_clean.csv')

# Get all names that we actually care about (in imdb top 1000)
for line in orig:
    name = line.split(',')[1].strip()
    orig_names.add(name)

i = 0
for line in f:
    # Ignore the first line
    if i == 0:
        i += 1
        continue
    # There's commas in between anything quoted so just make it a "~" instead
    quoted = line.split('\"')
    # Go for cases where we're after one quote and before another
    for j in range(1, len(quoted) - 1, 2):
        # Change commas to ~
        quoted[j] = ''.join([l if l != ',' else '~' for l in quoted[j]])
    line = ''.join(quoted)
    
    # Take only the parts that we want
    l = line.split(',')
    new_line = []
    for w in wanted.keys():
        new_line.append(l[w].strip())
    
    # filter out names that are duplicates
    if new_line[0] in supp_names:
        continue

    # filter out names that don't match something in the imdb top 1000
    if new_line[0] not in orig_names:
        continue

    # add this name to the duplicate names set
    supp_names.add(new_line[0])

    # Separate out actors, characters into separate rows
    actors_char = new_line[1].split('~')
    for j in range(0, len(actors_char) - 1, 2):
        actor = actors_char[j].strip()
        character = actors_char[j + 1].strip()
        total_line = [new_line[0], actor, character, new_line[2], str(round(float(new_line[3]) / 1000000, 2))]
        all_lines.append(','.join(total_line))

f = open('cleaned_supplementary.csv', 'w')
f.write('\n'.join(all_lines))
f.close()