import mongoose from "mongoose";
import Todo from "../models/todoModel.js";

// GET ITEM BY ID
const getItemById = async (itemId) => {
	return await Todo.findById(itemId);
};

// ALL ITEMS
const getAllItems = async (userId) => {
	return await Todo.aggregate([
		{
			$match: {
				user: mongoose.Types.ObjectId(userId),
			},
		},
		{
			$sort: {
				createdAt: -1,
			},
		},
	]);
};

// ADD ITEM
const addItem = async (todo, userId) => {
	return await Todo.create({
		user: userId,
		todo: todo,
	});
};

// DELETE ITEM
const deleteItem = async (itemId) => {
	return await Todo.findByIdAndDelete(itemId);
};

// UPDATE ITEM STATUS
const updateItemStatus = async (itemId, status) => {
	const now = new Date();
	return await Todo.findByIdAndUpdate(
		itemId,
		{
			$set: {
				completed: status,
				completionTime: status === true ? now : null,
			},
		},
		{ new: true }
	);
};

export default {
	getAllItems,
	addItem,
	deleteItem,
	updateItemStatus,
	getItemById,
};
