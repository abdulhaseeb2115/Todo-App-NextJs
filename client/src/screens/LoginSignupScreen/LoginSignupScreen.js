import React, { useState } from "react";
import "./LoginSignupScreen.css";

export default function LoginSignupScreen() {
	const [showLogin, setShowLogin] = useState(true);
	const [loginName, setLoginName] = useState("");
	const [loginPass, setLoginPass] = useState("");
	const [signupName, setSignupName] = useState("");
	const [signupPass, setSignupPass] = useState("");

	// handle signup
	function handleSignup() {}

	// handle login
	function handleLogin() {}

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
				rounded-md p-8"
			>
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

					{/* button */}
					<button
						className="bg-transparent
							px-4 py-1 ml-auto mt-5
							rounded-md
							text-black
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
