import markovify as mk
import pandas as pd
import random

df = pd.read_csv(r"cluesDataset.csv")
cluesData = [df['clue'][i] for i in range(1,1000)]

generator1 = mk.Text(cluesData, state_size=1)
generator2 = mk.Text(cluesData, state_size=2)
for i in range(10):
    print(generator1.make_short_sentence(max_chars=150),"("+str(random.randint(3,8))+")")

with open("scrapedData.txt", "r") as f:
    generator3 = mk.Text(f.read().split('\n'), state_size=2)
    print("--------------------------------")
    for i in range(5):
        print(generator3.make_short_sentence(max_chars=150),"("+str(random.randint(3,8))+")")