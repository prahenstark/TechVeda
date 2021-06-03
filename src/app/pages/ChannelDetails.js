import React, { useEffect, useContext, useState } from 'react';
import '../css/ChannelDetails.css';
import {useParams} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import {DataContext} from '../configs/context';
import db from '../configs/firebase';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

const ChannelDetails = () => {
    const context = useContext(DataContext)
    let { id } = useParams();
    let history = useHistory();
    const [UserChannel, setUserChannel] = useState(false)
    const [DialogOpen, setDialogOpen] = useState(false);
    const [Description, setDescription] = useState('');
    const [ChannelName, setChannelName] = useState('');
    const [ChannelData, setChannelData] = useState()

    useEffect(() => {
        db.collection('channels').doc(id).onSnapshot((doc) => {
            if (doc.exists) {
                if (context.User.data.uid === id) {
                    setUserChannel(true)
                } else {
                    setUserChannel(false)
                }
                setChannelData({
                    id: doc.id,
                    data: doc.data()
                })
                setDialogOpen(false)
            } else if (!doc.exists && context.User.data.uid === id) {
                setDialogOpen(true)
            } else {
                return history.push('/dashboard')
            }
        })
    }, [])

    const ToggleSubscribe = () => {
        if (ChannelData.id !== context.User.data.uid) {
            if (ChannelData.data.subscribers.includes(context.User.data.uid)) {
                db.collection('channels').doc(id).update({
                    subscribers: firebase.firestore.FieldValue.arrayRemove(context.User.data.uid)
                });
            } else {
                db.collection('channels').doc(id).update({
                    subscribers: firebase.firestore.FieldValue.arrayUnion(context.User.data.uid)
                });
            }
        }
    }

    const createChannel = () => {
        if (ChannelName !== '' && Description !== '') {
            db.collection('channels').doc(id).set({
                uid: context.User.data.uid,
                username: context.User.data.username,
                photo: context.User.data.photo,
                email: context.User.data.email,
                subscribers: [],
                description: Description,
                channelName: ChannelName,
            })
        } else {
            alert('Please fill in the required data')
        }
    }

    return(
        <div id="channel-details">
            <Dialog open={DialogOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Channel</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create your channel, enter its name and description and press the create channel button
                    </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Channel Name"
                    fullWidth
                    value={ChannelName}
                    onChange={(e) => setChannelName(e.target.value)}
                />
                <TextField
                    style={{marginTop: 15}}
                    autoFocus
                    margin="dense"
                    label="Description"
                    fullWidth
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={createChannel} color="primary">
                        Create Channel
                    </Button>
                </DialogActions>
            </Dialog>

            {(ChannelData) && (
                <div className="channel-metabox">
                    <Avatar src={ChannelData.data.photo} style={{width: 150, height: 150, marginBottom: 30}} alt={ChannelData.data.username} />
                    <div className="channel-content">
                        <h1 style={{textAlign: 'center'}}>{ChannelData.data.channelName}</h1>
                        <p style={{textAlign: 'center'}}>{ChannelData.data.username}</p>
                        <p style={{textAlign: 'center', fontSize: 24, fontWeight: "700", marginTop: 20}}>{ChannelData.data.subscribers.length} <span style={{textAlign: 'center', fontSize: 16, fontWeight: "400"}}>Subscribers | </span> 22 <span style={{textAlign: 'center', fontSize: 16, fontWeight: "400"}}>Posts</span> </p>
                        <div style={{display: 'flex', justifyContent: "center", marginTop: 20}} className="button-container">
                            {(UserChannel === true) ? (
                                <Button color="primary">
                                    Edit Channel
                                </Button>
                            ) : (
                                (ChannelData.data.subscribers.includes(context.User.data.uid)) ? (
                                    <Button onClick={ToggleSubscribe} color="secondary">
                                        Unsubscribe
                                    </Button>
                                ) : (
                                    <Button onClick={ToggleSubscribe} color="secondary">
                                        Subscribe
                                    </Button>
                                )
                            )}
                        </div>
                        <p style={{textAlign: 'center', margin: '25px 0', fontSize: 12}}>{ChannelData.data.description}</p>
                    </div>
                    {(UserChannel === true) && (
                        <Link to={`/add-post`}>
                            <Fab style={{color: '#fff', position: 'fixed', bottom: 30, right: 30}} color="primary" variant="extended">
                                <AddRoundedIcon styles={{marginRight: 10}} />
                                Add Post
                            </Fab>
                        </Link>
                    )}
                </div>
            )}
            

        </div>
    );
}


export default ChannelDetails;