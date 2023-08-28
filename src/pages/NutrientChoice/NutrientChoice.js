import React from "react";
import { Link } from "react-router-dom";

import './NutrientChoice.css';

import names from "../../components/names/names.js";
import NavBar from "../../components/NavBar/NavBar.js";


const NutrientChoice = () => {
    return (
        <div className="main-nutrientchoice">
            <NavBar backlink="/" pageName="Choose a Nutrient"/>
            <div className="nutrientlist">
                {names.slice(0,7).map( (nutrient, index) => {
                    return(
                        <div className="nutrientlink-container">
                            <Link className="nutrientlink" to={ {
                                pathname: '/Nutrient',
                                search: `?nutrient_ind=${index}`
                            } }>
                                {nutrient.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
            <div className="nutrientlist">
                {names.slice(7).map( (nutrient, index) => {
                    return(
                        <div className="nutrientlink-container">
                            <Link className="nutrientlink" to={ {
                                pathname: '/Nutrient',
                                search: `?nutrient_ind=${index+7}`
                            } }>
                                {nutrient.name}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NutrientChoice;