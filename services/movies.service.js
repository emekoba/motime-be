require("dotenv").config();
const movieModel = require("../models/movie");

async function createMovie(payload) {
	const { title, imageUrl } = payload;

	try {
		let movieDoc = new movieModel({
			title: mov["title"],
			poster: mov["poster"],
		});

		movieDoc = await movieDoc.save();

		console.log("movie created", movieDoc);
		return movieDoc;
	} catch (e) {
		throw new Error("db query error: create movie: " + e);
	}
}

async function getCatalogues() {
	try {
		return await movieModel.find();
	} catch (e) {
		throw new Error("db query error: get catalogues " + e);
	}
}

async function findMovies(query, order) {
	try {
		return await movieModel.find({ title: { $regex: ".*" + query + ".*" } });
	} catch (e) {
		throw new Error("db query error: find movie " + e);
	}
}

module.exports = {
	createMovie,
	findMovies,
	getCatalogues,
};
