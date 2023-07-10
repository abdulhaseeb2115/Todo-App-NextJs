import React from "react";
import { useNavigate } from "react-router-dom";
import * as Icon from "../assets/icons/all";
import * as api from "../api/userRequests";
import { useDispatch } from "react-redux";
import { logOut } from "../features/userSlice";

export default function Menu({ setToggleDropdown, setToggleMenu, toggleMenu }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	return (
		<>
			<button
				className="MenuBtn px-5 -mb-0.5 hover:opacity-50 duration-150 h-full"
				onClick={() => {
					setToggleDropdown(false);
					setToggleMenu(!toggleMenu);
				}}
			>
				<Icon.ListIcon />
			</button>

			<div
				className={`Menu z-50 absolute top-full left-0 w-[401px] h-0 overflow-hidden duration-300 
					delay-100 ease-in-out mt-2 mx-auto -ml-0.5
					${toggleMenu === false ? "!h-0" : "!h-[200px]"}
					`}
			>
				<button
					className="w-full h-[60px] bg-[#A59C82] bg-opacity-[98%] rounded-t-lg text-left
					text-white px-5 disabled:text-opacity-50"
					onClick={() => navigate("/about")}
				>
					About
				</button>

				<button
					className="w-full h-[60px] bg-[#A59C82] bg-opacity-[98%] 
					border-y border-[#766B57]
					text-left text-white px-5 disabled:text-opacity-50"
					onClick={() => navigate("/dummy")}
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
