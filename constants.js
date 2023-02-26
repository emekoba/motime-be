const movieModel = require("./models/movie");

const movieList = [
	new movieModel({
		name: "Star Wars",
		images: [
			"https://c4.wallpaperflare.com/wallpaper/356/487/776/star-wars-background-darth-vader-darth-vader-wallpaper-preview.jpg",
			"https://c4.wallpaperflare.com/wallpaper/86/598/484/star-wars-millennium-falcon-star-wars-the-force-awakens-c-3po-wallpaper-preview.jpg",
		],
	}),

	new movieModel({
		name: "Iron Man",
		images: [
			"https://media.wired.com/photos/59ef63d734ce5c0e0a752f30/16:9/w_960,h_540,c_limit/IronMan3-HP.jpg",
		],
	}),
];

module.exports = {
	movieList,
};
