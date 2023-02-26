const db = require("../db/dbConfig.js");

const getMovies = async (filter) => {
  let query = "SELECT * FROM movie_list ";

  if (filter.search) {
    query += `WHERE name ILIKE '%${filter.search}%' `;
  }

  const totalMovies = await db.any(query);

  if (filter.sort) {
    query += "ORDER BY rating ";
    if (filter.sort === "LowToHigh")
      query += "ASC ";
    else 
      query += "DESC ";
  }


  if (filter.limit && parseInt(filter.limit) > 0) {
    query += `LIMIT ${filter.limit} OFFSET ${filter.page * filter.limit} `
  }

  const movies = await db.any(query);
  return {movies, count: totalMovies?.length};
};

const getMovie = async (id) => {
    const movie = await db.oneOrNone("SELECT * FROM movie_list WHERE id=${id}", {id})
    return movie;
}

const newMovie = async (movie) => {
  let query = "INSERT INTO movie_list ";
  const fields = `(name, rating, description${movie.image ? ", image" : ""})`;

  let values = "VALUES (${name}, ${rating}, ${description}";
  if (movie.image) values += ", ${image}";
  values += ")";

  query += fields;
  query += values;
  query += " RETURNING id";

  const result = await db.one(query, movie);
  return result;
};

const editMovie = async (id, movie) => {
    const query = 'UPDATE movie_list SET name=${name}, rating=${rating}, image=${image}, description=${description} WHERE id=${id} RETURNING id'
    const result = await db.one(query, {id, ...movie})
    return result;
}

const deleteMovie = async (id) => {
  const movie = await db.oneOrNone(
    "DELETE FROM movie_list WHERE id=${id} RETURNING id",
    { id }
  );
  return movie;
};

module.exports = { getMovies, newMovie, deleteMovie, getMovie, editMovie};