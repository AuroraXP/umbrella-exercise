# This Repository is meant for Exercise

## *What is the point?*

- The purpose of this repository is steady exercise and learning new techniques 

## *Languages*

Solutions to [Advent of Code](https://adventofcode.com) puzzles in two languages:

| Language | Folder |
|---|---|
| Python | `python/advent_of_code/<year>` |
| TypeScript | `typescript/advent_of_code/<year>` |

I started with Python and now continue in TypeScript.


## *How to run a day*

Puzzle inputs are not included in this repository (Advent of Code asks people not to
publish them). To run a solution, put your own input in the `input/` folder next to it,
named like the day, e.g. `input/day-1.txt`.

### TypeScript (pnpm)

```bash
cd typescript
pnpm install                                  # first time only
pnpm aoc advent_of_code/<year>/day-<n>.ts
```

### Python

```bash
cd python
python -m venv .venv && source .venv/bin/activate   # first time only
pip install -r requirements.txt                     # first time only
cd advent_of_code/<year>                            # run from the year folder,
python day_<n>.py                                   # the input path is relative
```


## *Started*

- Date of exercise start: 31 Aug 2026