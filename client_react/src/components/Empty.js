import React from "react";

export default function Empty() {
	return (
		<div className="ListEmpty bg-[#EDECE7] bg-opacity-60 rounded h-[150px] flex items-center justify-center">
			<p className="text-opacity-80 text-lg">No task today</p>
		</div>
	);
}
