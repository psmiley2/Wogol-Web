import { Button, List } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoggedOutDashboard from "./LoggedOutDashboard";
import Task from "./Task";

export default function Dashboard() {
	let renderTracks = <></>;
	let renderTasks = <></>;
	const userID = useSelector((state) => state.user.id);
	const [userTracks, setUserTracks] = useState(undefined);
	const [update, setUpdate] = useState(0);

	const rerenderTasks = () => {
		setUpdate(update + 1);
	};

	useEffect(() => {
		if (userID) {
			axios
				.get(`http://localhost:8080/tracks/user/${userID}`)
				.then((res) => {
					setUserTracks(res.data);
				})
				.catch((err) => console.error(err));
		}
	}, [update]);

	if (userTracks) {
		if (userTracks === []) {
			return <div>Sign up for a track</div>;
		} else {
			renderTasks = (track) => {
				let checkpoint;
				for (checkpoint of track.checkpoints) {
					return track.checkpoints.map((checkpoint, index) => {
						if (checkpoint._id === track.currentCheckpoint) {
							return checkpoint.tasks.map((task, index) => {
								return (
									<li key={index}>
										<Task
											track={track}
											checkpoint={checkpoint}
											task={task}
											rerenderTasks={rerenderTasks}
										/>
									</li>
								);
							});
						}
					});
				}
			};
			renderTracks = userTracks.map((track, index) => {
				let link = `/tracks/user/${track._id}`;
				return (
					<div key={index}>
						<Link to={link} key={index}>
							<Button>{track.title}</Button>
						</Link>
						<List>{renderTasks(track)}</List>
					</div>
				);
			});
		}
	}

	if (userID) {
		return (
			<div>
				Current Tasks:
				{renderTracks}
			</div>
		);
	} else {
		return <LoggedOutDashboard />;
	}
}
