const {
    getReviews,
    newReview,
    deleteReview,
    getReview,
    editReview,
  } = require("../queries/reviews");
  
  const reviews = async (req, res, next) => {
    try {
      const reviews = await getReviews(req.params.movie_id);
      return res.status(200).json(reviews);
    } catch (err) {
      next();
    }
  };
  
  const showReview = async (req, res, next) => {
    try {
      const review = await getReview(req.params.review_id);
      return res.status(200).json(review);
    } catch (err) {
      next();
    }
  };
  
  const createReview = async (req, res, next) => {
    try {
      const review = await newReview(req.body);
      return res.status(200).json(review);
    } catch (err) {
      next();
    }
  };
  
  const updateReview = async (req, res, next) => {
    try {
      const review = await editReview(req.params.movie_id, req.body);
      return res.status(200).json(review);
    } catch (err) {
      next();
    }
  };
  
  const removeReview = async (req, res, next) => {
    try {
      const review = await deleteReview(req.params.movie_id);
      return res.status(200).json(review);
    } catch (err) {
      next();
    }
  };
  
  module.exports = { reviews, createReview, removeReview, showReview, updateReview };