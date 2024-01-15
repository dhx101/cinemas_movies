const mongoose = require("mongoose");
const { Schema } = mongoose;

const cinemaSchema = new Schema(
	{
		name: { type: String, require: true, trim: true },
		location: { type: String, require: true, trim: true },
		brand: { type: String },
		movies: [{ type: Schema.Types.ObjectId, ref: "Movies" }],
	},
	{
		timestamps: true,
	}
);

const Cinemas = mongoose.model("Cinema", cinemaSchema);
module.exports = Cinemas;
