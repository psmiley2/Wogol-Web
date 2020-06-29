let REACT_APP_BASE_SERVER_URL = "http://localhost:8080/";

if (process.env.NODE_ENV === "production") {
	REACT_APP_BASE_SERVER_URL = "https://wogol.herokuapp.com/";
}

export { REACT_APP_BASE_SERVER_URL };
