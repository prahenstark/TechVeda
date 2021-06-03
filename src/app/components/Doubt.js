import React, { useState, useContext } from 'react';
import ReplyAllRoundedIcon from '@material-ui/icons/ReplyAllRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import db from '../configs/firebase';
import firebase from 'firebase';
import {DataContext} from '../configs/context';



const Doubt = (props) => {
    const [DisplayAnswers, setDisplayAnswers] = useState(false);
    const context = useContext(DataContext);

    const AddAnswers = async() => {
        var AnswerValue = window.prompt("Your Answer")
        console.log(AnswerValue)
        if (AnswerValue) {
            db.collection('doubts').doc(props.id).update({
                answers: firebase.firestore.FieldValue.arrayUnion({
                    answer: AnswerValue,
                    user: context.User.data
                })
            })
        }
    }

    

    return(
        <div className="Ques-card">
            <span>@{props.username}: </span> {props.doubt}
            
            {DisplayAnswers === true && (
                <p style={{marginTop: 20}}>
                    <h4>Answers</h4>
                    {props.answers.map((item, index) => {
                        return(
                            <p key={index}>
                                <span style={{color: '#569AFF'}}>@{item.user.username}: </span> {item.answer}
                            </p>
                        )
                    })}
                </p>
            )}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className="timeStamp">{new Date(props.timestamp?.toDate()).toUTCString()}</div>
                <div>
                    <ExpandMoreRoundedIcon onClick={() => {
                        if (DisplayAnswers === true) {
                            setDisplayAnswers(false)
                        } else {
                            setDisplayAnswers(true)
                        }
                    }} style={{cursor: 'pointer'}} />
                    <ReplyAllRoundedIcon onClick={AddAnswers} style={{cursor: 'pointer', marginLeft: 10}} />
                </div>
            </div>
        </div>
    );
}


export default Doubt;