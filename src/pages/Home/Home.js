import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import './Home.css';

const Home = () => {
    return (
        <div className="main">
            <NavBar noback={true} pageName="Home - Fast Food Nutrition" />
            <div className="links">
                <Link className="link" to="/restchoice" >
                    <div>Fast food nutrition by RESTAURANT</div>
                </Link>
                <Link className="link" to="/nutrientchoice">
                    <div>Fast food nutrition by NUTRIENT</div>
                </Link>
            </div>
        </div>
    )
}

export default Home;