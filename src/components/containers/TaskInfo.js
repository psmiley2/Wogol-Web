import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";

export default function TaskInfo({ task }) {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<ListItem dense button onClick={handleClickOpen}>
				<ListItemText primary={task.title} />
			</ListItem>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{task.title}</DialogTitle>
				<DialogContent>{task.description}</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
