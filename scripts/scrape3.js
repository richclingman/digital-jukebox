const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTopSongs() {
    try {
        const url = 'https://playback.fm/charts/top-100-songs/1980';
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Assuming the table has an ID of 'myTable'
        const songs = [];
        $('#myTable tr').each((index, element) => {
            const columns = $(element).find('td');
            if (columns.length === 4) {
                const rank = $(columns[0]).text().trim();
                const title = $(columns[1]).find('a[itemprop="name"]').text().trim();
                const artist = $(columns[1]).find('a.artist').text().trim();
                const artistUrl = $(columns[1]).find('a.artist').attr('href');
                const songUrl = $(columns[1]).find('a[itemprop="name"]').attr('href');
                const metaUrl = $(columns[1]).find('meta[itemprop="url"]').attr('content');
                const mobileHideUrl = $(columns[2]).find('a').attr('href');

                songs.push({
                    rank,
                    title,
                    artist,
                    artistUrl,
                    songUrl,
                    metaUrl,
                    mobileHideUrl
                });
            }
        });

        // Print the scraped data
        songs.forEach(song => {
            console.log(`${song.rank}. ${song.title} - ${song.artist}`);
            console.log(`  Artist URL: ${song.artistUrl}`);
            console.log(`  Song URL: ${song.songUrl}`);
            console.log(`  Meta URL: ${song.metaUrl}`);
            console.log(`  Mobile Hide URL: ${song.mobileHideUrl}`);
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error.message);
    }
}

scrapeTopSongs();
