import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Screens from "./screens/all";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, selectUser } from "./features/userSlice";
import * as api from "./api/userRequests";
import axios from "axios";

function App() {
	const dispatch = useDispatch();
	const { loading, user } = useSelector(selectUser);
	console.log(loading, user);

	useEffect(() => {
		const getData = async () => {
			try {
				// fetch token and set axios header if it exists
				const token = localStorage.getItem("jwtToken");
				if (!token) {
					console.log("app.js-> jwt token error");
					dispatch(logOut());
					return;
				}
				axios.defaults.headers.common["Authorization"] = token;
				console.log("Token---------------------\n" + token);

				// check token validity from server
				const { data } = await api.LoadUser();
				if (data) {
					// axios.defaults.headers.common["Authorization"] = data.token;
					dispatch(
						logIn({
							user: data.user,
						})
					);
					console.log("app.js-> loaded");
				} else {
					console.log("app.js-> no user found for load");
				}
			} catch (error) {
				dispatch(logOut());
				console.log(error);
				console.log(error?.response?.data?.message ?? "Message not found !");
				console.log("app.js-> load not possible");
			}
		};

		getData();
		// console.log(document.cookie);
	}, [loading, dispatch]);

	return (
		<BrowserRouter>
			<Toaster />
			<Routes>
				{/* protected route */}
				<Route
					path="/"
					element={
						loading ? (
							<div className="h-screen flex items-center justify-center bg-black">
								<div className="text-2xl tracking-wider text-slate-300 font-black animate-pulse">
									TODO APP LOADING ...
								</div>
							</div>
						) : !user ? (
							<Screens.LoginSignupScreen />
						) : (
							<Screens.MainScreen />
						)
					}
				/>

				<Route path="/about" element={<Screens.AboutScreen />} />

				<Route path="/dummy" element={<Screens.DummyScreen />} />

				<Route
					path="*"
					element={
						<div className="h-screen w-full flex bg-[#A49377] justify-center items-center text-center text-2xl font-semibold">
							<h1>
								404 <br /> Page not found
							</h1>
						</div>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
