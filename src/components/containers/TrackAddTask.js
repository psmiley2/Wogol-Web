import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

export default function TrackAddTask({
	checkpointIndex,
	newTaskTitle,
	setNewTaskTitle,
	newTaskDescription,
	setNewTaskDescription,
	handleAddTask,
}) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setNewTaskDescription("");
		setNewTaskTitle("");
		setOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClickOpen} color="secondary">
				Add A Task
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add A Task</DialogTitle>
				<DialogContent>
					<TextField
						value={newTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
						margin="dense"
						id="task-title"
						label="New Task Title"
						type="text"
						fullWidth
					/>
					<TextField
						value={newTaskDescription}
						onChange={(e) => setNewTaskDescription(e.target.value)}
						margin="dense"
						id="task-description"
						label="New Task Description"
						type="text"
						fullWidth
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => {
							handleAddTask(checkpointIndex);
							handleClose();
						}}
						color="secondary"
					>
						Add Task
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
