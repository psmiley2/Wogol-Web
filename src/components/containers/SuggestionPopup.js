import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BASE_SERVER_URL } from "../../enviroment";
import history from "../../history";

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
	moreInfoIcon: {},
	listItem: {
		width: "100%",
		backgroundColor: "blue",
	},
});

export default function SuggestionPopup() {
	const classes = useStyles();
	const userID = useSelector((state) => state.user.id);
	const [open, setOpen] = useState(false);
	const [suggestion, setSuggestion] = useState("");

	const handleClickOpen = () => {
		if (!userID) {
			history.push("/login");
		}
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios
			.post(`${REACT_APP_BASE_SERVER_URL}tracks/suggestion`, { suggestion: suggestion })
			.catch((err) => console.error(err));
		handleClose();
	};
	return (
		<div>
			<Button onClick={handleClickOpen} fullWidth variant="outlined" color="primary">
				Suggest A Track
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Suggest a New Track</DialogTitle>
				<DialogActions>
					<form onSubmit={(e) => handleSubmit(e)}>
						<TextField
							value={suggestion}
							autoFocus
							onChange={(e) => setSuggestion(e.target.value)}
						/>
						<Button type="submit">Submit Request</Button>
					</form>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
