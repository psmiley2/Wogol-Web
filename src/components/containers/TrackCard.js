import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";
import history from "../../history";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	detailButton: {
		float: "right",
	},
});

export default function TrackCard({ id, title, description, image }) {
	const classes = useStyles();
	const userID = useSelector((state) => state.user.id);
	let trackInfoLink = `/tracks/${id}`;

	const handleRedirect = () => {
		if (userID) {
			history.push(trackInfoLink);
		} else {
			history.push("/login");
		}
	};

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt={title}
					height="140"
					image={`/images/${image}`}
					title={title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions className={classes.detailButton}>
				<Button size="small" color="primary" onClick={handleRedirect}>
					Learn More
				</Button>
			</CardActions>
		</Card>
	);
}
