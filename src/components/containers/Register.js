import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../actions";
const Register = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(register(email, password))
	};

	return (
		<div>
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
				<Button type="submit" color="primary">
					Register
				</Button>
			</form>
		</div>
	);
};

export default Register;
