from pathlib import Path

#This one could really handle some clean up

# Part 1 - "decipher message"

data_path = Path("input", "day_5.txt")


# Parsing


def parsing_day_5(data_path):

    movement_commands = []
    column_1, column_2, column_3, column_4, column_5, column_6, column_7, column_8, column_9 = ([] for i in range(9))

    with open(data_path) as data:
        for line in data:
            if line.startswith(' 1'):
                break
            
            x = line.rstrip("\n")

            column_1.append(x[:3])
            column_2.append(x[4:7])
            column_3.append(x[8:11])
            column_4.append(x[12:15])
            column_5.append(x[16:19])
            column_6.append(x[20:23])
            column_7.append(x[24:27])
            column_8.append(x[28:31])
            column_9.append(x[32:35]) # parsing the columns into lists for easy moving - there is definetly a more efficient solution to this
            
            
        for line in data:
            if line.startswith('move'):

                x = line.strip()
                split = x.split('move')
                split.remove(split[0])

                split = split[0].split('from')
                amount = split[0]
                movement = split[1].split('to')

                movement_commands.append([amount, movement[0], movement[1]])

                # movement_command[0] = amount of blocks to move
                # movement_command[1] = from where to move
                # movement_command[2] = to where to move 

    # Restructuring
    columns_list = []
    columns_list.append([column_1, column_2, column_3, column_4, column_5, column_6, column_7, column_8, column_9])
    columns = columns_list[0]

    # Remove empty spaces
    for s in range(3):
        for i in columns:
            for d in i:
                if d == "   ":
                    i.remove(d)

    
    return columns, movement_commands




columns, movement_commands = parsing_day_5(data_path)

# Checking ...

# print(movement_commands)

# for i in columns:
#     print (i)

# print("")
# print("--------------------")
# print(movement_commands[0])
# print("--------------------")
# print ("")


# Moving function
for command in movement_commands:
    moving = "test"
    blocks_list = 0

    amounts = int(command[0])
    take_from = int(command[1])-1
    take_to = int(command[2])-1

    for block in columns[take_from]:
        blocks_list = blocks_list+1

    if blocks_list < amounts:
        raise ValueError("You are trying to raise blocks where there are none!")

    for a in range(amounts): # move them piece by piece to get the "upper" one first

        moving = columns[take_from][0]
        columns[take_from].remove(columns[take_from][0])

        columns[take_to].insert(0,moving) # move in to the left of the list (top side)


# Control
print('')
print('-'* 20)
print("Solution to Part 1: ")
print('-'* 20)
print('')

for i in columns:
    print (i)

print('')
print('')
