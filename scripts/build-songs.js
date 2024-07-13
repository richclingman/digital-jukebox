// empty songs.json
// for each genra
// for each year
// read json
// append to songs.json

const {existsSync, writeFileSync} = require("node:fs");


const songList = {};
const genres = ['top-100-songs', 'rock', 'country', 'rnb'];
for (let genre of genres) {
    songList[genre] = {};

    for (let year = 1900; year <= 2024; ++year) {
        songList[genre][year] = {};

        const filename = `../songs/${genre}/${year}.json`;

        console.log('--', genre, year, filename)

        const exists = existsSync(filename);
        if (!exists) {
            continue;
        }
        const songs = require(filename)

        // console.log(songs[0]);
        // console.log('songList', songList);

        for (let song of songs) {
            songList[genre][year][song.rank] = song;
        }

        // process.exit(1);

    }

    // console.log('songlist', JSON.stringify(songList, null, 2));

    writeFileSync('../public/songList.json', JSON.stringify(songList, null, 2));

}

/*

songs: {'top': {1900: {1: {song}, ...}, ...}

 */




