const pgp = require("pg-promise")();
require("dotenv").config();

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;

const cn = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USER,
};

const db = pgp(cn);

async function init() {
  try {
    const prev = await db.oneOrNone('SELECT COUNT(*) FROM movie_list');
    if (parseInt(prev.count) > 20) return;

    const cs = new pgp.helpers.ColumnSet(['name', 'image', 'rating', 'description'], {table: 'movie_list'});
    let values = [];
    for (let i = 1; i < 20; i++) {
      const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e4534028c24f38be074511f0bb535db7&page=${i}`
      const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280';
      const movies = await fetch(url);
      const moviesJson = await movies.json();
      for (const movie of moviesJson.results) {
        const obj = {name: movie.title, image: IMAGE_PATH + movie.poster_path, rating: parseFloat(movie.vote_average), description: movie.overview};
        values.push(obj);
      }
    }

    const query = pgp.helpers.insert(values, cs);
    console.log("insert")
    await db.none(query);
  } catch(err) {
    console.error(err)
  }
}

init();


module.exports = db;