import axios from "axios";
import localforage from "localforage";

export function login(email, password) {
	return auth().signUp(email, password);
}

export function onAuthStateChanged(callback) {
	return auth().onAuthStateChanged(callback);
}

export function signUp(name, email, password) {
	return auth().signUp(name, email, password);
}

const noop = () => { };
let onAuthChangeHandler = noop;

function auth() {
	function onAuthStateChanged(handler) {
		onAuthChangeHandler = handler;
		localforage.getItem("auth").then((auth) => {
			if (auth) {
				handler(auth);
			} else {
				handler(null);
				localforage.removeItem(auth);
			}
		});
		return () => (onAuthChangeHandler = noop);
	}

	async function login(email, password) {
		try {
			const auth = await axios.post(`http://localhost:4000/api/login`, {
				email,
				password
			});
			await localforage.setItem("auth", auth);
			onAuthChangeHandler(auth);
		} catch (error) {
			console.log(error);
		}
	}

	async function signUp(name, email, password, cpassword) {
		try {
			const auth = await axios.post(`http://localhost:4000/api/register`, {
				name,
				email,
				password,
				cpassword
			});

			await localforage.setItem("auth", auth);
			onAuthChangeHandler(auth);
		} catch (err) {
			console.log(err.response.error.message);
		}
	}

	return {
		signUp,
		onAuthStateChanged,
		login
	};
}
