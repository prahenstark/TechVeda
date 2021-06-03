import React, { useContext, useEffect, useState } from 'react';
import '../css/PostDetails.css';
import {DataContext} from '../configs/context';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import Avatar from '@material-ui/core/Avatar';
import {useParams} from 'react-router-dom';
import db from '../configs/firebase';

const PostDetails = (props) => {
    const context = useContext(DataContext);
    const {id} = useParams();
    const [Data, setData] = useState()


    useEffect(() => {
        db.collection('posts').doc(id).onSnapshot((snapshot) => {
            setData({
                id: snapshot.id,
                data: snapshot.data()
            })
        })
    }, [])


    return(
        
        <div className="details-box">
            {Data && (
                <>
                <div className="meta-card">
                    <div className="avatar">
                        <Avatar style={{width: 150, height: 150}} src={Data.data.channel.data.photo} alt={Data.data.channel.data.username} />
                    </div>
                    <div className="stats">
                        <h2 style={{marginBottom: 20, textAlign: 'center'}}>{Data.data.channel.data.username}</h2>
                        <div style={{textAlign: 'justify', fontSize: 14, textAlign: 'center'}}>{Data.data.channel.data.description}</div>
                    </div>
                </div>

                <div className="Ques-card">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className="timeStamp">{new Date(Data.data.timestamp?.toDate()).toUTCString()}</div>
                        {(Data.data.channel.id === context.User.data.uid) && (
                            <div className="meta-buttons">
                                <IconButton color="primary"><EditRoundedIcon /></IconButton>
                                <IconButton color="secondary"><DeleteRoundedIcon /></IconButton>
                            </div>
                        )}
                    </div>
                    <h2 style={{margin: '10px 0 5px 0'}}>{Data.data.topic}</h2>
                    <p className="card-content">
                        {Data.data.content}
                    </p>
                </div>
                {Data.data.photo && (
                    <div className="Ques-card">
                        <img style={{width: '100%'}} src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Robert_brown_botaniker.jpg" alt="Picture" />
                    </div>
                )}
                {Data.data.video && (
                    <div className="Ques-card">
                        <iframe style={{width: '100%', height: '60vh'}} src="https://www.youtube.com/embed/6mbwJ2xhgzM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                )}
                {Data.data.document && (
                    <div className="Ques-card">
                        <span>PDF: </span> <a style={{color: '#fff'}} href="https://upload.wikimedia.org/wikipedia/commons/b/ba/Robert_brown_botaniker.jpg">Robert Brown.pdf</a>
                    </div>
                )}


                </>
            )}
        </div>
    );
}


export default PostDetails;