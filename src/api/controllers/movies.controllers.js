const Movies = require("../models/movies.models");

//get all
const getMovies = async (req, res) => {
	try {
		const movies = await Movies.find();
		res.status(200).json(movies);
		console.log("INFO: Retreived all Movies");
	} catch (error) {
		res.status(500).json({
			message: "Movies not found",
		});
		console.error("ERROR: Failed to retrieve all movies ->", error.message);
	}
};

//get one
const getMovie = async (req, res) => {
	try {
		const id = req.params.id;
		const movie = await Movies.findById(id);
		res.status(200).json(movie);
		console.log("INFO: Retreived the movie");
	} catch (error) {
		res.status(500).json({
			message: "Movies not found",
		});
		console.error("ERROR: Failed to retrieve all movies ->", error.message);
	}
};

//post
const addMovie = async (req, res) => {
	const movie = new Movies(req.body);
	try {
		await movie.save();
		res.status(201).json({ message: "The movie has been created", movie });
		console.log("INFO: Retreived all Movies");
	} catch (error) {
		res.status(500).json({
			message: "Movies not found",
		});
		console.error("ERROR: Failed to retrieve all movies ->", error.message);
	}
};

//patch
const updateMovie = async (req, res) => {
	try {
		const {id} = req.params;
		const body = new Movies(req.body) ;
		body._id = id
		console.log(body);
		const movie = await Movies.findByIdAndUpdate(id, body, { new: true });
		if (!movie) {
			res.status(404).json('No existe la pelicula con ese ID')
		}
		res.status(200).json(movie);
		console.log("INFO: Updated the movie");
	} catch (error) {
		res.status(400).json({
			message: "Was not possible to update the movie",
		});
		console.error("ERROR: Failed to update the movie ->", error.message);
	}
};

//delete
const deleteMovie = async (req, res) => {
	try {
		const {id} = req.params;
		const movie = await Movies.findByIdAndDelete(id);
		if (!movie) {
			res.status(404).json('No existe la pelicula con ese ID')
		}
		res.status(200).json(movie);
		console.log("INFO: Deleted the movie");
	} catch (error) {
		res.status(500).json({
			message: "Movies not found",
		});
		console.error("ERROR: Failed delete the movie ->", error.message);
	}
};

module.exports = {
	getMovies,
	getMovie,
	addMovie,
	updateMovie,
	deleteMovie,
};
