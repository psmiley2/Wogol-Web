import { Box } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function UserTrackDetail(props) {
	const userID = useSelector((state) => state.user.id);
	let trackID = props.match.params.trackID;
	let renderTasks = <></>;
	let renderCheckpoints = <></>;
	const [track, setTrack] = useState(undefined);
	useEffect(() => {
		axios
			.get(`http://localhost:8080/tracks/user/${userID}/${trackID}`)
			.then((res) => {
				setTrack(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	if (track) {
		renderTasks = (checkpointIndex) =>
			track.checkpoints[checkpointIndex].tasks.map((task, index) => {
				return (
					<div key={index}>
						<li>
							{task.title} - {task.description}
						</li>
					</div>
				);
			});

		renderCheckpoints = track.checkpoints.map((checkpoint, index) => {
			if (checkpoint._id == track.currentCheckpoint) {
				return (
					<Box border={1} key={index}>
						<li>
							<h4>{checkpoint.title}</h4>"{checkpoint.description}"
							<ul>{renderTasks(index)}</ul>
						</li>
					</Box>
				);
			} else {
				return (
					<div key={index}>
						<li>
							<h4>{checkpoint.title}</h4>"{checkpoint.description}"
							<ul>{renderTasks(index)}</ul>
						</li>
					</div>
				);
			}
		});
	}

	return <div>{renderCheckpoints}</div>;
}
