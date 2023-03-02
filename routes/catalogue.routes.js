const express = require("express");
const router = express.Router();
const movieService = require("../services/movies.service");

router.get("/to/:movieId", async (req, res) => {
	console.log("add movie to catalogue route called....", req.params);
	res.status(200).send(await movieService.addMovieToCatalogue(req.params));
});

router.get("/from/:movieId", async (req, res) => {
	console.log("remove movie to catalogue route called....", req.params);
	res.status(200).send(await movieService.removeMovieFromCatalogue(req.params));
});

router.get("/", async (req, res) => {
	console.log("get catalogue route called....");
	res.status(200).send(await movieService.getMyCatalogue());
});

module.exports = router;
