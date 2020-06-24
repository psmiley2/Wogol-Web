import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { LOGIN, LOGOUT, REGISTER, SET_USER_ID } from "./types";

export const login = (email, password) => async (dispatch) => {
	let body = {
		email: email,
		password: password,
	};
    let response;
	await axios
		.post("http://localhost:8080/users/login", body, {
			withCredentials: true,
		})
		.then((res) => {
			response = res;
			reactLocalStorage.set("WOGOL_userID", res.data._id);
		})
		.catch((err) => {
			console.error(err);
		});

	dispatch({ type: LOGIN, payload: response.data });
};

export const logout = () => async (dispatch) => {
    console.log("hit logout")
	await axios
    .post("http://localhost:8080/users/logout", {
        withCredentials: true,
    })
    .then((res) => {
        console.log("res: ", res)
			reactLocalStorage.set("WOGOL_userID", "");
		})
		.catch((err) => {
			console.error(err);
		});

	dispatch({ type: LOGOUT });
};

export const register = (email, password) => async (dispatch) => {
	let body = {
		email: email,
		password: password,
	};
	let response;
	await axios
		.post("http://localhost:8080/users/register", body)
		.then((res) => {
			response = res;
			reactLocalStorage.set("WOGOL_userID", res.data._id);
		})
		.catch((err) => {
			console.error(err);
        });
        
    if (!response) {
        return
    }

	dispatch({ type: REGISTER, payload: response.data });
};

export const setSession = () => async (dispatch) => {
    let userID = reactLocalStorage.get("WOGOL_userID");

	dispatch({ type: SET_USER_ID, payload: userID });
};
