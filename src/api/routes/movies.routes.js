const express = require("express");
const {
	getMovies,
	getMovie,
	addMovie,
	updateMovie,
	deleteMovie,
} = require("../controllers/movies.controllers");


const moviesRoutes = express.Router();

moviesRoutes.get('/',getMovies);
moviesRoutes.get('/:id',getMovie);
moviesRoutes.post('/',addMovie);
moviesRoutes.patch('/:id',updateMovie);
moviesRoutes.delete('/:id', deleteMovie)

module.exports = moviesRoutes