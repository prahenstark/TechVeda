import React, { useContext } from 'react';
import '../css/HomePage.css';
import Button from '@material-ui/core/Button';
import img1 from '../assets/img-1.svg';
import img2 from '../assets/img-2.svg';
import Navbar from '../components/Navbar';
import { DataContext } from '../configs/context';
import {
    Link
} from "react-router-dom";


const HomePage = (props) => {
    const context = useContext(DataContext)


    return(
        <div>
            <Navbar />

            <div id="hero">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-lead">
                            <span>I</span>ntroducing techveda, <br />
                            A revolution in education
                        </div>

                        <div className="hero-text">
                            <span>A</span>n educational platform where you can learn what ever you want with no cost.
                            You can also contribute to the website, clear doubts of other students and also teach students with financial problems.
                        </div>

                        <Link to="/login">
                            <Button style={{marginTop: 25, color: "#fff"}} size="large" variant="contained" color="primary" disableElevation>
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    <img className="hero-img" src={img2} alt="" />
                </div>
            </div>


            <div id="hero">
                <div className="container">
                    <img className="hero-img" src={img1} alt="" />

                    <div className="hero-content">
                        <div className="hero-lead-right">
                            <span>I</span>t's open source, <br />
                            Use it as you like!
                        </div>

                        <div className="hero-text-right">
                            <span>W</span>e provide you quality education with no cost.
                            Connect with finest teachers around you and get access to notes , materials and many more .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default HomePage;