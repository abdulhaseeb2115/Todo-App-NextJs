"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

import * as api from "../../requests/todoRequests";
import * as Components from "../../components/all";

export default function MainScreen() {
	const { loading, user } = useSelector(selectUser);
	const [isLoading, setIsLoading] = useState(true); // loading

	const [listType, setListType] = useState(0); // change list type
	const [toggleDropdown, setToggleDropdown] = useState(false); // toggle dropdown
	const [toggleMenu, setToggleMenu] = useState(false); // toggle menu

	const [itemsList, setItemsList] = useState([]); // todo items list
	const [filteredList, setFilteredList] = useState([]); // filtered list

	// filter items
	const handleItemFilter = (type, array) => {
		// yesterday date
		var yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		yesterday = yesterday.toISOString().split("T")[0];

		var filteredItems = array.filter((item) => {
			// items creation date
			var itemDate = new Date(item.createdAt);
			itemDate = itemDate.toISOString().split("T")[0];

			if (itemDate > yesterday && type === 0) {
				return true; // today
			} else if (itemDate === yesterday && type === 1) {
				return true; // yesterday
			} else if (itemDate < yesterday && type === 2) {
				return true; // past
			}
		});

		setFilteredList(filteredItems);
	};

	// refresh data
	async function refreshData() {
		setIsLoading(true);

		// remove all items once
		setItemsList([]);
		handleItemFilter(listType, []);

		try {
			const { data } = await api.getCompleteList(); // data request

			if (data?.success === true) {
				setItemsList(data?.items); // set full list
				handleItemFilter(listType, data?.items); // set filtered list

				console.log(data);
			} else {
				console.log(data);
				toast.error("An error occured !");
			}

			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		} catch (error) {
			console.log(error);
			toast.error("An error occured !");

			setTimeout(() => {
				setIsLoading(false);
			}, 1000);
		}
	}

	// fetch data
	useEffect(() => {
		async function fetchData() {
			try {
				const token = localStorage.getItem("jwtToken");
				if (!token) {
					console.log("mainsc.js-> jwt token error");
					return;
				}
				console.log(token);

				setIsLoading(true);
				const { data } = await api.getCompleteList(); // data request

				if (data && data?.success === true) {
					setItemsList(data?.items); // set full list
					setListType(0); // set list initially
					handleItemFilter(0, data?.items); // set filtered list

					console.log(data);
				} else {
					console.log(data);
					toast.error("Server Error");
				}

				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			} catch (error) {
				console.log(error);
				console.log(error?.response?.data?.message ?? "Message not found !");
				toast.error("Server Error");

				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="MainScreen h-screen w-full overflow-y-scroll relative p-2">
			{!loading && user && <p>Logged in as {user?.user?.name}</p>}
			<Components.Image />

			<Components.AddItem refreshData={refreshData} />

			<div className="Button relative w-[400px] h-[55px] bg-[#A49377] bg-opacity-90 mt-8 rounded-lg border border-slate-300 flex mx-auto">
				<Components.Menu
					setToggleDropdown={setToggleDropdown}
					setToggleMenu={setToggleMenu}
					toggleMenu={toggleMenu}
					refreshData={refreshData}
				/>

				<Components.Dropdown
					setToggleMenu={setToggleMenu}
					setToggleDropdown={setToggleDropdown}
					toggleDropdown={toggleDropdown}
					setListType={setListType}
					handleItemFilter={handleItemFilter}
					itemsList={itemsList}
					listType={listType}
				/>
			</div>

			<Components.TodoList
				filteredList={filteredList}
				refreshData={refreshData}
				isLoading={isLoading}
			/>
		</div>
	);
}
