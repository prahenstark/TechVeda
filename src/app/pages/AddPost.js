import React, { useState, useEffect, useContext } from 'react';
import '../css/AddPost.css';
import Input from "@material-ui/core/Input";
import Button from '@material-ui/core/Button';
import {DataContext} from '../configs/context';
import db from '../configs/firebase';
import {useHistory} from 'react-router-dom';
import firebase from 'firebase';


const AddPost = (props) => {
    const context = useContext(DataContext);
    const [PostText, setPostText] = useState('');
    const [PostTopic, setPostTopic] = useState('');
    const [Channel, setChannel] = useState()
    let history = useHistory();
    var Video = null;
    var Photo = null;
    var Document = null;

    useEffect(() => {
        db.collection('channels').doc(context.User.data.uid).onSnapshot((doc) => {
            if (doc.exists) {
                if (context.User.data.uid === doc.id) {
                    setChannel({
                        id: doc.id,
                        data: doc.data()
                    })
                } else {
                    return history.push('/dashboard')
                }
            } else {
                return history.push('/dashboard')
            }
        })
    })


    const addPost = () => {
        db.collection('posts').add({
            channel: Channel,
            content: PostText,
            topic: PostTopic,
            video: Video,
            photo: Photo,
            document: Document,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            Video = null;
            Photo = null;
            Document = null;
            setPostText('')
            setPostTopic('')
            return history.push('/dashboard')
        }).catch((e) =>{ 
            alert(e.message)
        })
    }

    return(
        Channel ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 className="Newpost">Add Post</h2>
                <Input
                    id="filled-full-width"
                    style={{ margin: '50px 0 0 0' }}
                    placeholder="Write your post topic"
                    margin="normal"
                    variant="filled"
                    multiline="true"
                    className="input"
                    value={PostTopic}
                    onChange={(e) => {setPostTopic(e.target.value)}}
                />
                <Input
                    id="filled-full-width"
                    style={{ margin: '50px 0 0 0' }}
                    placeholder="Write your post"
                    margin="normal"
                    variant="filled"
                    multiline="true"
                    className="input"
                    value={PostText}
                    onChange={(e) => {setPostText(e.target.value)}}
                />
                
                <div className="three-buttons">
                    <Button onClick={() => {
                        Photo = window.prompt("Add Photo Url")
                        console.log(Photo)
                    }} color="secondary">
                        Add photo
                    </Button>

                    <Button onClick={() => {Video = window.prompt("Add Youtube Video Url")}} color="secondary">
                        Add video
                    </Button>

                    <Button onClick={() => {Document = window.prompt("Add Document Url")}} color="secondary">
                        Add Document
                    </Button>
                </div>

                <Button onClick={addPost} disabled={(PostText === "") ? true : false} className="button-main" style={{color: '#fff', marginTop: 25}} variant="contained" size="large" color="primary">
                    Submit Post
                </Button>
            </div>
        ) : (
            <div></div>
        )
    );
}


export default AddPost;