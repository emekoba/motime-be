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

module.exports = router;
