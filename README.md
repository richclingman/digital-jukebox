# digital-jukebox

Rich Clingman, Ozark, Missouri, USA

Play "Top 100" songs in each year from 1900 to current.

Uses lists from
[playback.fm](https://playback.fm/)

## Motivation

My 94 & 96-year-old parents want to purchase a Jukebox for their assisted living home.
I wanted something that looked like a jukebox from the 1940's/50's, but
would stream from an Internet playlist.
I needed something that a 96-year-old with limited vision and low technical
understanding could operate.

I could find $1,000-$2,000 jukeboxes that were really just very fancy Bluetooth speakers,
no actual playback mechanism.
For $10,000+ I could find real jukeboxes, but I'd also need to fill them with a hundred 45 RPM records.
I looked for digital jukeboxes that would stream from the internet.
These seemed focused on bars and similar businesses, and had coin boxes for pay-per-play.

I also looked at digital karaoke machines. These also did not meet my needs.

## Decision

After seeing a 36" touch screen display at a furniture store,
I thought, *Why not?*

I began envisioning a digital jukebox based on a touch

## Research

I did a quick search for documentation on
* YouTube API
* Spotify API
* Amazon Music API

I decided that YouTube would be my first music source.
Because it's free.

I asked "Mr. Smartypants" (AKA Co-Pilot)
where I could find Top 100 play lists.
He recommended
[playback.fm](https://playback.fm/)

There are several ways to retrieve the charts...

* https://playback.fm/charts/top-100-songs/1974
* https://playback.fm/charts/rock/1974
* https://playback.fm/charts/country/1974
* https://playback.fm/charts/rnb/1974
* https://playback.fm/charts/brasil/1974

## Mr. Smartypants, how can I scrape the lists?

* "What is the easiest method to scrape the playback.fm charts pages to build a json list of songs and links?"
* The response was in Python.
* "Please provide scraping code for nodejs"

The initial files were commited in the repo and then modified as needed.

## Other Resources

* [Jukebox Png](https://pngtree.com/freepng/jukebox_8676230.html)


