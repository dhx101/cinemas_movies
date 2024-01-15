const mongoose = require("mongoose");

const movieScheme = new mongoose.Schema(
	{
		title: {
			type: String,
			require: [true, "The movie need an unique name"],
			unique: true,
			trim: true,
			minlenght: 2,
		},
		director: {
			type: String,
			trim: true,
		},
		year: {
			type: Number,
			require: [true, "Add the year when the movie was launched"],
			trim: true,
		},
		genre: {
			type: Array,
			require: [true, "The movies needs atleast 1 genre"],
			trim: true,
		},
		actors: {
			type: Array,
			require: [true, "The movie needs atleast 1 actor"],
			trim: true,
		},
		rated: {
			type: Number,
			trim: true,
		},
		studio: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Movies = mongoose.model("Movies", movieScheme);
module.exports = Movies;
