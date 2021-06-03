import React, {  } from 'react';
import '../css/Card.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import {Link} from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip';

const Card = (props) => {
    return(
        <div className="card">
            <Link to={`/channel-details/${props.userId}`} className="card-meta">
                <div className="card-lead">
                   {props.channelName}
                </div>
                <Tooltip title={`By ${props.teacherName}`} placement="top-start">
                    <Avatar alt={props.teacherName} src={props.avatar} />
                </Tooltip>
            </Link>

            <div className="card-description">
                <div style={{fontSize: 18, fontWeight: '500', marginBottom: 5}} classNmae="description-lead">{props.topic}</div>
                <div className="description-content">
                    {props.content}
                </div>
            </div>

            <div className="card-controls">
                <Link to={`/post-details/${props.id}`}>
                    <Button style={{color: "#fff"}}>Read More</Button>
                </Link>
                <div className="meta-buttons">
                    <IconButton color="primary"><EditRoundedIcon /></IconButton>
                    <IconButton color="secondary"><DeleteRoundedIcon /></IconButton>
                </div>
            </div>
        </div>
    );
}

export default Card;