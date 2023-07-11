"use client";

import React from "react";
import Image from "next/image";
import person from "../assets/person.jpg";

export default function Imagez() {
	return (
		<div className="User h-32 aspect-square rounded-full border-[4px] border-[#cabfb9] shadow-xl mx-auto overflow-hidden mt-16">
			<Image
				src={person}
				alt="person_image"
				className="w-full"
				loading="lazy"
			/>
		</div>
	);
}
