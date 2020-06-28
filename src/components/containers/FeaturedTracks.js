import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SuggestionPopup from "./SuggestionPopup";
import TrackCard from "./TrackCard";

const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		paddingTop: "3%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
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
	exploreItems: {
		flexDirection: "row",
	},
	container: {},
	actions: {
		paddingTop: "3%",
		justifyContent: "space-around",
	},
});

export default function FeaturedTracks() {
	const classes = useStyles();
	const [featuredTracks, setFeaturedTracks] = useState(undefined);
	let renderFeaturedTracks;

	useEffect(() => {
		axios
			.get("http://localhost:8080/tracks/featured")
			.then((res) => {
				setFeaturedTracks(res.data);
			})
			.catch((err) => console.error(err));
	}, [featuredTracks]);

	if (featuredTracks) {
		let tempImages = ["weights.jpg", "art.jpg", "coding.jpg"];
		renderFeaturedTracks = featuredTracks.map((track, index) => {
			return (
				<React.Fragment key={index}>
					<Grid item xs={12} sm={4} md={4} xl={4}>
						<TrackCard
							id={track._id}
							title={track.title}
							description={track.description}
							image={tempImages[index]}
						/>
					</Grid>
				</React.Fragment>
			);
		});
	}

	return (
		<Box className={classes.root}>
			<Typography variant="h4">Choose A Track</Typography>
			<Grid className={classes.container} container spacing={2}>
				<Grid item xs={12} />

				{renderFeaturedTracks}

				<Grid container className={classes.actions}>
					<Grid item xs={4}>
						<Link to="/tracks/create">
							<Button fullWidth variant="outlined" color="secondary">
								Create a Track
							</Button>
						</Link>
					</Grid>
					<Grid item xs={4}>
						<SuggestionPopup />
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}
