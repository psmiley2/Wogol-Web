import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { REACT_APP_BASE_SERVER_URL } from "../../enviroment";
import history from "../../history";

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

	if (userID === undefined || userID === "") {
		history.push("/login");
	}

	const [userTracks, setUserTracks] = useState(undefined);
	useEffect(() => {
		axios
			.get(`${REACT_APP_BASE_SERVER_URL}tracks/user/${userID}`)
			.then((res) => {
				setUserTracks(res.data);
			})
			.catch((err) => console.error(err));
	}, []);

	if (userTracks) {
		if (userTracks.length === 0) {
			renderTracks = (
				<>
					<Typography variant="body1">You currently have no tracks.</Typography>
					<Link to="/tracks">
						<Button variant="contained" color="primary">
							Find a Track
						</Button>
					</Link>
				</>
			);
		} else {
			renderTracks = userTracks.map((track, index) => {
				let link = `/tracks/user/${track._id}`;
				return (
					<div key={index}>
						<Link to={link} key={index}>
							<Button fullWidth variant="outlined" fullWidth>
								{track.title}
							</Button>
						</Link>
					</div>
				);
			});
		}
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
