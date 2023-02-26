const db = require("../db/dbConfig.js");

const getReviews = async (movie_id) => {
  let query = "SELECT * FROM reviews WHERE movie_id = ${movie_id}";


  const reviews = await db.any(query, {movie_id});
  return reviews;
};

const getReview = async (id) => {
    const movie = await db.oneOrNone("SELECT * FROM reviews WHERE id=${id}", {id})
    return movie;
}

const newReview = async (review) => {
  let query = "INSERT INTO reviews ";
  const fields = `(name, rating, review, movie_id)`

  let values = "VALUES (${name}, ${rating}, ${review}, ${movie_id})";
  
  query += fields;
  query += values;
  query += " RETURNING id";

  const result = await db.one(query, review);
  return result;
};

const editReview = async (id, movie) => {
    const query = 'UPDATE reviews SET name=${name}, rating=${rating}, review=${review} WHERE id=${id} RETURNING id'
    const result = await db.one(query, {id, ...review})
    return result;
}

const deleteReview = async (id) => {
  const review = await db.oneOrNone(
    "DELETE FROM reviews WHERE id=${id} RETURNING id",
    { id }
  );
  return review;
};

module.exports = { getReviews, newReview, deleteReview, getReview, editReview};