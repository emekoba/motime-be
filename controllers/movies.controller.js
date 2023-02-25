const { server } = require("../index");

server.get("/bruv", async (req, res) => {
	console.log("first");
});
