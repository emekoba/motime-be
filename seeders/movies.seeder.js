const movieModel = require("../models/movie");
const movieList = require("../constants");

async function seedMovies() {
	try {
		movie = await movieModel.findOne().exec();
	} catch (e) {
		Logger.error(e);
		throw new Error("seedMovies: db query error: fetch movie by id");
	}

	console.log("movie", movie);

	if (!movie) {
		try {
			// movieModel.insertMany(movieList).then(() => {
			console.log("movies seeded successfully..🍿🍿🍿🍿");
			// });

			// movieModel.save(movie);

			const bruh = new movieModel({
				name: "Fincra",
			});

			await bruh.save();
		} catch (e) {
			Logger.error(e);
			throw new Error("seedMovies: db query error: insert many");
		}
	}
}

module.exports = {
	seedMovies,
};
