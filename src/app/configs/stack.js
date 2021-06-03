import React, { useContext, useState } from 'react';
import {DataContext} from './context';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    Redirect,
    Link
} from "react-router-dom";
import '../css/stack.css';
import Avatar from '@material-ui/core/Avatar';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import LocalActivityRoundedIcon from '@material-ui/icons/LocalActivityRounded';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {auth} from '../configs/firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));  


const Stack = (props) => {
    const context = useContext(DataContext);
    const [Toggle, setToggle] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [ProfileOpen, setProfileOpen] = useState(false);



    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        window.location.href = `/channel-details/${context.User.data.uid}`
        setAnchorEl(null);
    };

    const handleProfileOpen = () => {
        setProfileOpen(true);
        setAnchorEl(null);
    };
    
    const handleProfileClose = () => {
        setProfileOpen(false);
    };
  


    const classes = useStyles();

    if (context.User) {
        if (context.User.isLoggedin === true) {
            return(
                <main>
                    <div className="top-nav">
                        <div className="top-nav-logo">
                            <span>Te</span>ch<span>V</span>ed<span>a</span>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', marginRight: 30}} className="top-nav-meta">
                            <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuOpen} className="profile-info">
                                <span>{context.User.data.username} </span>
                                <Avatar alt={context.User.data.username} src={context.User.data.photo} />
                            </div>
                            <IconButton onClick={() => {
                                if (Toggle === true) {
                                    setToggle(false)
                                } else {
                                    setToggle(true)
                                }
                            }} className="responsive-icon" color="primary" aria-label="menu">
                                <MenuRoundedIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
                               <MenuItem style={{color: '#fff'}} onClick={handleMenuClose}>My Channel</MenuItem>
                                <MenuItem onClick={() => {
                                    auth.signOut().then(() => {
                                        context.setUser()
                                    }).catch((error) => {
                                        alert(error.errorMessage)
                                    });
                                }}>Logout</MenuItem>
                            </Menu>
                        </div>


                        {/* User Profile Here */}

                        <Dialog
                            open={ProfileOpen}
                            onClose={handleProfileClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <Avatar  className={classes.large} alt={context.User.data.username} src={context.User.data.photo} />
                                <h2 style={{marginTop: 15, textAlign: 'center'}}>{context.User.data.username}</h2>
                                <p style={{marginTop: 10, textAlign: 'center', color: '#ddd', fontSize: 12}}>{context.User.data.email}</p>
                            </DialogContent>
                            <DialogActions style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Button onClick={handleProfileClose} color="primary">
                                    Close
                                </Button>
                                <Button onClick={() => {
                                    auth.signOut().then(() => {
                                        context.setUser()
                                    }).catch((error) => {
                                        alert(error.errorMessage)
                                    });
                                }} color="secondary">
                                    Logout
                                </Button>
                            </DialogActions>
                        </Dialog>
                        
                    </div>
                    <div className="nav-container">
                        <div className={Toggle ? "sidebar active-bar" : "sidebar"}>
                            <div className="sidebar-content">
                                <Link to="/dashboard" className={(window.location.href.indexOf("dashboard") > -1 || window.location.href.indexOf("post-details") > -1  || window.location.href.indexOf("channel-details") > -1 || window.location.href.indexOf("add-post") > -1) ? "sidebar-item active-item" : "sidebar-item"}>
                                    <HomeRoundedIcon className="sidebar-icon" />
                                    <div className="sidebar-label">Home</div>
                                </Link>
                                <Link to="/explore" className={(window.location.href.indexOf("explore") > -1) ? "sidebar-item active-item" : "sidebar-item"}>
                                    <SearchRoundedIcon className="sidebar-icon" />
                                    <div className="sidebar-label">Explore</div>
                                </Link>
                                <Link to="/doubts" className={(window.location.href.indexOf("doubts") > -1) ? "sidebar-item active-item" : "sidebar-item"}>
                                    <ContactSupportRoundedIcon className="sidebar-icon" />
                                    <div className="sidebar-label">Doubts</div>
                                </Link>
                                <Link to="/channels" className={(window.location.href.indexOf("channels") > -1) ? "sidebar-item active-item" : "sidebar-item"}>
                                    <LocalActivityRoundedIcon className="sidebar-icon" />
                                    <div className="sidebar-label">Channels</div>
                                </Link>
                            </div>
                        </div>
                        <div className="content">
                            {props.children}
                        </div>
                    </div>
                </main>
            );
        } else {
            return(
                <Redirect to='/login' />
            )       
        }
    } else {
        return(
            <div style={{display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }} >
                <CircularProgress />
            </div>
        )
    }
}


export default Stack;