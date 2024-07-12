# scrape playback.fm charts
# initial code from Co-Pilot
# "What is the easiest method to scrape the playback.fm charts pages to build a json list of songs and links?"

import requests
from bs4 import BeautifulSoup
import json

def scrape_playback_fm_chart(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract song titles and links
    songs = []
    for song_entry in soup.find_all('div', class_='chart-entry'):
        title = song_entry.find('span', class_='title').text
        link = song_entry.find('a')['href']
        songs.append({'title': title, 'link': link})

    return songs

# Example usage
chart_url = 'https://playback.fm/charts/view/popular/1920'
chart_data = scrape_playback_fm_chart(chart_url)

# Convert to JSON
json_data = json.dumps(chart_data, indent=2)
print(json_data)
