import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as Screens from "./screens/all";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function App() {
	const { loading, user } = useSelector(selectUser);
	console.log(loading, user);
	return (
		<BrowserRouter>
			<Toaster />
			<Routes>
				<Route path="/" element={<Screens.LoginSignupScreen />} />

				{/* protected route */}
				{!user && <Route path="/todo" element={<Screens.MainScreen />} />}

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
