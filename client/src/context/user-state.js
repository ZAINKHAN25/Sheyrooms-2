import React, { createContext, useReducer } from "react";
import userReducer, { initialState } from "./userReducer";

const Context = createContext();

Context.displayName = "UserContext";

function UserProvider(props) {
	const [state, dispatch] = useReducer(userReducer, initialState);

	const registerUserRequest = () => {
		dispatch({ type: "REGISTER_USER_REQUEST" });
	};

	const loginUserRequest = () => {
		dispatch({ type: "LOGIN_USER_REQUEST" });
	};

	const registerUserSuccess = (user) => {
		dispatch({ type: "REGISTER_USER_SUCCESS", payload: user });
	};

	const loginSuccess = (user) => {
		dispatch({ type: "LOGIN_SUCCESS", payload: user });
	};

	const logoutSuccess = () => {
		dispatch({ type: "LOGOUT_SUCCESS" });
	};

	const registerUserFail = (error) => {
		dispatch({ type: "REGISTER_USER_FAIL", payload: error });
	};

	const loginFail = (error) => {
		dispatch({ type: "LOGIN_FAIL", payload: error });
	};

	const logoutFail = (error) => {
		dispatch({ type: "LOGOUT_FAIL", payload: error });
	};

	const clearErrors = () => {
		dispatch({ type: "CLEAR_ERRORS" });
	};

	const value = React.useMemo(
		() => ({
			...state,
			registerUserRequest,
			loginUserRequest,
			registerUserSuccess,
			loginSuccess,
			logoutSuccess,
			registerUserFail,
			loginFail,
			logoutFail,
			clearErrors
		}),
		[state]
	);

	return <Context.Provider value={value} {...props} />;
}

export const useUser = () => {
	const context = React.useContext(Context);
	if (context === undefined) {
		throw new Error(`useUser must be used within a UserProvider`);
	}
	return context;
};

export default UserProvider;
