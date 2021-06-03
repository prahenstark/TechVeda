import React, { useContext, useState, useEffect } from 'react';
import '../css/DoubtsPage.css';
import Fab from '@material-ui/core/Fab';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import {DataContext} from '../configs/context';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FilterListRoundedIcon from '@material-ui/icons/FilterListRounded';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import db from '../configs/firebase';
import firebase from 'firebase';
import Doubt from '../components/Doubt';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        backgroundColor: '#1A1A2E',
        borderRadius: 10,
        margin: '10px 0'
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


const DoubtsPage = (props) => {
    const classes = useStyles();
    const context = useContext(DataContext);
    const [Filter, setFilter] = useState(false)
    const [ModalOpen, setModalOpen] = useState(false);
    const [DoubtData, setDoubtData] = useState([]);
    const [DoubtValue, setDoubtValue] = useState('');
    const [SearchFilter, setSearchFilter] = useState('')

    const handleModalOpen = () => {
        setModalOpen(true);
    };
  
    const handleModalClose = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        db.collection('doubts').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setDoubtData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    const PostDoubt = async() => {
        await db.collection('doubts').add({
            user: context.User.data,
            doubt: DoubtValue,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            answers: []
        }).then(() => {
            setDoubtValue('')
        }).catch((error) => {
            alert(error.message)
        })
        setModalOpen(false)
    }

    return(
        <div className="box">

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
                        value={SearchFilter}
                        onChange={(e) => {setSearchFilter(e.target.value)}}
                        className={classes.input}
                        placeholder={Filter === true ? "Search Your Doubts..." : "Search Others Doubts..."}
                    />
                    <IconButton style={{margin: '5px 10px'}} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>


                <Dialog open={ModalOpen} onClose={handleModalClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Post Doubt</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To post a doubt, write it here and press the post button. As off now the edit and delete functionalities for deleting and editing doubt is unavailable.
                        </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="doubt"
                        label="Your Doubt"
                        multiline={true}
                        fullWidth
                        value={DoubtValue}
                        onChange={(e) => {setDoubtValue(e.target.value)}}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose} color="secondary">
                            Cancel
                        </Button>
                        <Button disabled={(DoubtValue === "") ? true : false} onClick={PostDoubt} color="primary">
                            Post
                        </Button>
                    </DialogActions>
                </Dialog>



                {(Filter === true) ? (
                    DoubtData.length === 0 ? (
                        <h4>No Doubts found...</h4>
                    ) : (
                        DoubtData.map((channel, index) => {
                            return(
                                (channel.data.user.uid === context.User.data.uid) && (
                                    channel.data.doubt.toLowerCase().includes(SearchFilter.toLowerCase()) && <Doubt 
                                        key={index}
                                        id={channel.id}
                                        username={channel.data.user.username}
                                        doubt={channel.data.doubt}
                                        timestamp={channel.data.timestamp}
                                        answers={channel.data.answers}
                                    />
                                )
                            )
                        })
                    )
                ) : (
                    DoubtData.length === 0 ? (
                        <h4>No Doubts found...</h4>
                    ) : (
                        DoubtData.map((channel, index) => {
                            return(
                                (channel.data.user.uid !== context.User.data.uid) && (
                                    channel.data.doubt.toLowerCase().includes(SearchFilter.toLowerCase()) && <Doubt 
                                        key={index}
                                        id={channel.id}
                                        username={channel.data.user.username}
                                        doubt={channel.data.doubt}
                                        timestamp={channel.data.timestamp}
                                        answers={channel.data.answers}
                                    />
                                )
                            )
                        })
                    )
                )}


            
            <Fab onClick={handleModalOpen} style={{color: '#fff', position: 'fixed', bottom: 30, right: 30}} color="primary" variant="extended">
                <AddRoundedIcon styles={{marginRight: 10}} />
                Add Doubt
            </Fab>
        </div>
    );
}


export default DoubtsPage;