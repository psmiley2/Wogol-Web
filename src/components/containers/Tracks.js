// import { useSelector } from "react-redux"
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";

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
});

export default function Tracks() {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<Typography variant="h4">Discover Tracks</Typography>
			<Grid container spacing={2}>
				<Grid item xs={4} />
				<Grid item xs={4}>
					<TextField
						fullWidth
						variant="outlined"
						placeholder="Search For A Track"
					></TextField>
				</Grid>
				<Grid item xs={4} />
				<Grid item xs={4} />
				<Grid item xs={4}>
					<Link to="/tracks/create">
						<Button fullWidth variant="outlined" color="primary">
							Create a Track
						</Button>
					</Link>
				</Grid>
				<Grid item xs={4} />
				<Grid item xs={3}>
					<Button fullWidth variant="outlined">
						New
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button fullWidth variant="outlined">
						Popular
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Link to="/tracks/all">
						<Button fullWidth variant="outlined">
							All
						</Button>
					</Link>
				</Grid>
				<Grid item xs={3}>
					<Button fullWidth variant="outlined">
						Featured
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button fullWidth variant="outlined">
						Music
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button fullWidth variant="outlined">
						Health and Fitness
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button fullWidth variant="outlined">
						Academic
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button fullWidth variant="outlined">
						Arts
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
