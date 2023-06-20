from urllib import request
import requests

def getClue(row):
    l = row.find(',')
    r = row.find('(')
    return row[l+1:r-1]

# Data Scraped!! Change the index numbers if rerunning this code
with open('scrapedData.txt', 'w') as f:
    for i in range(12,20):
        url = 'https://cryptics.georgeho.org/data/clues.csv?_sort=rowid&rowid__gt='+str(i)+'000&_size=max'
        #rawData = requests.get('https://cryptics.georgeho.org/data/clues.csv?_sort=rowid&rowid__gt=5001&_size=max')
        rawData = requests.get(url)
        clues = rawData.text.split('\n')[1:]
        cluesData = [(getClue(clue)+"\n") for clue in clues]
        cluesData = [clue[1:] for clue in cluesData if clue[0] == '"']
        f.writelines(cluesData)
