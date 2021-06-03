import React, { useEffect, useContext } from 'react';
import HomePage from '../pages/HomePage';
import Dashboard from '../pages/Dashboard';
import ChannelsPage from '../pages/ChannelsPage';
import ChannelDetails from '../pages/ChannelDetails';
import PostDetail from '../pages/PostDetail';
import ExplorePage from '../pages/ExplorePage';
import AddPost from '../pages/AddPost';
import DoubtsPage from '../pages/DoubtsPage';
import LoginPage from '../pages/LoginPage';
import NoMatch from '../pages/NoMatch';
import Stack from './stack';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { auth } from "./firebase";
import { DataContext } from './context';



const Routes = (props) => {

    
    const currentUser = useContext(DataContext);

    
    useEffect(() => {
        auth.onAuthStateChanged(async(authUser) => {
            if (authUser) {
                await currentUser.setUser({
                    isLoggedin: true,
                    data: {
                        uid: authUser.uid,
                        photo: authUser.photoURL,
                        email: authUser.email,
                        username: authUser.displayName
                    }
                })
            } else {
                await currentUser.setUser({
                    isLoggedin: false,
                    data: {
                        uid: null,
                        photo: null,
                        email: null,
                        username: null
                    }
                })
            }
        })
    }, [])


   return(
       <Router>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>
                <Route path="/dashboard">
                    <Stack>
                        <Dashboard />
                    </Stack>
                </Route>
                <Route path="/explore">
                    <Stack>
                        <ExplorePage />
                    </Stack>
                </Route>
                <Route path="/doubts">
                    <Stack>
                        <DoubtsPage />
                    </Stack>
                </Route>
                <Route path="/channels">
                    <Stack>
                        <ChannelsPage />
                    </Stack>
                </Route>
                <Route path="/channel-details/:id">
                    <Stack>
                        <ChannelDetails />
                    </Stack>
                </Route>
                <Route path="/post-details/:id">
                    <Stack>
                        <PostDetail />
                    </Stack>
                </Route>
                <Route path="/add-post">
                    <Stack>
                        <AddPost />
                    </Stack>
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="*">
                    <NoMatch />
                </Route>
            </Switch>
       </Router>
   );
}


export default Routes;