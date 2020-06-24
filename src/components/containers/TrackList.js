import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Link } from "react-router-dom";

export default function TrackList({ tracks }) {
	const trackList = tracks.map((track, index) => {
		let detailView = `/tracks/${track._id}`;
		return (
			<Link to={detailView} key={index}>
				<ListItem button>
					<ListItemText primary={track.title} />
				</ListItem>
			</Link>
		);
	});

	return (
		<div>
			<List>{trackList}</List>
		</div>
	);
}
