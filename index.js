const express = require("express");
const app = express();

const port = 1300;

app.listen(port, async () => {
	console.log(`listening on port ${port}`);
});

module.exports = {
	server: app,
};
