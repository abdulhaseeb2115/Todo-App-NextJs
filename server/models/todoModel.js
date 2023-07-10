import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "Please enter user id"],
		},
		todo: {
			type: String,
			required: [true, "Please enter todo item name"],
			maxLength: [20, "Todo item name cannot exceed 20 characters"],
		},
		completed: {
			type: Boolean,
			default: false,
		},
		completionTime: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true }
);

var Todo = mongoose.model("Todo", todoSchema);
export default Todo;
