# Part 1

# Items in Rucksacks - 2 Compartments (strings split in half)
# Remember common items by their priorities a-z (1-26) A-Z (27-52)
# Build a sum of common items priorities

from pathlib import Path

rucksacks_path = Path("input", "day_3.txt")
rucksacks = {}
counter = 0


# No 1 : Build dict for ordered rucksack contents


with open(rucksacks_path) as rucksacks_file:
    for line in rucksacks_file:

        rucksack_contents = []
        comp1 = []
        comp2 = []

        x = line.rstrip() 
        line_size = len(line)

        for i in range(line_size):
            rucksack_contents.append(line[i])

        for item in rucksack_contents:  # remove unwanted lines/linebreaks
            if item == '\n':
                rucksack_contents.remove(item)

        if len(rucksack_contents) % 2:  # small backcheck
            pass
        else:
            ValueError("Some rucksacks have uneven numbers!")


        for i in range(len(rucksack_contents)): # split content into compartments
            
            if i < (len(rucksack_contents)/2):
                comp1.append(rucksack_contents[i])
            else:
                comp2.append(rucksack_contents[i])

        counter = counter + 1
        rucksacks[counter] = [rucksack_contents, comp1, comp2]



# print(rucksacks)


# No 2 : Build dict for priority numbers

priority_parse = {}

alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
capital_alphabet = []

for i in range(len(alphabet)):
    capital_alphabet.append(alphabet[i].upper())

for i in range(52):
    i = i+1
    if i<27:
        priority_parse[alphabet[i-1]] = i
    else:
        priority_parse[capital_alphabet[i-27]] = i

# print(priority_parse)

# No 3 : Separate doubles and sum their priority numbers

n = 0

duplicates = []

for key in rucksacks:

    n = n + 1
    contents_lists = rucksacks.get(n)

    x = set(contents_lists[1]) & set(contents_lists[2])
    a = x.pop()
    duplicates.append(a)

# print(duplicates)

priorities = []

for item in duplicates:
    for key in priority_parse.keys():
        
        if item == key:
            priorities.append(priority_parse[key])
        
# print(priorities)
print(sum(priorities))





### Part 2 

group_dict = {}
group_contents = []
group = 1
n = 0

for key in rucksacks.keys():

    n = n + 1
    contents_lists = rucksacks.get(n)
    group_contents.append(contents_lists[0])

    if len(group_contents) % 3 == 0:
        group_dict[group] = group_contents
        group = group + 1
        group_contents = []

# print(group_dict)

badges_list = []

for key in group_dict.keys():

    lists = group_dict.get(key)
    x = set(lists[0]) & set(lists[1]) & set(lists[2])
    a = x.pop()

    for key in priority_parse.keys():
        
        if a == key:
            badges_list.append(priority_parse[key])
        
print(sum(badges_list))