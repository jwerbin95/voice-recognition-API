const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommandSchema = new Schema(
	{
		name: String,
		value: String
	},
	{
		collection: 'collection'
	}
)

module.exports = mongoose.model('Command', CommandSchema)