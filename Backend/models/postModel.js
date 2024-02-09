const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: { type: String, required: true },
	category: { type: String, enum: ['Agriculture', 'Bussiness','Education','Entertainment','Art','Investment','Uncategorized','Weather'],message:"VALUE is not supported"},
	description: { type: String, required: true },
	creator: { type: Schema.Types.ObjectId, ref: "User" },
	thumbnail: { type: String, required: true },
},{timestamps:true});


module.exports = mongoose.model("Post",postSchema)