import userService from "../services/userService.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

/***************/

// Validate Login Status -->user
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	// const { token } = req.cookie;
	const token = req.headers.authorization;

	if (!token) {
		console.log("--> User Token Does Not Exist.");
		return next(new ErrorHandler(401, "Please Login to access this resource"));
	}

	console.log("--> User Token Exists.");

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);

	console.log("Token -> " + token);
	console.log("Id -> " + decodedData.id);

	req.user = await userService.getUserById(decodedData.id);
	next();
});

export default isAuthenticatedUser;
