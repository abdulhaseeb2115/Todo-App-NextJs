"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import { logOut } from "../store/userSlice";

import * as Icon from "../assets/icons/all";
import * as api from "../requests/userRequests";

export default function Menu({ setToggleDropdown, setToggleMenu, toggleMenu }) {
	const router = useRouter();
	const dispatch = useDispatch();
	return (
		<>
			<div className="relative mt-3 h-8 w-8 mx-5 hover:opacity-50 duration-150">
				<button
					className="MenuBtn absolute top-0 left-0 h-full w-full"
					onClick={() => {
						setToggleDropdown(false);
						setToggleMenu(!toggleMenu);
					}}
				/>
				<Icon.ListIcon />
			</div>

			<div
				className={`Menu z-50 absolute top-full left-0 w-[401px] h-0 overflow-hidden duration-300 
					delay-100 ease-in-out mt-2 mx-auto -ml-0.5
					${toggleMenu === false ? "!h-0" : "!h-[200px]"}
					`}
			>
				<button
					className="w-full h-[60px] bg-[#A59C82] bg-opacity-[98%] rounded-t-lg text-left
					text-white px-5 disabled:text-opacity-50"
					onClick={() => router.push("/about")}
				>
					About
				</button>

				<button
					className="w-full h-[60px] bg-[#A59C82] bg-opacity-[98%] 
					border-y border-[#766B57]
					text-left text-white px-5 disabled:text-opacity-50"
					onClick={() => router.push("/dummy")}
				>
					Dummy Page
				</button>

				<button
					className="w-full h-[60px] bg-[#A59C82] bg-opacity-[98%] rounded-b-lg text-left text-white px-5 disabled:text-opacity-50 shadow-lg"
					onClick={async () => {
						await api.Logout();
						dispatch(logOut());
						localStorage.removeItem("jwtToken");
					}}
				>
					Logout
				</button>
			</div>
		</>
	);
}
