import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	ListItemSecondaryAction,
	ListItemText,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { Message } from "@material-ui/icons";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BASE_SERVER_URL } from "../../enviroment";

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

export default function Task({ track, checkpoint, task, rerenderTasks }) {
	const classes = useStyles();

	const userID = useSelector((state) => state.user.id);
	const taskID = task._id;
	const checkpointID = checkpoint._id;
	const trackID = track._id;
	const [checked, setChecked] = useState(task.completed);

	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const sendUpdate = (update) => {
		return new Promise(async (resolve, reject) => {
			await axios
				.post(
					`${REACT_APP_BASE_SERVER_URL}tracks/user/${userID}/${trackID}/${checkpointID}/${taskID}`,
					update
				)
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					console.error(err);
					reject(err);
				});
		});
	};

	const checkCheckpointCompleted = async () => {
		let response = await axios
			.get(`${REACT_APP_BASE_SERVER_URL}tracks/user/${userID}/${trackID}`)
			.catch((err) => console.error(err));

		let track = response.data;
		console.log("track", track);

		let checkpointCompleted = true;
		for (checkpoint of track.checkpoints) {
			if (checkpoint._id === checkpointID) {
				for (task of checkpoint.tasks) {
					if (task.completed === false) {
						checkpointCompleted = false;
						break;
					}
				}
			}
		}

		if (checkpointCompleted) {
			await axios
				.post(`${REACT_APP_BASE_SERVER_URL}${userID}/${trackID}`)
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.error(err));

			rerenderTasks();
		}
	};

	const handleCheck = async (event) => {
		let update = {
			...task,
			completed: event.target.checked,
		};
		setChecked(event.target.checked);
		await sendUpdate(update);
		checkCheckpointCompleted();
	};

	return (
		<>
			<Box className={classes.root} display="flex">
				<Checkbox
					checked={checked}
					onChange={handleCheck}
					inputProps={{ "aria-label": "primary checkbox" }}
				/>
				<ListItemText primary={task.title} />
				<ListItemSecondaryAction edge="end">
					<IconButton className={classes.moreInfoIcon} onClick={handleClickOpen}>
						<Message />
					</IconButton>
				</ListItemSecondaryAction>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{task.title}</DialogTitle>
				<DialogContent>{task.description}</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
