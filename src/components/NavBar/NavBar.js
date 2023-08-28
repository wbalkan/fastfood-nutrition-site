import React from "react";
import { Link } from "react-router-dom";

import './NavBar.css';

import homeIcon from '../../assets/home.png';
import backArrow from '../../assets/backarrow.png';

const NavBar = (props) => {
    return (
        <div className="navbar">
            {!(props.noback) &&
                <div className="back">
                    <Link to={props.backlink}>
                        <img className="back-arrow" src={backArrow} alt="back"/>
                    </Link>
                </div>
            }

            <div>{props.pageName}</div>

            <div className="home"> 
                <Link to="/">
                    <img className="home-icon" src={homeIcon} alt="home"></img>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;