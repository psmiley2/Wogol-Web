import { Box, Button, Grid, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskInfo from "./TaskInfo";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "50%",
		height: "100%",
		paddingTop: "3%",
		justifyContent: "center",
		margin: "auto",
	},
	list: {
		backgroundColor: "WhiteSmoke",
	},
	currentList: {
		backgroundColor: "Yellow",
	},
	heading: {
		textAlign: "center",
	},
}));

export default React.memo((props) => {
	const classes = useStyles();
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
				return <TaskInfo key={index} task={task} />;
			});

		renderCheckpoints = track.checkpoints.map((checkpoint, index) => {
			return (
				<Box>
					<ListItem key={index} dense>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant="h5">{checkpoint.title}</Typography>
							</Grid>
							<Grid item xs={12}>
								<List className={classes.list}>{renderTasks(index)}</List>
							</Grid>
						</Grid>
					</ListItem>
				</Box>
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
		<Box className={classes.root}>
			<Box className={classes.heading}>
				<Typography variant="h4">{track.title}</Typography>
				<Typography variant="body1">{track.description}</Typography>
				<br />
				<Button color="primary" variant="contained" onClick={() => handleTrackAdd()}>
					Add Track
				</Button>
			</Box>
			<ol>{renderCheckpoints}</ol>
		</Box>
	);
});
