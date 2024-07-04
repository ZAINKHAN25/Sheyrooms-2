import { useEffect, useReducer } from "react";
import userReducer, { initialState } from "../context/userReducer";
import { onAuthStateChanged } from "../utils";

export default function useAuth() {
	const [{ user, isAuthenticated }, dispatch] = useReducer(userReducer, initialState);

	useEffect(() => {
		onAuthStateChanged((auth) => {
			if (auth) {
				dispatch({
					type: "LOGIN_SUCCESS",
					payload: auth
				});
			} else {
				dispatch({
					type: "LOGOUT_SUCCESS",
					payload: null
				});
			}
		});
	}, []);

	return {
		isAuthenticated,
		user
	};
}
