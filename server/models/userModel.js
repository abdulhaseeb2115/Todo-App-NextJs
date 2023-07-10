import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter your Name"],
			uniue: [true, "Username already in use"],
			maxLength: [20, "Name cannot exceed 20 characters"],
			minLength: [3, "Name should have more than 3 characters"],
		},
		password: {
			type: String,
			required: [true, "Please enter your Password"],
			minLength: [8, "Password should have more than 8 characters"],
			// select: false,
		},
	},
	{ timestamps: true }
);

// For Hashing Password
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

// Compare Password
userSchema.methods.comparePassword = async function (givenPassworrd) {
	return await bcrypt.compare(givenPassworrd, this.password);
};

var User = mongoose.model("User", userSchema);
export default User;
