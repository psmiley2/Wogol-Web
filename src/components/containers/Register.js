import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions";
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

const Register = (props) => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(email, password));
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
						className={classes.button}
						variant="contained"
						type="submit"
						color="primary"
					>
						Register
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default Register;
