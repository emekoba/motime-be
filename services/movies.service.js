require("dotenv").config();
const movieModel = require("../models/movie");

async function createMovie(payload) {
	const { title, imageUrl } = payload;

	try {
		let movie = new movieModel({
			title,
			imageUrl,
		});

		movie = await movie.save();

		console.log("movie created", movie);

		return movie;
	} catch (e) {
		throw new Error("db query error: create movie: " + e);
	}
}

async function findMovies(query) {
	let movies;

	try {
		movies = await movieModel.find({ title: { $regex: ".*" + query + ".*" } });
	} catch (e) {
		throw new Error("db query error: find movie " + e);
	}

	return movies;
}

async function getMovieById(id) {
	let movie;

	try {
		movie = await movieModel.findById(id).exec();
	} catch (e) {
		throw new Error("db query error: fetch movie by id");
	}

	console.log("movie", movie);

	if (!movie) {
		throw new Error("could not find movie of id provided");
	}
}

async function getAllMovies() {}

module.exports = {
	findMovies,
	getMovieById,
};
