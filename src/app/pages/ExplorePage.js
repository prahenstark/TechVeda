import React, { useState, useEffect, useContext } from 'react';
import '../css/ExplorePage.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import SearchIcon from '@material-ui/icons/Search';
import Card from '../components/Card';
import Channels from '../components/Channels';
import db from '../configs/firebase';
import {DataContext} from '../configs/context';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#1A1A2E',
        borderRadius: 10,
        marginBottom: 10
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));



const ExplorePage = (props) => {
    const classes = useStyles();
    const [Filter, setFilter] = useState(false)
    const [ChannelData, setChannelData] = useState([])
    const [PostData, setPostData] = useState([])
    const context = useContext(DataContext);
    const [Search, setSearch] = useState('')

    useEffect(() => {
        db.collection('channels').where("uid", "!=", context.User.data.uid).onSnapshot((snapshot) => {
            setChannelData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    useEffect(() => {
        db.collection('posts').where("channel.id", "!=", context.User.data.uid).onSnapshot((snapshot) => {
            setPostData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])




    return(
        <div id="ExplorePage">
            <Paper component="form" className={classes.root}>
                <IconButton onClick={() => {
                    if(Filter === true){
                        setFilter(false)
                    } else {
                        setFilter(true)
                    }}} style={{margin: '5px 5px 5px 10px'}} className={classes.iconButton} aria-label="menu">
                    <FilterListRoundedIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <InputBase
                    className={classes.input}
                    value={Search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    placeholder={Filter === true ? "Search Channels..." : "Search Topics..."}
                />
                <IconButton style={{margin: '5px 10px'}} className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>

            <div className="explore-wraper">
                {Filter === true ? (
                    ChannelData.length === 0 ? (
                        <h4>No Channels found...</h4>
                    ) : (
                        ChannelData.map((channel, index) => {
                            return(
                                channel.data.channelName.toLowerCase().includes(Search.toLowerCase()) && <Channels 
                                    key={index} 
                                    username={channel.data.username}
                                    photo={channel.data.photo}
                                    uid={channel.data.uid}
                                    channelName={channel.data.channelName}
                                    email={channel.data.email}
                                    description={channel.data.description}
                                    subscribers={channel.data.subscribers}
                                />
                            )
                        })
                    )
                ) : (
                    PostData.length === 0 ? (
                        <h4>No Posts found...</h4>
                    ) : (
                        PostData.map((channel, index) => {
                            return(
                                channel.data.topic.toLowerCase().includes(Search.toLowerCase()) && <Card 
                                    key={index} 
                                    topic={channel.data.topic}
                                    avatar={channel.data.channel.data.photo}
                                    userId={channel.data.channel.id}
                                    channelName={channel.data.channel.data.channelName} 
                                    teacherName={channel.data.channel.data.username}  
                                    content={channel.data.content}  
                                    id={channel.id}
                                />
                            )
                        })
                    )
                )}
            </div>
        </div>
    );
}


export default ExplorePage;