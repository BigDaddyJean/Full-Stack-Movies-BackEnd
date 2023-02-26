const express = require("express");
const cors = require("cors");
const { movies, createMovie, removeMovie, showMovie, updateMovie } = require("./controllers/movieController");
const { reviews, createReview, removeReview, showReview, updateReview } = require("./controllers/reviewController");
const errorHandler = require("./errorHandler");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/movies", movies)
app.get("/movies/:id", showMovie)
app.post("/movies", createMovie)
app.put("/movies/:id", updateMovie)
app.delete("/movies/:id", removeMovie)

app.get("/reviews/:movie_id", reviews)
app.get("/reviews/show/:review_id", showReview)
app.post("/reviews", createReview)
app.put("/reviews/:review_id",updateReview)
app.delete("/reviews/:review_id",removeReview)
app.use(errorHandler)

module.exports = app;
