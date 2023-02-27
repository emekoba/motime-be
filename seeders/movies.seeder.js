const movieModel = require("../models/movie");
const catalogueModel = require("../models/catalogue");
const { movieList } = require("../constants");

async function seedMovies() {
	try {
		movie = await movieModel.findOne().exec();
	} catch (e) {
		Logger.error(e);
		throw new Error("seedMovies: db query error: fetch movie by id");
	}

	if (!movie) {
		let catalogueDoc;

		try {
			catalogueDoc = new catalogueModel({
				name: "all movies",
				default: true,
			});

			catalogueDoc = await catalogueDoc.save();
		} catch (e) {
			throw new Error("seedMovies: db query error: create catalogue" + e);
		}

		try {
			Promise.all(
				movieList.map(async (mov) => {
					let movieDoc = new movieModel({
						title: mov["title"],
						poster: mov["poster"],
					});

					movieDoc = await movieDoc.save();

					if (movieDoc) {
						await catalogueModel.findByIdAndUpdate(
							catalogueDoc._id,
							{
								$push: {
									movies: {
										_id: movieDoc._id,
									},
								},
							},
							{ new: true, useFindAndModify: false }
						);
					}
				})
			).then((res) => {
				console.log("movies seeded successfully..🍿🍿🍿🍿");
			});
		} catch (e) {
			throw new Error("seedMovies: db query error: insert many" + e);
		}
	}
}

module.exports = {
	seedMovies,
};
