const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema(
	{
		title: { type: String, required: true },
		poster: { type: String },
		catalogue: { type: Schema.Types.ObjectId, ref: "Catalogue" },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
