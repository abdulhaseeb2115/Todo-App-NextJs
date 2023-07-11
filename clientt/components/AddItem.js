"use client";

import React, { useState } from "react";
import * as api from "../requests/todoRequests";
import * as Icon from "../assets/icons/all";
import { toast } from "react-hot-toast";

export default function AddItem({ refreshData }) {
	const [name, setName] = useState("");

	// add item
	async function handleItemAdd() {
		if (name === "" || name?.trim() === "") {
			toast.error("Invalid item name !");
			return;
		}

		try {
			const { data } = await api.addNewItem({ todo: name?.trim() }); // data request
			if (data?.success === true) {
				refreshData();
				setName("");
				console.log(data);
				toast.success("New Task Added !");
			} else {
				console.log(data);
				toast.error("An error occured !");
			}
		} catch (error) {
			console.log(error);
			console.log(error?.response?.data?.message ?? "Message not found !");
			toast.error("An error occured !");
		}
	}

	return (
		<div className="relative w-[400px] bg-white mt-5 rounded-lg mx-auto overflow-hidden">
			{/* form */}
			<form
				action="#"
				onSubmit={(e) => {
					e.preventDefault();
					handleItemAdd();
				}}
				className="flex justify-between"
			>
				{/* input */}
				<input
					type="text"
					value={name}
					placeholder="Add new task"
					onChange={(e) => setName(e.target.value)}
					className="h-12 flex-1 px-4 mr-2 py-1  focus:outline-none placeholder:text-gray-300"
				/>

				{/* btn */}
				<div
					className={`relative bg-[#A59C82] p-1 m-2 h-8 w-8 rounded-md ${
						(name === "" || name?.trim() === "") && "opacity-70"
					}`}
				>
					<button
						type="submit"
						className="absolute top-0 left-0 h-full w-full text-white text-sm hover:opacity-70 disabled:opacity-70 aspect-square"
						disabled={name === "" || name?.trim() === ""}
					></button>
					<Icon.PlusIcon />
				</div>
			</form>
		</div>
	);
}
