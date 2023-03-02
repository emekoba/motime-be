const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const movieRoutes = require("./routes/movie.routes");
const catalogueRoutes = require("./routes/catalogue.routes");
require("dotenv").config();
const bodyParser = require("body-parser");
const startdbConnection = require("./config/db.conifg");
const { seedMovies } = require("./seeders/movies.seeder");
const { PORT } = process.env;

startdbConnection();

var options = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

app.use(cors(options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.json());

app.use("/movies", movieRoutes);
app.use("/catalogue", catalogueRoutes);

mongoose.connection.once("open", () => {
	if (process.env.NODE_ENV !== "test") {
		console.log("db conection successful");
		seedMovies();
		app.listen(PORT, async () => {
			console.log(`listening on port ${PORT}`);
		});
	}
});

module.exports = app;
