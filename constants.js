// const movieModel = require("./models/movie");

const movieList = [
	{
		title: "Star Wars",
		genre: "",
		synopsis: "",
		poster:
			"https://c4.wallpaperflare.com/wallpaper/356/487/776/star-wars-background-darth-vader-darth-vader-wallpaper-preview.jpg",
	},
	{
		title: "Iron Man",
		genre: "",
		synopsis: "",
		poster:
			"https://media.wired.com/photos/59ef63d734ce5c0e0a752f30/16:9/w_960,h_540,c_limit/IronMan3-HP.jpg",
	},
];

const sortTypes = ["ASC", "DESC"];

module.exports = {
	movieList,
	sortTypes,
};
