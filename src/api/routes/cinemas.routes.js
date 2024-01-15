const express = require("express");
const {
	getCinemas,
	getCinema,
	addCinema,
	updateCinema,
	deleteCinema,
	addMovie,
} = require("../controllers/cinemas.controllers");

const cinemasRoutes = express.Router();

cinemasRoutes.get("/", getCinemas);
cinemasRoutes.get("/:id", getCinema);
cinemasRoutes.post("/", addCinema);
cinemasRoutes.patch("/:id", updateCinema);
cinemasRoutes.delete("/:id", deleteCinema);
cinemasRoutes.post("/movie", addMovie);

module.exports = cinemasRoutes;
