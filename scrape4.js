const axios = require('axios');
const cheerio = require('cheerio');

const ytRegex = /\/vi\/([^/]*)\//;
const host = 'https://playback.fm';

async function scrapeTopSongs() {
    try {
        const url = `${host}/charts/top-100-songs/1980`;
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Assuming the table has an ID of 'myTable'
        const songs = [];
        $('#myTable tr').each(async (index, element) => {
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
                try {
                    console.log('get YT url', host + mobileHideUrl)
                    const mobileResponse = await axios.get(host + mobileHideUrl);
                    const mobileData = cheerio.load(mobileResponse.data);
                    const youtubeUrl = mobileData('meta[property="og:image"]').attr('content');
                    const ytMatches = youtubeUrl.match(ytRegex)
                    const ytVideoId = (ytMatches && ytMatches.length > 0) ? ytMatches[1] : '';

                    const item = {
                        rank,
                        title,
                        artist,
                        artistUrl,
                        songUrl,
                        metaUrl,
                        mobileHideUrl,
                        youtubeUrl,
                        ytVideoId,
                    };

                    songs.push(item);
                } catch (error) {
                    console.error(`Error fetching data from ${mobileHideUrl}:`, error.message);
                }
            }
        });

        return songs;

    } catch (error) {
        console.error('Error fetching or parsing data:', error.message);
    }
}

(async function doIt() {
    const songs = await scrapeTopSongs();

// Print the scraped data
    console.log('songs', songs);

    songs.forEach(song => {
        console.log(`${song.rank}. ${song.title} - ${song.artist}`);
        console.log(`  Artist URL: ${song.artistUrl}`);
        console.log(`  Song URL: ${song.songUrl}`);
        console.log(`  Meta URL: ${song.metaUrl}`);
        console.log(`  Mobile Hide URL: ${song.mobileHideUrl}`);
        console.log(`  youtubeUrl: ${song.youtubeUrl}`);
    });
})();
