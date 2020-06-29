import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BASE_SERVER_URL } from "../../enviroment";
import history from "../../history";
import TrackAddCheckpoint from "./TrackAddCheckpoint";
import TrackAddDetails from "./TrackAddDetails";
import TrackAddTask from "./TrackAddTask";

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		paddingTop: "10%",
		margin: "auto",
		display: "flex",
		justifyContent: "center",
	},
	box: {
		width: "20%",
		padding: "2%",
		borderRadius: "3px",
	},
});

export default function TrackAddForm(props) {
	const classes = useStyles();
	const userID = useSelector((state) => state.user.id);

	if (!userID) {
		history.push("/login");
	}

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
			.post(`${REACT_APP_BASE_SERVER_URL}tracks`, {
				title,
				description,
				author: props.userId,
				checkpoints,
			})
			.then((res) => {
				// console.log(res);
			})
			.catch((err) => console.error(err));

		history.push("/tracks");
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
		<div className={classes.root}>
			<Box className={classes.box}>
				<Typography variant="h5">Create a Track</Typography>
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
			</Box>
		</div>
	);
}
