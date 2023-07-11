"use client";

import { useEffect, useState } from "react";
import * as Icon from "../assets/icons/all";
import * as api from "../requests/todoRequests";

export default function Card({
	id,
	name,
	status,
	completedDate,
	createdAt,
	first,
	last,
	refresh,
}) {
	const [completed, setCompleted] = useState(completedDate); // completed status
	const [isChecked, setIsChecked] = useState(false); // checkbox status
	const [toggleSubMenu, setToggleSubMenu] = useState(false); // toggle menu
	const [finalDate, setFinalDate] = useState(""); // final date

	//
	//

	// handle task status update
	async function handleUpdate(id, updatedStatus) {
		setIsChecked(updatedStatus);
		try {
			const { data } = await api.updateItem(id, { status: updatedStatus }); // update request
			if (data?.success === true) {
				setCompleted(data?.item?.completionTime);
			}
			console.log(data);
		} catch (error) {
			console.log(error);
			alert("Checkbox error occured !");
		}
	}

	// handle task delete
	async function handleDelete() {
		setToggleSubMenu(false);
		try {
			const { data } = await api.deleteItem(id); // delete request
			if (data?.success === true) {
				refresh(); // refresh full data
			}
			console.log(data);
		} catch (error) {
			console.log(error);
			alert("Delete error occured !");
		}
	}

	// update checked
	useEffect(() => {
		function updateChecked() {
			setIsChecked(status);
		}

		updateChecked();
	}, [status]);

	return (
		<div
			className={`Card relative h-[50px] w-full flex items-center bg-[#EDECE7] bg-opacity-95 pl-6 pr-3 border-y border-[#CBCAC6] 
			${first === true && "rounded-t-lg !border-t-0 !h-[60px]"} 
			${last === true && "rounded-b-lg !border-b-0 !h-[60px]"}
			`}
		>
			{/* custom checkbox */}
			<button
				className={`Checkbox`}
				onClick={() => handleUpdate(id, !isChecked)}
			>
				<Icon.CheckCircleIcon
					stroke={"#867963"}
					strokeOpacity={0.8}
					strokeWidth={1.5}
					fill={isChecked === true ? "#A49377" : "transparent"}
					fillOpacity={0.6}
				/>
			</button>

			{/* text */}
			<p className="ml-5 font-semibold text-gray-700">{name}</p>

			{/* menu btn */}
			<button
				className="ml-auto -mb-1 px-3 hover:opacity-80 duration-150 ease-in-out"
				onClick={() => setToggleSubMenu(!toggleSubMenu)}
			>
				<Icon.DotIcon />
			</button>

			{/* menu */}
			<div
				className={`absolute z-30 w-0 h-0 overflow-hidden 
				top-full left-0 mt-0.5 
				flex flex-col 
				bg-[#f3f2ef] shadow
				duration-300 delay-100 ease-in-out
				${toggleSubMenu === false ? "!h-0 !w-0" : "!h-[120px] !w-[100%] !p-5"}
				`}
			>
				{/* completed on */}
				<div>
					{/* completed */}
					<span className="text-sm font-bold">Completed: </span>
					<span className="text-sm">
						{isChecked === true
							? new Date(completed).toLocaleTimeString([], {
									day: "2-digit",
									month: "2-digit",
									year: "numeric",
									hour: "numeric",
									minute: "numeric",
									hour12: true,
							  })
							: "Not completed"}
					</span>
				</div>

				{/* created on */}
				<div>
					<span className="text-sm font-bold">Created At: </span>
					<span className="text-sm">
						{new Date(createdAt).toLocaleTimeString([], {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
							hour: "numeric",
							minute: "numeric",
							hour12: true,
						})}
					</span>
				</div>

				{/* delete */}
				<button
					className="bg-red-200 text-red-400 p-1 mt-2 rounded-md 
					duration-300 ease-in-out
					hover:opacity-60"
					onClick={() => handleDelete()}
				>
					Delete
				</button>
			</div>
		</div>
	);
}
