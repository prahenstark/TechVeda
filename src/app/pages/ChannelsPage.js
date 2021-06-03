import React, { useState, useEffect, useContext } from 'react';
import '../css/ChannelsPage.css';
import Channels from '../components/Channels';
import {DataContext} from '../configs/context';
import db from '../configs/firebase';

const ChannelsPage = (props) => {
    const [ChannelData, setChannelData] = useState([])
    const context = useContext(DataContext)

    useEffect(() => {
        db.collection('channels').where("subscribers", "array-contains", context.User.data.uid).onSnapshot((snapshot) => {
            setChannelData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])


    return(
        <div className="explore-wraper">
            {ChannelData.length === 0 ? (
                <h4>No subscriptions yet. Go to explore page and search for channels to subscribe them!</h4>
            ) : (
                ChannelData.map((channel, index) => {
                    return(
                        <Channels 
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
            )}
        </div>
    );
}


export default ChannelsPage;