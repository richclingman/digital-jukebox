// scrape playback.fm charts
// initial code from Co-Pilot

// npm install --save request request-promise cheerio puppeteer
// node myScraper.js

const rp = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
    .then((html) => {
        // Parse the HTML using Cheerio
        const $ = cheerio.load(html);
        const presidents = [];

        // Example: Get the names of U.S. presidents
        $('.wikitable tbody tr').each((index, element) => {
            const name = $(element).find('td:nth-child(3)').text().trim();
            presidents.push(name);
        });

        console.log('U.S. Presidents:', presidents);
    })
    .catch((err) => {
        console.error('Error fetching data:', err);
    });
