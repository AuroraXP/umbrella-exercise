# Calories carried by the elves

from pathlib import Path

# Build a list including all gathered calories
# Build it gathered with all calories one elf carries

input_file_path =Path("input", "day_1.txt")

input_data = {}
elfcounter = 0
calories = 0


with open(input_file_path) as input_file:

  for line in input_file:
    x = line.rstrip() 

    if x != '':
      calories = calories + int(x)

    else:
      input_data[f"elf_{elfcounter}"] = calories
      calories = 0
      elfcounter = elfcounter + 1
    
# print(input_data) # - let's call this - visual testing

# the question was: what is the highest amount of calories an elf gathered:
print(max(input_data.values()))

####################################
# PART 2

# the top three total amount of calories
# let's just try and build this

list_of_largest = [0] 

for value in input_data.values():
    if any(list_of_largest) < value:
        list_of_largest.append(value)

    if len(list_of_largest) > 3:
      list_of_largest.remove(min(list_of_largest))
  
print(list_of_largest)
print(sum(list_of_largest))


