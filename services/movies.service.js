require("dotenv").config();
const generateRandomHash = require("./../helpers/helpers");
const catalogueModel = require("../models/catalogue");
const movieModel = require("../models/movie");
const mongoose = require("mongoose");

async function createMovie(payload) {
	const { title, poster, genre, snyopsis } = payload;

	try {
		let movieDoc = new movieModel({
			title: title ?? "",
			genre: genre ?? "",
			poster: poster ?? "",
			snyopsis: snyopsis ?? "",
		});

		movieDoc = await movieDoc.save();

		console.log("movie created", movieDoc);
		return movieDoc;
	} catch (e) {
		throw new Error("db query error: create movie: " + e);
	}
}

async function addMovieToCatalogue(movieId) {
	let movie, movieDoc;

	try {
		movie = await movieModel
			.findOne({ _id: mongoose.Types.ObjectId(movieId) })
			.exec();
	} catch (e) {
		throw new Error(
			"add mov to cat err: db query error: fetch movie by id" + e
		);
	}

	if (!movie) {
		throw new Error("add mov to cat err: no movie with matching id");
	}

	try {
		await catalogueModel.findAndUpdate(
			{ name: "your catalogue" },
			{
				$push: {
					movies: {
						_id: movieDoc._id,
						title: movieDoc.title,
						poster: movieDoc.poster,
					},
				},
			},
			{ new: true, useFindAndModify: false }
		);
	} catch (e) {
		throw new Error("add mov to cat err: db query: update catalogue " + e);
	}
}

async function removeMovieFromCatalogue(movieId) {
	let movieDoc;

	try {
		movieDoc = await movieModel.findOne({ _id: movieId["movieId"] }).exec();
	} catch (e) {
		throw new Error(
			"add mov to cat err: db query error: fetch movie by id" + e
		);
	}

	if (!movieDoc) {
		throw new Error("add mov to cat err: no movie with matching id:" + movieId);
	}

	try {
		await catalogueModel.findOneAndUpdate(
			{ name: "your catalogue" },
			{
				$pull: {
					movies: {
						_id: movieId["movieId"],
					},
				},
			}
		);
	} catch (e) {
		throw new Error("add mov to cat err: db query: update catalogue " + e);
	}
}

async function getMyCatalogue() {
	try {
		return await catalogueModel.findOne({
			catalogue: { name: "your catalogue" },
		});
	} catch (e) {
		throw new Error("db query error: get catalogues " + e);
	}
}

async function findMovies(query, sort) {
	let movies;

	const resolution =
		query?.length >= 1
			? {
					title: {
						$regex: query,
						$options: "i",
					},
			  }
			: null;

	try {
		if (sort) {
			movies = await movieModel.find(resolution).sort({ title: sort });
		} else {
			movies = await movieModel.find(resolution);
		}
		return movies;
	} catch (e) {
		throw new Error("db query error: find movie " + e);
	}
}

module.exports = {
	createMovie,
	findMovies,
	getMyCatalogue,
	addMovieToCatalogue,
	removeMovieFromCatalogue,
};
