const httpStatusCode = require("../../../utils/httpStatusCode");
const Cinemas = require("../models/cinema.models");
const Movies = require("../models/movies.models");

//get all
const getCinemas = async (req, res) => {
	try {
		const cinema = await Cinemas.find().populate("movies");
		res.status(200).json(cinema);
		console.log("INFO: Retreived all Cinemas");
	} catch (error) {
		res.status(500).json({
			message: "Cinemas not found",
		});
		console.error("ERROR: Failed to retrieve all cinema ->", error.message);
	}
};

//get one
const getCinema = async (req, res) => {
	try {
		const id = req.params.id;
		const cinema = await Cinemas.findById(id).populate("movies");
		res.status(200).json(cinema);
		console.log("INFO: Retreived the cinema");
	} catch (error) {
		res.status(500).json({
			message: "Cinema not found",
		});
		console.error("ERROR: Failed to retrieve one cinema ->", error.message);
	}
};

//post
const addCinema = async (req, res) => {
	const cinema = new Cinemas(req.body);

	try {
		await cinema.save();
		res.status(201).json({ message: "The cinema has been created", cinema });
		console.log("INFO: Added Cinema");
	} catch (error) {
		res.status(500).json({
			message: "Cinemas not found",
		});
		console.error("ERROR: Failed to add cinema ->", error.message);
	}
};

//patch
const updateCinema = async (req, res) => {
	try {
		const { id } = req.params;
		const body = new Cinemas(req.body);
		body._id = id;
		console.log(body);
		const cinema = await Cinemas.findByIdAndUpdate(id, body, { new: true });
		if (!cinema) {
			res.status(404).json("No existe la pelicula con ese ID");
		}
		res.status(200).json(cinema);
		console.log("INFO: Updated the cinema");
	} catch (error) {
		res.status(400).json({
			message: "Was not possible to update the cinema",
		});
		console.error("ERROR: Failed to update the cinema ->", error.message);
	}
};

//delete
const deleteCinema = async (req, res) => {
	try {
		const { id } = req.params;
		const cinema = await Cinemas.findByIdAndDelete(id);
		if (!cinema) {
			res.status(404).json("No existe la pelicula con ese ID");
		}
		res.status(200).json(cinema);
		console.log("INFO: Deleted the cinema");
	} catch (error) {
		res.status(500).json({
			message: "Cinemas not found",
		});
		console.error("ERROR: Failed delete the cinema ->", error.message);
	}
};

const addMovie = async (req, res, next) => {
	const { cinema_id, movie_id } = req.body;
	if (!cinema_id || !movie_id) {
		return res.status(404).json({
			status: 404,
			message: httpStatusCode(404),
			data: req.body,
		});
	}
	try {
		const cinema = await Cinemas.findById(cinema_id);
		const movie = await Movies.findById(movie_id);
		if (cinema && movie) {
			cinema.movies.push(movie_id);
			await cinema.save();
			res.status(200).json({
				status: 200,
				message: httpStatusCode[200],
				data: cinema,
			});
		}
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getCinemas,
	getCinema,
	addCinema,
	updateCinema,
	deleteCinema,
	addMovie,
};
