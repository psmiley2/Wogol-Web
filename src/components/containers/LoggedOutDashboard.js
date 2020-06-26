import { Box, Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
	root: {
		width: "100%",
		height: "100%",
		paddingTop: "10%",
		textAlign: "center",
	},
	box: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default function LoggedOutDashboard() {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Grid container spacing={2} className={classes.box}>
				<Grid item xs={12}>
					<Typography variant="h2">Welcome To Wogol</Typography>
				</Grid>
				<Grid item xs={4} />

				<Grid item xs={2}>
					<Link to="/login">
						<Button fullWidth variant="outlined">
							Login
						</Button>
					</Link>
				</Grid>
				<Grid item xs={2}>
					<Link to="/register">
						<Button fullWidth variant="contained" color="primary">
							Sign Up
						</Button>
					</Link>
				</Grid>
				<Grid item xs={4} />
				<Grid item xs={4}>
					<Link to="/">
						<Button fullWidth variant="outlined">
							Learn More
						</Button>
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
}
