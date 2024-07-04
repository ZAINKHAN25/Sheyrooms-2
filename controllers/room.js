const Room = require("../models/room");

exports.listAll = async (req, res) => {
	try {
		const rooms = await Room.find({});
		res.json({ rooms });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getRoom = async (req, res) => {
	console.log(req.params.id);
	try {
		const room = await Room.findOne({ _id: req.params.id });
		res.json(room);
	} catch (error) {
		res.status(400).json({
			error: error.message
		});
	}
};
