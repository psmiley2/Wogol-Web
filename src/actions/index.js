import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { REACT_APP_BASE_SERVER_URL } from "../enviroment";
import { LOGIN, LOGOUT, REGISTER, SET_USER_ID } from "./types";

export const login = (email, password) => async (dispatch) => {
	return new Promise(async (resolve, reject) => {
		let body = {
			email: email,
			password: password,
		};
		let response;
		await axios
			.post(`${REACT_APP_BASE_SERVER_URL}users/login`, body, {
				withCredentials: true,
			})
			.then((res) => {
				response = res;
				reactLocalStorage.set("WOGOL_userID", res.data._id);
			})
			.catch((err) => {
				reject(err);
				console.error(err);
			});

		dispatch({ type: LOGIN, payload: response.data });
		resolve();
	});
};

export const logout = () => async (dispatch) => {
	return new Promise(async (resolve, reject) => {
		await axios
			.post(`${REACT_APP_BASE_SERVER_URL}users/logout`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log("res: ", res);
				reactLocalStorage.set("WOGOL_userID", "");
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});

		dispatch({ type: LOGOUT });
		resolve();
	});
};

export const register = (email, password) => async (dispatch) => {
	let body = {
		email: email,
		password: password,
	};
	let response;
	await axios
		.post(`${REACT_APP_BASE_SERVER_URL}users/register`, body)
		.then((res) => {
			response = res;
			reactLocalStorage.set("WOGOL_userID", res.data._id);
		})
		.catch((err) => {
			console.error(err);
		});

	if (!response) {
		return;
	}

	dispatch({ type: REGISTER, payload: response.data });
};

export const setSession = () => async (dispatch) => {
	let userID = reactLocalStorage.get("WOGOL_userID");

	dispatch({ type: SET_USER_ID, payload: userID });
};
