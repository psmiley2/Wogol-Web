import { Box, Button, Grid, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoggedOutDashboard from "./LoggedOutDashboard";
import Task from "./Task";

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		paddingTop: "10%",
		textAlign: "center",
	},
	tasks: {
		backgroundColor: "WhiteSmoke",
	},
	title: {
		textAlign: "center",
		margin: "auto",
	},
	noTracks: {
		textAlign: "center",
		margin: "auto",
	},
});

export default function Dashboard() {
	const classes = useStyles();
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
		if (userTracks.length === 0) {
			renderTracks = (
				<Box className={classes.noTracks}>
					<Typography variant="body1">You currently have no tasks.</Typography>
					<Link to="/tracks">
						<Button variant="contained" color="primary">
							Find a New Track
						</Button>
					</Link>
				</Box>
			);
		} else {
			renderTasks = (track) => {
				let checkpoint;
				for (checkpoint of track.checkpoints) {
					return track.checkpoints.map((checkpoint, index) => {
						if (checkpoint._id === track.currentCheckpoint) {
							return checkpoint.tasks.map((task, index) => {
								return (
									<ListItem key={index} dense>
										<Task
											track={track}
											checkpoint={checkpoint}
											task={task}
											rerenderTasks={rerenderTasks}
										/>
									</ListItem>
								);
							});
						}
					});
				}
			};
			renderTracks = userTracks.map((track, index) => {
				let link = `/tracks/user/${track._id}`;
				return (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Link to={link} key={index}>
							<Button variant="outlined" fullWidth>
								{track.title}
							</Button>
						</Link>
						<Box className={classes.tasks}>
							<List>{renderTasks(track)}</List>
						</Box>
					</Grid>
				);
			});
		}
	}

	if (userID) {
		return (
			<Grid spacing={2} container xs={12}>
				<Grid item xs={4} />
				<Grid className={classes.titleBox} item xs={4}>
					<Typography className={classes.title} variant="h5">
						Current Tasks
					</Typography>
				</Grid>
				<Grid item xs={4} />
				<Grid container xs={12} spacing={2}>
					{renderTracks}
				</Grid>
			</Grid>
		);
	} else {
		return <LoggedOutDashboard />;
	}
}
