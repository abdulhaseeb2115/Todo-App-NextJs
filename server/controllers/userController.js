import sendToken from "../utils/jwtToken.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import UserService from "../services/userService.js";

// LOGIN USER -->user
export const loginUser = catchAsyncErrors(async (req, res, next) => {
	const { name, password } = req.body;
	// console.log(name, password);
	if (!name || !password) {
		// if name or password not given
		return next(new ErrorHandler(400, "Please enter Name & Password !"));
	}

	const user = await UserService.getUserByName(name);
	if (!user) {
		// if name not foud
		return next(new ErrorHandler(401, "User not found !"));
	}

	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		//if password is not matched
		return next(new ErrorHandler(401, "Invalid Password !"));
	}

	sendToken(user, 200, res); //function for token
});

// LOGOUT USER -->user
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: "Logged Out",
	});
});

// LOAD USER -->user
export const loadUser = catchAsyncErrors(async (req, res, next) => {
	const user = await UserService.getUserById(req.user.id);

	res.status(200).json({
		success: true,
		user: user,
	});
});

// REGISTER USER -->user
export const registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, password } = req.body;
	// console.log(name, password);
	if (!name || !password) {
		// if name or password not given
		return next(new ErrorHandler(400, "Please enter Name & Password"));
	}

	const user = await UserService.createUser(name, password);

	sendToken(user, 200, res); //function for token
});
