import React, { useContext } from 'react';
import '../css/Navbar.css';
import Button from '@material-ui/core/Button';
import { DataContext } from '../configs/context';
import { Link } from "react-router-dom";


const Navbar = (props) => {
    const context = useContext(DataContext)

    return(
        <header>
            <nav>
                <div className="nav-logo">
                    <span>Te</span>ch<span>V</span>ed<span>a</span>
                </div>

                <div className="nav-list">
                    <Link to='/' className="nav-item">Home</Link>
                    <div onClick={() => {window.location.href='https://github.com/Arghya-Pogo';}} className="nav-item"><span>A</span>bout</div>
                    <Link to='/dashboard' className="nav-item">Dashboard</Link>
                    <Link to="/login">
                        <Button style={{color: '#fff'}} variant="contained" color="primary" disableElevation>
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}


export default Navbar;