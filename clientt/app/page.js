"use client";

import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, selectUser } from "../store/userSlice";
import * as api from "../requests/userRequests";

import LoginPage from "./login/page";
import MainPage from "./main/page";

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
				// console.log(data);
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
		<>
			<Toaster />
			{loading ? (
				<div className="h-screen flex items-center justify-center bg-black">
					<div className="text-2xl tracking-wider text-slate-300 font-black animate-pulse">
						TODO APP LOADING ...
					</div>
				</div>
			) : user ? (
				<MainPage />
			) : (
				<LoginPage />
			)}
		</>
	);
}

export default App;
