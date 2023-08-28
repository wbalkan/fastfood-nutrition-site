import React from "react";
import LogoLink from "../../components/LogoLink/LogoLink";
import NavBar from "../../components/NavBar/NavBar";
import './RestChoice.css';

import mcdonalds from '../../assets/mcdonalds.jpg';
import arbys from '../../assets/arbys.png';
import sonic from '../../assets/sonic.png';
import burgerKing from '../../assets/burger-king.jpg';
import dairyQueen from '../../assets/dairy-queen.png';
import chickFilA from '../../assets/chick-fil-a.png';
import subway from '../../assets/subway.png';
import tacoBell from '../../assets/taco-bell.jpeg';

const logos1 = [
    { 
        restaurant: "Mcdonalds",
        path: mcdonalds
    }, 
    { 
        restaurant: "Sonic",
        path: sonic
    }, 
    { 
        restaurant: "Arbys",
        path: arbys
    }, 
    { 
        restaurant: "Burger King",
        path: burgerKing
    }]
const logos2 = [    
    { 
        restaurant: "Dairy Queen",
        path: dairyQueen
    }, 
    { 
        restaurant: "Chick Fil-A",
        path: chickFilA
    }, 
    { 
        restaurant: "Subway",
        path: subway
    }, 
    { 
        restaurant: "Taco Bell",
        path: tacoBell
    }, 

]

const RestChoice = () => {
    return (
        <div className="main-restchoice">
            <NavBar backlink="/" pageName="Choose a Restaurant"/>
            <div className="logolist">
                {logos1.map( restaurant => {
                    return(
                        <div className="logolink-container">
                            <LogoLink className="logolink" im_path={restaurant.path} rest_name={restaurant.restaurant}/>
                        </div>
                    )
                })}
            </div>
            <div className="logolist">
                {logos2.map( restaurant => {
                    return(
                        <div className="logolink-container">
                            <LogoLink className="logolink" im_path={restaurant.path} rest_name={restaurant.restaurant}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RestChoice;