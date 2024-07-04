const moment = require("moment");
const Booking = require("../models/booking");
const Room = require("../models/room");

exports.bookRoom = async (req, res) => {
	const { room, fromDate, toDate, totalAmount, totalDays, userId } = req.body;
	console.log(req.body);
	try {
		const newBooking = await new Booking({
			room: room.name,
			roomId: room._id,
			userId,
			fromDate: moment(fromDate, "DD-MM-YYYY"),
			toDate: moment(toDate, "DD-MM-YYYY"),
			totalAmount,
			totalDays,
			transactionId: "1234"
		});
		const booking = await newBooking.save();

		const reservedRoom = await Room.findOne({ _id: room._id });

		reservedRoom.currentBookings.push({
			bookingId: booking._id,
			fromDate: moment(fromDate, "DD-MM-YYYY"),
			toDate: moment(toDate, "DD-MM-YYYY"),
			userId,
			status: booking.status
		});

		await reservedRoom.save();

		res.json({ message: "Hello World!" });
	} catch (error) {
		res.send(error);
	}
};
