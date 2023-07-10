import User from "../models/userModel.js";

// GET USER BY NAME
const getUserByName = async (name) => {
	return await User.findOne({ name: name });
};

// GET USER BY ID
const getUserById = async (userId) => {
	return await User.findById(userId);
};

// CREATE NEW USER
const createUser = async (name, password) => {
	return await User.create({
		name: name,
		password: password,
	});
};

export default { getUserById, getUserByName, createUser };
