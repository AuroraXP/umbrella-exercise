#  Rock, Paper, Scissors
# 1, A, X - Rock
# 2, B, Y - Paper
# 3, C, Z - Scissors 

# + points(0 - if lost, 3 - if draw, 6 - if won) - each round gets the points

from pathlib import Path

strategy_guide_path = Path("input", "day_2.txt")
round_list = []

with open(strategy_guide_path) as strategy_guide:
    for line in strategy_guide:
        round_list.append(line.strip())

# print(round_list)
total_score = 0

for round in round_list:
    if round[0] == "A":
        if round[2] == "X":
            total_score = total_score + 1 + 3

        elif round[2] == "Y":
            total_score = total_score + 2 + 6

        else: 
            total_score = total_score + 3 + 0

    elif round[0] == "B":
        if round[2] == "X":
            total_score = total_score + 1 + 0

        elif round[2] == "Y":
            total_score = total_score + 2 + 3

        else: 
            total_score = total_score + 3 + 6

    else:
        if round[2] == "X":
            total_score = total_score + 1 + 6

        elif round[2] == "Y":
            total_score = total_score + 2 + 0

        else:
            total_score = total_score + 3 + 3


print(total_score)


# Part 2

# The concept of the spaghetti has changed: X = loose, Y = draw, Z = win

score_new = 0

for round in round_list:
    if round[0] == "A":
        if round[2] == "X":
            score_new = score_new + 3

        elif round[2] == "Y":
            score_new = score_new + 1 + 3

        elif round[2] == "Z":
            score_new = score_new + 2 + 6

    elif round[0] == "B":
        if round[2] == "X":
            score_new = score_new + 1

        elif round[2] == "Y":
            score_new = score_new + 2 + 3

        elif round[2] == "Z":
            score_new = score_new + 3 + 6

    elif round[0] == "C":
        if round[2] == "X":
            score_new = score_new + 2

        elif round[2] == "Y":
            score_new = score_new + 3 + 3

        elif round[2] == "Z":
            score_new = score_new + 1 + 6

print(score_new)

# works - now fix the other thing