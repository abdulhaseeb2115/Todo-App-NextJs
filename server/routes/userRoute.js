import express from "express";
import {
	loginUser,
	logoutUser,
	loadUser,
	registerUser,
} from "../controllers/userController.js";
import isAuthenticatedUser from "../middleware/auth.js";
const router = express.Router();

router.post("/login", loginUser); // login
router.post("/register", registerUser); // register
router.get("/load", isAuthenticatedUser, loadUser); // load user
router.get("/logout", isAuthenticatedUser, logoutUser); // logout

export default router;
