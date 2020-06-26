import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		paddingTop: "10%",
		justifyContent: "center",
		flexDirection: "column",
	},
	box: {
		margin: "auto",
		width: "30%",
		padding: "2%",
		borderRadius: "3px",
		textAlign: "center",
	},
	button: {
		float: "right",
		marginTop: "5%",
	},
});

export default function CurrentTracks() {
	const classes = useStyles();

	let renderTracks = <></>;
	const userID = useSelector((state) => state.user.id);
	const [userTracks, setUserTracks] = useState(undefined);
	useEffect(() => {
		axios
			.get(`http://localhost:8080/tracks/user/${userID}`)
			.then((res) => {
				setUserTracks(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	if (userTracks) {
		renderTracks = userTracks.map((track, index) => {
			let link = `/tracks/user/${track._id}`;
			return (
				<div key={index}>
					<Link to={link} key={index}>
						<Button fullWidth>{track.title}</Button>
					</Link>
				</div>
			);
		});
	}

	return (
		<Grid container spacing={2} className={classes.root}>
			<Typography variant="h4" className={classes.box}>
				Current Tracks
			</Typography>
			<Grid item xs={4} className={classes.box}>
				<Box>{renderTracks}</Box>
			</Grid>
		</Grid>
	);
}
