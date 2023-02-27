const express = require("express");
const router = express.Router();
const movieService = require("../services/movies.service");

router.get("/", async (req, res) => {
	console.log("find movies route called....");
	res.json(await movieService.findMovies(req.query));
});

// router.get("/:id", async (req, res) => {
// const { id } = req.params;
// await movieService.getMovie(id);
// });

module.exports = router;
