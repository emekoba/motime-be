const express = require("express");
const { sortTypes } = require("../constants");
const router = express.Router();
const movieService = require("../services/movies.service");

router.get("/", async (req, res) => {
	console.log("find movies route called....");
	const { query, sort } = req.query;

	if (sort?.length >= 1 && !sortTypes.includes(sort.toUpperCase())) {
		res.status(400).send({
			message: "invalid sort args",
		});
	}

	res.status(200).send(await movieService.findMovies(query, sort));
});

router.post("/create", async (req, res) => {
	console.log("create movie route called....", req.body);
	res.status(201).send(await movieService.createMovie(req.body));
});

// router.patch("/to-catalogue/:movieId", async (req, res) => {
// 	console.log("add movie to catalogue route called....", req.params);
// 	res.status(200).send(await movieService.addMovieToCatalogue(req.params));
// });

// router.patch("/from-catalogue/:movieId", async (req, res) => {
// 	console.log("remove movie to catalogue route called....", req.params);
// 	res.status(200).send(await movieService.removeMovieFromCatalogue(req.params));
// });

// router.get("/catalogue", async (req, res) => {
// 	console.log("get catalogue route called....");
// 	res.status(200).send(await movieService.getMyCatalogue());
// });

module.exports = router;
