import axios from "axios";
import cheerio from "cheerio";
import {writeFileSync} from "node:fs";

const ytRegex = /\/vi\/([^/]*)\//;
const host = 'https://playback.fm';

async function scrapeTopSongs(genre, year) {
    try {
        const url = `${host}/charts/${genre}/${year}`;
        console.log('>>', url);

        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Assuming the table has an ID of 'myTable'
        const songs = [];

        const fetchYoutubeId = async (mobileHideUrl) => {
            // console.log('fetchYoutubeId:', mobileHideUrl);
            try {
                const mobileResponse = await axios.get(mobileHideUrl);
                const mobileData = cheerio.load(mobileResponse.data);
                const youtubeUrl = mobileData('meta[property="og:image"]').attr('content');
                const ytMatches = youtubeUrl.match(ytRegex)
                const ytVideoId = (ytMatches && ytMatches.length > 0) ? ytMatches[1] : '';

                return {
                    youtubeUrl,
                    ytVideoId,
                };
            } catch (error) {
                console.error(`Error fetching data from ${mobileHideUrl}:`, error.message);
                return null;
            }
        };

// Use a for...of loop to handle async operations sequentially
        for (const element of $('#myTable tr')) {
            const columns = $(element).find('td');
            if (columns.length === 4) {
                const rank = $(columns[0]).text().trim();
                const title = $(columns[1]).find('a[itemprop="name"]').text().trim();
                const artist = $(columns[1]).find('a.artist').text().trim();
                const artistUrl = $(columns[1]).find('a.artist').attr('href');
                const songUrl = $(columns[1]).find('a[itemprop="name"]').attr('href');
                const metaUrl = $(columns[1]).find('meta[itemprop="url"]').attr('content');
                const mobileHideUrl = $(columns[2]).find('a').attr('href');

                // Fetch additional data from mobileHideUrl
                const additionalData = await fetchYoutubeId(host + mobileHideUrl);
                // console.log('additionalData', additionalData);

                if (additionalData) {
                    const item = {
                        rank,
                        title,
                        artist,
                        artistUrl,
                        songUrl,
                        metaUrl,
                        mobileHideUrl,
                        ...additionalData,
                    };

                    songs.push(item);
                }
            }
        }

        return songs;


    } catch (error) {
        console.error('Error fetching or parsing data:', error.message);
    }
}

(async function doIt() {

    async function pullSongsOfTheYear(genre , year) {
        const songs = await scrapeTopSongs(genre, year);

// Print the scraped data
        console.log('songs', songs);

        if (!songs) {
            return;
        }
        songs.forEach(song => {
            console.log(`${song.rank}. ${song.title} - ${song.artist}`);
            console.log(`  Artist rank: ${song.rank}`);
            console.log(`  Artist title: ${song.title}`);
            console.log(`  Artist artist: ${song.artist}`);
            console.log(`  Artist URL: ${song.artistUrl}`);
            console.log(`  Song URL: ${song.songUrl}`);
            console.log(`  Meta URL: ${song.metaUrl}`);
            console.log(`  Mobile Hide URL: ${song.mobileHideUrl}`);
            console.log(`  youtubeUrl: ${song.youtubeUrl}`);
            console.log(`  ytVideoId: ${song.ytVideoId}`);
        });

        writeFileSync(`../songs/${genre}/${year}.json`, JSON.stringify(songs, null, 2));
    }

    const genres = ['top-100-songs', 'rock', 'country', 'rnb'];

    const STARTING_YEAR = 1909; // Do one year at a time (per decade) to reduce load on server

    for (let genre of genres) {
        // TODO: use date.year instead of "2024"
        for (let year = STARTING_YEAR; year <= 2024; year += 10) {
            console.log('\n\n*************', genre, year);

            // TODO: Skip if songs/[year].json already exists

            await pullSongsOfTheYear(genre, year);
        }
    }
})();
