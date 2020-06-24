import axios from "axios";
import React, { useState } from "react";
import TrackAddCheckpoint from "./TrackAddCheckpoint";
import TrackAddDetails from "./TrackAddDetails";
import TrackAddTask from "./TrackAddTask";

export default function TrackAddForm(props) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [checkpoints, setCheckpoints] = useState([]);
	const [newCheckpointTitle, setNewCheckpointTitle] = useState("");
	const [newCheckpointDescription, setNewCheckpointDescription] = useState("");
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [newTaskDescription, setNewTaskDescription] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post("http://localhost:8080/tracks", {
				title,
				description,
				author: props.userId,
				checkpoints,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));

		setTitle("");
		setDescription("");
	};

	const handleAddCheckpoint = () => {
		let joined = checkpoints.concat({
			title: newCheckpointTitle,
			description: newCheckpointDescription,
			tasks: [],
			completed: false,
			current: false,
		});

		setCheckpoints(joined);
		setNewCheckpointTitle("");
		setNewCheckpointDescription("");
	};

	const handleAddTask = (index) => {
		let newCheckpoints = checkpoints;
		console.log(checkpoints);
		newCheckpoints[index].tasks = checkpoints[index].tasks.concat({
			title: newTaskTitle,
			description: newTaskDescription,
		});
		setCheckpoints(newCheckpoints);
		setNewTaskTitle("");
		setNewTaskDescription("");
	};

	const renderTasks = (index) =>
		checkpoints[index].tasks.map((task, index) => {
			return (
				<div key={index}>
					<li>
						{task.title} - {task.description}
					</li>
				</div>
			);
		});

	const renderCheckpoints = checkpoints.map((checkpoint, index) => {
		return (
			<div key={index}>
				<li>
					<h4>{checkpoint.title}</h4>"{checkpoint.description}"
					<TrackAddTask
						checkpointIndex={index}
						newTaskTitle={newTaskTitle}
						setNewTaskTitle={setNewTaskTitle}
						newTaskDescription={newTaskDescription}
						setNewTaskDescription={setNewTaskDescription}
						handleAddTask={handleAddTask}
					/>
					<ul>{renderTasks(index)}</ul>
				</li>
			</div>
		);
	});

	return (
		<div>
			<TrackAddDetails
				title={title}
				setTitle={setTitle}
				description={description}
				setDescription={setDescription}
				handleSubmit={handleSubmit}
				renderCheckpoints={renderCheckpoints}
			/>

			<TrackAddCheckpoint
				newCheckpointTitle={newCheckpointTitle}
				setNewCheckpointTitle={setNewCheckpointTitle}
				newCheckpointDescription={newCheckpointDescription}
				setNewCheckpointDescription={setNewCheckpointDescription}
				handleAddCheckpoint={handleAddCheckpoint}
			/>
		</div>
	);
}