import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
export default function TrackAddDetails({
	title,
	setTitle,
	description,
	setDescription,
	handleSubmit,
	renderCheckpoints,
}) {
	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)}>
				<TextField
					autoFocus
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					margin="dense"
					id="title"
					label="Title"
					type="text"
					fullWidth
				/>
				<TextField
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					margin="dense"
					id="description"
					label="Description"
					type="text"
					fullWidth
				/>
				<h4>Checkpoints:</h4>
				<ol>{renderCheckpoints}</ol>

				<Button type="submit" color="primary">
					Create Track
				</Button>
			</form>
		</>
	);
}
