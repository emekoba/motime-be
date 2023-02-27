const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const movieRoutes = require("./routes/movie.routes");
require("dotenv").config();
const startdbConnection = require("./config/db.conifg");
const { seedMovies } = require("./seeders/movies.seeder");
const { PORT } = process.env;

startdbConnection();

app.use(cors());
app.use("/movies", movieRoutes);

mongoose.connection.once("open", () => {
	console.log("db conection successful");
	seedMovies();

	app.listen(PORT, async () => {
		console.log(`listening on port ${PORT}`);
	});
});
