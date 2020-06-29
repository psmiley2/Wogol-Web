import { Box, Grid, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BASE_SERVER_URL } from "../../enviroment";
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
}));

export default function UserTrackDetail(props) {
	const classes = useStyles();

	const userID = useSelector((state) => state.user.id);
	let trackID = props.match.params.trackID;
	let renderTasks = <></>;
	let renderCheckpoints = <></>;
	const [track, setTrack] = useState(undefined);
	useEffect(() => {
		axios
			.get(`${REACT_APP_BASE_SERVER_URL}tracks/user/${userID}/${trackID}`)
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
			if (checkpoint._id === track.currentCheckpoint) {
				return (
					<ListItem dense key={index} className={classes.currentList}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography variant="h5">{checkpoint.title}</Typography>
								<Typography>(Current)</Typography>
							</Grid>
							<Grid item xs={12}>
								<List className={classes.list}>{renderTasks(index)}</List>
							</Grid>
						</Grid>
					</ListItem>
				);
			} else {
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
			}
		});
	}

	return (
		<div className={classes.root}>
			{track ? <Typography variant="h4">{track.title}</Typography> : null}
			<List>{renderCheckpoints}</List>
		</div>
	);
}
