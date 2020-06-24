import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function CurrentTracks() {
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
						<Button>{track.title}</Button>
					</Link>
				</div>
			);
		});
	}

	return (
		<div>
			Current Tracks:
			{renderTracks}
		</div>
	);
}
