const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CatalogueSchema = new Schema(
	{
		name: { type: String, required: true },
		default: { type: Boolean, default: false },
		movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Catalogue", CatalogueSchema);
