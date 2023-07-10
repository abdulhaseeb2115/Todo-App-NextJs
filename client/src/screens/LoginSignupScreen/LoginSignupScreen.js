import React, { useState } from "react";
import "./LoginSignupScreen.css";
import { toast } from "react-hot-toast";
import * as api from "../../api/userRequests";
import { useDispatch } from "react-redux";
import { logIn } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginSignupScreen() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [showLoader, setShowLoader] = useState(false);
	const [showLogin, setShowLogin] = useState(true);

	const [loginName, setLoginName] = useState("");
	const [loginPass, setLoginPass] = useState("");
	const [signupName, setSignupName] = useState("");
	const [signupPass, setSignupPass] = useState("");

	// handle signup
	const handleSignup = async () => {
		if (signupName === "" || signupPass === "") {
			toast.error("Fill all fields");
			return;
		}

		if (signupPass.length < 8) {
			toast.error("Password should have atleast 8 characters");
			return;
		}

		setShowLoader(true);

		try {
			const { data } = await api.Register({
				name: signupName,
				password: signupPass,
			});
			if (data.success === true) {
				console.log("-> user signed up");
				setShowLoader(false);

				localStorage.setItem("jwtToken", data.token);
				axios.defaults.headers.common["Authorization"] = data.token;

				dispatch(logIn({ user: data.user }));
				navigate("/");

				toast.success("Welcome To Todo App");
				toast.success(`Registered as ${data?.user.name}`);
			}
		} catch (error) {
			setShowLoader(false);
			console.log(error);
			console.log(error?.response?.data?.message ?? "Message not found !");
			toast.error(error?.response?.data?.message ?? "An error occured !");
		}
	};

	// handle login
	const handleLogin = async () => {
		if (loginName === "" || loginPass === "") {
			toast.error("Fill all fields");
			return;
		}
		setShowLoader(true);

		try {
			const { data } = await api.Login({
				name: loginName,
				password: loginPass,
			});
			if (data.success === true) {
				console.log("-> user logged in");
				setShowLoader(false);

				localStorage.setItem("jwtToken", data.token);
				axios.defaults.headers.common["Authorization"] = data.token;

				dispatch(logIn({ user: data.user }));
				navigate("/");

				toast.success(`Welcome Back !`);
				toast.success(`Logged In as ${data?.user.name}`);
			}
		} catch (error) {
			setShowLoader(false);
			console.log(error);
			console.log(error?.response?.data?.message ?? "Message not found !");
			toast.error(error?.response?.data?.message ?? "An error occured !");
		}
	};

	return (
		<div
			className="LoginScreen h-screen 
			flex items-center justify-center
			"
		>
			{/* Main Container */}
			<div
				className="MainContainer 
				flex items-center 
				h-[400px] w-[700px] 
				bg-white 
				rounded-md p-8
				relative
				"
			>
				{/* loader */}
				{showLoader && (
					<div
						className="
					absolute
					h-full w-full
					top-0 left-0
					bg-black bg-opacity-70
					rounded-md
					flex items-center justify-center
					"
					>
						<div className="h-10 aspect-square border-t-2 rounded-full animate-spin"></div>
					</div>
				)}

				{/* left container */}
				<div
					className="
					h-full w-1/2 pr-8 
					flex flex-col justify-center"
				>
					{/* logo */}
					<h1
						className="
						text-2xl font-bold 
						bg-[#A49377] text-white
						mx-aut w-fit px-6 py-2
						rounded-lg
						"
					>
						Todo-App
					</h1>

					{/* description */}
					<p className="text-sm text-[rgb(164,147,119)] mt-8">
						This fantastic tool is designed to assist you in staying organized
						and effortlessly managing your daily tasks. This app helps you keep
						record of all the tasks efficiently.
						<br />
						<br />
						Unlock the app's potential with a simple login or signup.
					</p>

					{/* links */}
					<div className="flex mt-4">
						<p
							className="text-sm cursor-pointer
							hover:opacity-70
							"
							onClick={() => navigate("/about")}
						>
							About Page
						</p>
						<p
							className="cursor-pointer text-sm 
							ml-2 hover:opacity-70"
							onClick={() => navigate("/dummy")}
						>
							Dummy Page
						</p>
					</div>

					{/* button */}
					<button
						className="bg-transparent
							px-4 py-1 ml-auto mt-3
							rounded-md
							text-black
							hover:opacity-70
							duration-300
							"
						onClick={() => setShowLogin(!showLogin)}
					>
						{showLogin ? "Go to Sign Up" : "Go to Log In"}
					</button>
				</div>

				{/* right container */}
				<div
					className="h-full w-1/2 
					pl-8 
					border-l-2 
					flex flex-col justify-center"
				>
					{showLogin ? (
						// login
						<div
							className="w-full 
						px-6 py-4 
						rounded-lg
						flex flex-col
						"
						>
							<h1 className="">Login</h1>
							<p className="text-xs border-b w-fit pb-1">
								Enter your account credentials
							</p>
							<input
								type="text"
								className="w-full p-1 px-4 rounded border border-gray-400 mt-5
							focus:outline-none"
								placeholder="Username"
								value={loginName}
								onChange={(e) => setLoginName(e.target.value)}
							/>
							<input
								type="text"
								className="w-full p-1 px-4 rounded border border-gray-400 mt-2
							focus:outline-none"
								placeholder="Password"
								value={loginPass}
								onChange={(e) => setLoginPass(e.target.value)}
							/>

							<button
								className="
								bg-[#A49377]
								px-4 py-1 ml-auto mt-5
								rounded-md
								text-white
								hover:opacity-70
								duration-300
								"
								onClick={() => handleLogin()}
							>
								Log In
							</button>
						</div>
					) : (
						// signup
						<div
							className="w-full 
						px-6 py-4 
						rounded-lg
						flex flex-col
						"
						>
							<h1 className="">Sign Up</h1>
							<input
								type="text"
								className="w-full p-1 px-4 rounded border border-gray-400 mt-5
								focus:outline-none"
								placeholder="Username"
								value={signupName}
								onChange={(e) => setSignupName(e.target.value)}
							/>
							<input
								type="text"
								className="w-full p-1 px-4 rounded border border-gray-400 mt-2
								focus:outline-none"
								placeholder="Password"
								value={signupPass}
								onChange={(e) => setSignupPass(e.target.value)}
							/>

							<button
								className="
								bg-[#A49377]
								px-4 py-1 ml-auto mt-5
								rounded-md
								text-white
								hover:opacity-70
								duration-300
								"
								onClick={() => handleSignup()}
							>
								Sign Up
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
