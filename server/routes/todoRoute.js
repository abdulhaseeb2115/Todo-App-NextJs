import express from "express";
import {
	addItem,
	deleteItem,
	getAllItems,
	updateItemStatus,
} from "../controllers/todoController.js";
import isAuthenticatedUser from "../middleware/auth.js";

const router = express.Router();

router.get("/all", isAuthenticatedUser, getAllItems); // get all item
router.post("/add", isAuthenticatedUser, addItem); // add item
router.delete("/delete/:itemId", isAuthenticatedUser, deleteItem); // delete item
router.put("/update/:itemId", isAuthenticatedUser, updateItemStatus); // mark item as completed

export default router;
