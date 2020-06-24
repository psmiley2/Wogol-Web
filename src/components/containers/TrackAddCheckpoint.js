import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

export default function TrackAddCheckpoint({
	newCheckpointTitle,
	setNewCheckpointTitle,
	newCheckpointDescription,
	setNewCheckpointDescription,
	handleAddCheckpoint,
}) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button onClick={handleClickOpen} color="secondary">
				Add A Checkpoint
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add A Checkpoint</DialogTitle>
				<DialogContent>
					<TextField
						value={newCheckpointTitle}
						onChange={(e) => setNewCheckpointTitle(e.target.value)}
						margin="dense"
						id="checkpoint-title"
						label="New Checkpoint Title"
						type="text"
						fullWidth
					/>
					<TextField
						value={newCheckpointDescription}
						onChange={(e) =>
							setNewCheckpointDescription(e.target.value)
						}
						margin="dense"
						id="checkpoint-description"
						label="New Checkpoint Description"
						type="text"
						fullWidth
					/>

					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={() => {
								handleAddCheckpoint();
								handleClose();
							}}
							color="secondary"
						>
							Add Checkpoint
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</div>
	);
}
