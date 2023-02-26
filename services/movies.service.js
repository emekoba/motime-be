require("dotenv").config();
const movieModel = require("../models/movie");

async function getMovie(id) {
	let movie;

	try {
		movie = await movieModel.findById(id).exec();
	} catch (e) {
		Logger.error(e);
		throw new Error("db query error: fetch movie by id");
	}

	console.log("movie", movie);

	if (!movie) {
		throw new Error("could not find movie of id provided");
	}
}

async function getAllMovies() {}

module.exports = {
	getMovie,
	getAllMovies,
};
