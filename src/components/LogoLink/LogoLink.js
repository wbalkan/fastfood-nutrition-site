import React from "react";
import { Link } from "react-router-dom";

import './LogoLink.css';

const LogoLink = (props) => {
    return (
        <div className="link-container">
            <Link className="inner-link" to={{
                pathname: '/Restaurant', 
                search: `?rest=${props.rest_name}`
            }}>
                <img className="logo-image" src={props.im_path} alt="logo"/>
            </Link>
        </div>
    )
}

export default LogoLink;