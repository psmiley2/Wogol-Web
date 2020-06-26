import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions";
import history from "../../history";

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		paddingTop: "10%",
		display: "flex",
		justifyContent: "center",
	},
	box: {
		width: "20%",
		padding: "2%",
		borderRadius: "3px",
	},
	button: {
		float: "right",
		marginTop: "5%",
	},
});

const Login = (props) => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		// Ignore warning, the await does have an effect
		await dispatch(login(email, password));
		history.push("/");
	};

	return (
		<Box className={classes.root}>
			<Box border={1} className={classes.box}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<TextField
						autoFocus
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						margin="dense"
						id="email"
						label="Email"
						type="email"
						fullWidth
					/>
					<TextField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						margin="dense"
						id="password"
						label="Password"
						type="password"
						fullWidth
					/>
					<Button
						variant="contained"
						type="submit"
						color="primary"
						className={classes.button}
					>
						Login
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default Login;
