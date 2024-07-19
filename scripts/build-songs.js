import {existsSync, readFileSync, writeFileSync} from "node:fs";

const songList = {};
const genres = ['top-100-songs', 'rock', 'country', 'rnb'];
for (let genre of genres) {
    songList[genre] = {};

    let decade = 0;
    for (let year = 1900; year <= 2024; ++year) {
        console.log('dec', decade, year, year % 10);
        if (year % 10 === 0) {
            decade = year;
            console.log('decade', decade)
        }

        const filename = `../songs/${genre}/${year}.json`;

        console.log('--', genre, year, filename)

        const exists = existsSync(filename);
        if (!exists) {
            continue;
        }
        const songsJson = readFileSync(filename);
        const songs = JSON.parse(songsJson.toString());

        if (songs.length === 0) {
            continue;
        }

        if (songList[genre][decade] === undefined) {
            songList[genre][decade] = {};
        }

        songList[genre][decade][year] = [];
        for (let song of songs) {
            delete song.artistUrl;
            delete song.songUrl;
            delete song.metaUrl;
            delete song.mobileHideUrl;

            song.youtubeImageUrl = song.youtubeUrl;
            delete song.youtubeUrl;

            songList[genre][decade][year].push(song);
        }
    }

    writeFileSync('../static/data/songList-spaced.json', JSON.stringify(songList, null, 2));
    writeFileSync('../static/data/songList.json', JSON.stringify(songList));
}
