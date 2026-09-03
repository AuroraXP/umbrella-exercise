from pathlib import Path

data_path = Path("input", "day_4.txt")

first_elf = []
second_elf = []

# Data parsing

with open(data_path) as data:
    for line in data:
        stripped_line = line.rstrip()
        split_line = stripped_line.split(",")

        first = split_line[0].split("-")
        first_elf.append([int(first[0]), int(first[1])])

        second = split_line[1].split("-")
        second_elf.append([int(second[0]), int(second[1])])


print("Test length of structures:", len(first_elf), len(second_elf))

# How many pairs have one section range fully contained in another?

counter = 0

for i in range(len(first_elf)):

    [min_1,max_1] = first_elf[i]
    [min_2,max_2] = second_elf[i]

    elf1_in_2 = min_1 >= min_2 and max_1 <= max_2
    elf2_in_1 = min_2 >= min_1 and max_2 <= max_1

    if elf1_in_2 or elf2_in_1:
        counter = counter + 1

print("Counter for one elves sections fully contained in anothers: ",counter)





# PART 2 - overlap calculation (How many sections overlap?)

overlap_counter = 0

for i in range(len(first_elf)):

    [min_1,max_1] = first_elf[i]
    [min_2,max_2] = second_elf[i]
    
    overlap_min = ((min_1 >= min_2 and min_1 <= max_2) or (min_2 >= min_1 and min_2 <= max_1))
    overlap_max = ((max_1 <= max_2 and max_1 >= min_2) or (max_2 <= max_1 and max_2 >= min_1))

    if overlap_min or overlap_max:
        overlap_counter = overlap_counter + 1

print("Counter for pairs with overlapping sections: ",overlap_counter)
