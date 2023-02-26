const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CatalogueSchema = require("./catalogue");

const MovieSchema = new Schema(
	{
		name: { type: String, required: true },
		images: [{ type: String }],
		catalogue: CatalogueSchema.schema,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
