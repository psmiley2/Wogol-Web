import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Task({ track, checkpoint, task, rerenderTasks }) {
	const userID = useSelector((state) => state.user.id);
	const taskID = task._id;
	const checkpointID = checkpoint._id;
	const trackID = track._id;
	const [checked, setChecked] = useState(task.completed);

	let changed = true;

	const sendUpdate = (update) => {
		return new Promise(async (resolve, reject) => {
			await axios
				.post(
					`http://localhost:8080/tracks/user/${userID}/${trackID}/${checkpointID}/${taskID}`,
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
			.get(`http://localhost:8080/tracks/user/${userID}/${trackID}`)
			.catch((err) => console.error(err));

		let track = response.data;
		console.log("track", track);

		let checkpointCompleted = true;
		for (checkpoint of track.checkpoints) {
			if (checkpoint._id == checkpointID) {
				for (task of checkpoint.tasks) {
					if (task.completed == false) {
						checkpointCompleted = false;
						break;
					}
				}
			}
		}

		if (checkpointCompleted) {
			await axios
				.post(`http://localhost:8080/tracks/nextCheckpoint/${userID}/${trackID}`)
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
		changed = true;
	};

	return (
		<Box display="flex">
			<Checkbox
				checked={checked}
				onChange={handleCheck}
				inputProps={{ "aria-label": "primary checkbox" }}
			/>
			{task.title}
		</Box>
	);
}
