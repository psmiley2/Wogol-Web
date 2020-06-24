// import { useSelector } from "react-redux"
import { Button } from '@material-ui/core'
import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import TrackList from "./TrackList"
export default function Tracks() {
    const userID = useSelector(state => state.user.id)
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/tracks").then(res => {
            setTracks(res.data)
        }).catch(err => console.error(err))        
    }, [])

    return (
        <div>
            <div>
                <h4>Tracks:</h4>
                <Link to="/tracks/create">
                    <Button variant="outlined" color="primary">
                        Create a Track
                    </Button>
                </Link>
                <TrackList tracks={tracks} />
            </div>
        </div>
    )
}
