const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
	{
		title: { type: String, required: true },
		poster: { type: String },
		genre: { type: String },
		synopsis: { type: String },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
