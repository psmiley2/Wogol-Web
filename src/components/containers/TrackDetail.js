import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import history from "../../history"
export default React.memo((props) => {
	const [track, setTrack] = useState("");
	const userID = useSelector((state) => state.user.id);
	let id = props.match.params.trackID;
	let renderTasks = <></>;
	let renderCheckpoints = <></>;

	useEffect(() => {
		axios
			.get(`http://localhost:8080/tracks/${id}`)
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
			return (
				<div key={index}>
					<li>
						<h4>{checkpoint.title}</h4>"{checkpoint.description}"
						<ul>{renderTasks(index)}</ul>
					</li>
				</div>
			);
		});
	}

	const handleTrackAdd = async () => {
		await axios
			.post(`http://localhost:8080/tracks/${userID}`, track)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
		await axios
			.post(`http://localhost:8080/tracks/nextCheckpoint/${userID}/${track._id}`)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
		// history.push("/tracks/user");
	};

	return (
		<div>
			<h2>{track.title}</h2>
			<Button color="secondary" variant="outlined" onClick={() => handleTrackAdd()}>
				Add Track
			</Button>
			<p>{track.description}</p>
			<ol>{renderCheckpoints}</ol>
		</div>
	);
});
