import React, {  } from 'react';
import '../css/Channels.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
}));


const Channels = (props) => {
    const classes = useStyles();

    return(
        <Link to={`/channel-details/${props.uid}`} className="channels">
            <Avatar alt={props.username} src={props.photo} className={classes.large} />
            <div className="channel-name">{props.channelName}</div>
            <div className="channel-description">{props.description}</div>
        </Link>
    );
}


export default Channels;