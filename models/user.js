const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			isUnique: true
		},
		password: {
			type: String,
			required: true
		},
		admin: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
