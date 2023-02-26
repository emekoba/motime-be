const mongoose = require("mongoose");
const { DB_URL } = process.env;

async function startdbConnection() {
	try {
		mongoose.connect(DB_URL);
	} catch (err) {
		console.log("err", err);
	}
}

module.exports = startdbConnection;
