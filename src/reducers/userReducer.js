import { LOGIN, LOGOUT, REGISTER, SET_USER_ID } from "../actions/types";
let initialState = {
	id: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				id: action.payload._id,
			};
		case LOGOUT:
			return { id: "" };
		case REGISTER:
			return {
				...state,
				id: action.payload._id,
			};
		case SET_USER_ID:
			return {
				...state,
				id: action.payload,
			};
		default:
			return state;
	}
};
