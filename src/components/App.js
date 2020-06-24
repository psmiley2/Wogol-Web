import { Box } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { setSession } from "../actions";
import Tracks from "../components/containers/Tracks";
import history from "../history";
import CurrentTracks from "./containers/CurrentTracks";
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import Register from "./containers/Register";
import TrackAdd from "./containers/TrackAdd";
import TrackDetail from "./containers/TrackDetail";
import TrackMarket from "./containers/TrackMarket";
import UserTrackDetail from "./containers/UserTrackDetail";
import Navbar from "./objects/Navbar";
export default function App() {
	const dispatch = useDispatch();
	dispatch(setSession());

	return (
		<Router history={history}>
			<Navbar />
			<Box display="flex" flexDirection="row">
				<Switch>
					<Route path="/" exact component={Dashboard} />
					<Route path="/market" exact component={TrackMarket} />
					<Route path="/login" exact component={Login} />
					<Route path="/register" exact component={Register} />
					<Route path="/tracks" exact component={Tracks} />
					<Route path="/tracks/create" exact component={TrackAdd} />
					<Route path="/tracks/user" exact component={CurrentTracks} />
					<Route path="/tracks/:trackID" exact component={TrackDetail} />
					<Route path="/tracks/user/:trackID" exact component={UserTrackDetail} />
				</Switch>
			</Box>
		</Router>
	);
}
