const User = require("../models/user");

exports.createUser = async (req, res) => {
	try {
		const newUser = await new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		await newUser.save();
		res.json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email, password: req.body.password });
		if (user) {
			res.send(user);
		} else {
			res.status(400).json({ message: "Login Failed" });
		}
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
