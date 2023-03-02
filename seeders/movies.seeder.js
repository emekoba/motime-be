const movieModel = require("../models/movie");
const catalogueModel = require("../models/catalogue");
const { movieList } = require("../constants");

async function seedMovies() {
	try {
		movie = await movieModel.findOne().exec();
		catalogue = await catalogueModel.findOne().exec();
	} catch (e) {
		throw new Error("seedMovies: db query error: fetch movie by id");
	}

	if (!catalogue) {
		try {
			catalogueDoc = new catalogueModel({
				name: "your movies",
				default: true,
			});

			await catalogueDoc.save();
			console.log("catalogues seeded successfully..📔📔📔📔");
		} catch (e) {
			throw new Error("seedMovies: db query error: seed catalogue" + e);
		}
	}

	if (!movie) {
		try {
			Promise.all(
				movieList.map(async (mov, i) => {
					let movieDoc = new movieModel({
						title: mov["title"] ?? "",
						genre: mov["genre"] ?? "",
						synopsis: mov["synopsis"] ?? "",
						poster: mov["poster"] ?? "",
					});

					movieDoc = await movieDoc.save();

					if (i == 0) {
						await catalogueModel.findByIdAndUpdate(
							catalogueDoc._id,
							{
								$push: {
									movies: {
										_id: movieDoc._id,
										title: movieDoc.title,
										poster: movieDoc.poster,
										genre: movieDoc.genre,
										synopsis: movieDoc.synopsis,
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
