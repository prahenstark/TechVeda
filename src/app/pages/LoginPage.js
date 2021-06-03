import React, { useState, useContext, useEffect } from 'react';
import '../css/LoginPage.css';
import Button from '@material-ui/core/Button';
import {auth, provider} from '../configs/firebase';
import {
    Redirect
} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import {DataContext} from '../configs/context';



const LoginPage = () => {
    const [LoginRedirect, setLoginRedirect] = useState()
    const context = useContext(DataContext)

    useEffect(() => {
        auth.onAuthStateChanged(async(authUser) => {
            if (authUser) {
                await context.setUser({
                    isLoggedin: true,
                    data: {
                        uid: authUser.uid,
                        photo: authUser.photoURL,
                        email: authUser.email,
                        username: authUser.displayName
                    }
                })
                setLoginRedirect(true)
            } else {
                await context.setUser({
                    isLoggedin: false,
                    data: {
                        uid: null,
                        photo: null,
                        email: null,
                        username: null
                    }
                })
                setLoginRedirect(false)
            }
        })
    }, [])


    const signUp = () => {
        auth.signInWithRedirect(provider).catch((error) => {
            alert(error.message)
        })
    }

    if (LoginRedirect === true) {
        return <Redirect to="/dashboard" />
    } else if (LoginRedirect === false) {
        return(
            <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center', flexDirection: 'column' }} >
                <div className="logo">
                    <span>Te</span>ch<span>V</span>ed<span>a</span>
                </div>
                <Button style={{color: '#fff'}} onClick={signUp} variant="contained" size="large" color="primary" disableElevation>
                    Sign In With Google
                </Button>
            </div>
        );
    } else {
        return(
            <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }} >
                <CircularProgress />
            </div>
        )
    }
}   


export default LoginPage;