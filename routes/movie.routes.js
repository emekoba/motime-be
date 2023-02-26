const express = require("express");
const router = express.Router();
const movieService = require("../services/movies.service");

router.get("/:id", async (req, res) => {
	console.log(req.params);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	await movieService.getMovie(id);
});

module.exports = router;
