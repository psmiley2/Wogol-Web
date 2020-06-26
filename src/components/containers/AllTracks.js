import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackList from "./TrackList";
const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		paddingTop: "10%",
		display: "flex",
		justifyContent: "center",
	},
	box: {
		width: "20%",
		padding: "2%",
		borderRadius: "3px",
	},
	button: {
		float: "right",
		marginTop: "5%",
	},
});

export default function AllTracks() {
	const classes = useStyles();
	const [tracks, setTracks] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/tracks")
			.then((res) => {
				setTracks(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<Box>
			<Typography variant="h4">All Tracks</Typography>
			<TrackList tracks={tracks} />
		</Box>
	);
}
