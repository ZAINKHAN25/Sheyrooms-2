/* eslint-disable react-hooks/exhaustive-deps */
import localforage from "localforage";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { useUser } from "../context/user-state";

export default function Navbar() {
	const navigate = useNavigate();
	const { isAuthenticated, user, logoutSuccess } = useUser();
	const [show, setShow] = useState(false);
	const [isLogout, setIsLogout] = useState(false);

	const handleLogout = () => {
		setIsLogout(true);
	};

	const handleShow = (e) => {
		setShow((prev) => !prev);
	};

	useEffect(() => {
		return (async () => {
			if (isLogout) {
				await localforage.removeItem("auth").then(() => {
					navigate("/");
					logoutSuccess();
					setIsLogout(false);
					setShow(false);
				});
			}
		})();
	}, [isLogout]);

	const authItems = (
		<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
			<li className="nav-item">
				<button
					className="btn btn-link nav-link"
					aria-current="page"
					onClick={() => navigate("/register")}>
					Register
				</button>
			</li>
			<li className="nav-item">
				<button className="btn btn-link nav-link" onClick={() => navigate("/login")}>
					Login
				</button>
			</li>
		</ul>
	);

	const userItem = (
		<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
			<div className={show ? "dropdown show" : "dropdown"}>
				<button
					className="btn btn-secondary dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded={show ? "true" : "false"}
					onClick={handleShow}>
					{user ? user.name : "Admin"}
				</button>
				<div
					className={show ? "dropdown-menu show" : "dropdown-menu"}
					aria-labelledby="dropdownMenuButton">
					<Link className="dropdown-item" to="/dashboard">
						Dashboard
					</Link>
					<Button className="btn btn-link dropdown-item" onClick={handleLogout}>
						Logout
					</Button>
				</div>
			</div>
		</ul>
	);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					Navbar
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					{!isAuthenticated ? authItems : userItem}
				</div>
			</div>
		</nav>
	);
}
