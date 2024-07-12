// Initial code from Co-Pilot
// > Please provide nodejs code to scrape the playback.fm charts pages to build a json list of songs and links
// > Using the Puppeteer example above, please add code to then jump to a linked page with the link text of "1980", then "1981".
// Please build functional code that calls the same method for each loaded page.

const puppeteer = require('puppeteer');

async function scrapePlaybackFm(year) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.playback.fm/charts/top-100-songs');

    // Click the link for the specified year
    await page.click(`a[href*="${year}"]`);

    // Wait for the page to load (you might need to adjust the selector)
    await page.waitForSelector('.chart-list-item');

    // Extract data (modify this according to the actual structure of the page)
    const songs = await page.evaluate(() => {
        const songElements = document.querySelectorAll('.chart-list-item');
        return Array.from(songElements).map((element) => {
            const title = element.querySelector('.chart-list-item-title').textContent;
            const link = element.querySelector('.chart-list-item-link').href;
            return { title, link };
        });
    });

    console.log(`Songs for ${year}:`, JSON.stringify(songs, null, 2));

    // If you want to scrape more years, call the function recursively
    // Example: await scrapePlaybackFm('1981');

    await browser.close();
}

// Start with the year 1980
scrapePlaybackFm('1980');
