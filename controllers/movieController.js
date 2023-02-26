const {
    getMovies,
    newMovie,
    deleteMovie,
    getMovie,
    editMovie,
  } = require("../queries/movies");
  
  const movies = async (req, res, next) => {
    try {
      const movies = await getMovies(req.query);
      return res.status(200).json(movies);
    } catch (err) {
      next();
    }
  };
  
  const showMovie = async (req, res, next) => {
    try {
      const movie = await getMovie(req.params.id);
      return res.status(200).json(movie);
    } catch (err) {
      next();
    }
  };
  
  const createMovie = async (req, res, next) => {
    try {
      const movie = await newMovie(req.body);
      return res.status(200).json(movie);
    } catch (err) {
      next();
    }
  };
  
  const updateMovie = async (req, res, next) => {
    try {
      const movie = await editMovie(req.params.id, req.body);
      return res.status(200).json(movie);
    } catch (err) {
      next();
    }
  };
  
  const removeMovie = async (req, res, next) => {
    try {
      const movie = await deleteMovie(req.params.id);
      return res.status(200).json(movie);
    } catch (err) {
      next();
    }
  };
  
  module.exports = { movies, createMovie, removeMovie, showMovie, updateMovie };