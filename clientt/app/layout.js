import { StoreProvider } from "../store/StoreProvider";
import "./globals.css";
import { Roboto } from "next/font/google";

const font = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata = {
	title: "Todo app",
	description: "NextJs Todo App",
};

export default function RootLayout({ children }) {
	return (
		<StoreProvider>
			<html lang="en">
				<body className={font.className + " text-black"}>{children}</body>
			</html>
		</StoreProvider>
	);
}
