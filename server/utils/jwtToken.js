// Creating Token & saving inside Cookie
const sendToken = async (user, statusCode, res) => {
	const token = user.getJWTToken();
	// console.log(token);

	// options for cookie
	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		// secure: "isSecure",
	};
	console.log("-> Token sent to - " + user.name);
	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		user,
		token,
	});
};

export default sendToken;
