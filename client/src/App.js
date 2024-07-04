/* eslint-disable import/no-anonymous-default-export */
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserProvider, { useUser } from "./context/user-state";
import { useEffect } from "react";
import localforage from "localforage";

function App() {
	const { loginSuccess, logoutSuccess, isAuthenticated } = useUser();

	useEffect(() => {
		(async () => {
			try {
				const auth = await localforage.getItem("auth");
				if (auth) {
					console.log(auth);
					loginSuccess(auth);
				} else {
					logoutSuccess();
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [isAuthenticated]);
	return (
		<>
			<div>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/booking/:id/:fromDate/:toDate" element={<Booking />} exact />
						<Route path="/register" element={<Signup />} exact />
						<Route path="/login" element={<Login />} exact />
					</Routes>
				</BrowserRouter>
			</div>
		</>
	);
}

export default () => {
	return (
		<UserProvider>
			<App />
		</UserProvider>
	);
};
