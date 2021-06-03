import React, { useState, useEffect, useContext } from 'react';
import '../css/Dashboard.css';
import {DataContext} from '../configs/context';
import db from '../configs/firebase';
import Card from '../components/Card';


const Dashboard = (props) => {
    const [Data, setData] = useState([])
    const context = useContext(DataContext)

    useEffect(() => {
        db.collection('posts').orderBy("timestamp", "desc").onSnapshot((snapshot) => {
            setData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    return(
        <div id="dashboard">
            {Data.map((item, index) => {
                return(
                    <Card 
                        key={index} 
                        topic={item.data.topic}  
                        avatar={item.data.channel.data.photo} 
                        teacherName={item.data.channel.data.username}  
                        content={item.data.content}  
                        id={item.id}
                        topic={item.data.topic}
                        userId={item.data.channel.id}
                        channelName={item.data.channel.data.channelName} 
                    /> 
                )
            })}
            
        </div>
    );
}


export default Dashboard;