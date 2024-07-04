const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		rentperday: {
			type: Number,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		maxcount: {
			type: Number,
			required: true
		},
		phonenumber: {
			type: Number,
			required: true
		},
		imageurls: [],
		https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/84/7c/d4/hotel-crown-inn.jpg?w=1000&h=-1&s=1: {
			type: String,
			required: true
		},
		currentBookings: []
	},
	{
		timestamps: true
	}
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
