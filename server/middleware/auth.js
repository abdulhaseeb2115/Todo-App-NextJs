import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

/***************/

// Validate Login Status -->user
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		console.log("--> User Token Does Not Exist.");
		return next(new ErrorHandler(401, "Please Login to access this resource"));
	}

	console.log("--> User Token Exists.");

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decodedData.id);
	next();
});

// Validate Login Status -->super/sub/support
export const isAuthenticatedAdmin = catchAsyncErrors(async (req, res, next) => {
	// console.log(req);
	const { token } = req.cookies;

	if (!token) {
		console.log("--> Admin Token Does Not Exist.");
		return next(new ErrorHandler(401, "Please Login to access this resource"));
	}

	console.log("--> Admin Token Exists");

	const decodedData = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await Admin.findById(decodedData.id);
	next();
});

/***************/

// Compare User Type -->super/sub/support
export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					403,
					`Role: (${req.user.role}) is not allowed to access this resource`
				)
			);
		}
		next();
	};
};
