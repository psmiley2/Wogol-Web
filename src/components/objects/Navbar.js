import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GridOn from "@material-ui/icons/GridOn";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: "100%",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function ButtonAppBar() {
	let userID = useSelector((state) => state.user.id);
	const dispatch = useDispatch();
	const classes = useStyles();

	const handleLogout = async () => {
		await dispatch(logout());

		// This is a bad fix. To rerender I am sending to a randomly
		// chosen url and then back to the dashboard. It also causes
		// a warning
		history.push("/tracks");
		history.push("/");
	};

	const authButtons = () => {
		if (userID === "" || userID === undefined || userID === null) {
			return (
				<>
					<Link to="/login">
						<Button>Login</Button>
					</Link>
					<Link to="/register">
						<Button>Register</Button>
					</Link>
				</>
			);
		} else {
			return (
				<Button onClick={() => handleLogout()} color="inherit">
					Logout
				</Button>
			);
		}
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Link to="/">
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="dashboard"
						>
							<GridOn />
						</IconButton>
					</Link>
					<Link to="/tracks">
						<Button color="secondary">Market</Button>
					</Link>
					<Link to="/tracks/user">
						<Button color="secondary">Tracks</Button>
					</Link>
					<Typography variant="h6" className={classes.title}></Typography>
					{authButtons()}
				</Toolbar>
			</AppBar>
		</div>
	);
}
