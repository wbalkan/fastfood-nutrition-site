import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import './Restaurant.css';

import names from "../../components/names/names";

// const names = [
//     {db_column:'calories', name: 'Calories', min: 350, max: 650, meas: ''},
//     {db_column:'cal_fat', name: 'Calories from Fat', min:130, max: 350, meas: ''},
//     {db_column:'total_fat', name: 'Total Fat', min: 15, max: 40, meas: 'g'},
//     {db_column:'sat_fat', name: 'Saturated Fat', min: 4, max: 12, meas: 'g'},
//     {db_column:'trans_fat', name: 'Trans Fat', min: 0.03, max: 1, meas: 'g'},
//     {db_column:'cholesterol', name: 'Cholesterol', min: 35, max: 120, meas: 'mg'},
//     {db_column:'sodium', name: 'Sodium', min: 1000, max: 1500, meas: 'mg'},
//     {db_column:'total_carb', name: 'Total Carbs', min: 25, max: 55, meas: 'g'},
//     {db_column:'fiber', name: 'Fiber', min: 2, max: 7, meas: 'g'},
//     {db_column:'sugar', name: 'Sugar', min: 3, max: 12, meas: 'g'},
//     {db_column:'protein', name: 'Protein', min: 15, max: 41, meas: 'g'},
//     {db_column:'vit_a', name: 'Vitamin A', min: 0, max: 35, meas: 'mcg'},
//     {db_column:'vit_c', name: 'Vitamin C', min: 0, max: 45, meas: 'mcg'},
//     {db_column:'calcium', name: 'Calcium', min: 0, max: 40, meas: 'mcg'}
// ]

const Restaurant = (props) => {
    // get which restaurant page is for
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const rest = queryParams.get('rest');

    //handler for dropdown menu
    const [nutrient, setNutrient] = useState('calories');
    const [nutrientName, setNutrientName] = useState('Calories');
    const [nutrientInd, setNutrientInd] = useState(0);
    const handleSelect = (event) => {
        setNutrient(names[event.target.value].db_column);
        setNutrientName(names[event.target.value].name);
        setNutrientInd(event.target.value);
    };


    // function for storing sql responses
    const [topData, setTopData] = useState([]);
    const [bottomData, setBottomData] = useState([]);
    const [restData, setRestData] = useState([]);
    useEffect( () => {
        // Query to find topData
        const query1 = `SELECT item, ${nutrient} 
        FROM item JOIN restaurant USING (restaurant_id)
        JOIN nutrition_info USING (item_id)
        WHERE restaurant="${rest}"
        ORDER BY ${nutrient} DESC, item
        LIMIT 5`
        const apiUrl1 = `${process.env.REACT_APP_API_URL}/data/?sqlQuery=${query1}`;
        fetch(apiUrl1)
          .then(response => {
            console.log(response);
            return response.json();
          })
          .then(data => { 
            setTopData(data);
          })
          .catch(error => console.error('Error fetching data:', error));


        // Query to find bottomData
        const query2 = `SELECT item, ${nutrient} 
        FROM item JOIN restaurant USING (restaurant_id)
        JOIN nutrition_info USING (item_id)
        WHERE restaurant="${rest}"
        ORDER BY ${nutrient} ASC, item
        LIMIT 5`
        const apiUrl2 = `${process.env.REACT_APP_API_URL}/data/?sqlQuery=${query2}`;
        fetch(apiUrl2)
          .then(response => {
            console.log(response);
            return response.json();
          })
          .then(data => { 
            setBottomData(data);
          })
          .catch(error => console.error('Error fetching data:', error));


        // Query to find restData
        const query3 = `SELECT restaurant_id, restaurant,
        AVG(calories), AVG(cal_fat), AVG(total_fat), AVG(sat_fat), 
        AVG(trans_fat), AVG(cholesterol), AVG(sodium), AVG(total_carb),
        AVG(fiber), AVG(sugar), AVG(protein),
        AVG(vit_a), AVG(vit_c), AVG(calcium)
        FROM item JOIN restaurant USING (restaurant_id)
        JOIN nutrition_info USING (item_id)
        WHERE restaurant ="${rest}"
        GROUP BY restaurant_id;`
        const apiUrl3 = `${process.env.REACT_APP_API_URL}/data/?sqlQuery=${query3}`;
        fetch(apiUrl3)
          .then(response => {
            console.log(response);
            return response.json();
          })
          .then(data => { 
            setRestData(data);
          })
          .catch(error => console.error('Error fetching data:', error));

      }, [nutrient, rest]);


    return (
        <div className="main-restaurant">
            <NavBar backlink="/restchoice" pageName={rest}/>
            <div className="dropdown-container">
                <div className="nutrient-dropdown-header">Select a nutrient:</div>
                <select className="nutrient-dropdown" value={nutrientInd} onChange={handleSelect}>
                    {names.map( (stat, index) => {
                        return (
                            <option value={index}>{stat.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="section-container">
                <div className="tables">
                    <div className="table-title1">{rest} items with most {nutrientName}:</div>
                    <div className="table-div1"> 
                        <table className="item-table">
                            <thead>
                                <tr>
                                    <th className="item-header">Item</th>
                                    <th>{nutrientName}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topData.map((item, i) => {
                                    var back = NaN;
                                    if (i % 2 === 0){
                                        back="white";
                                    } else {
                                        back="lightgrey";
                                    } 
                                    return (
                                        <tr key={item.id}>
                                            <td style={ {backgroundColor: `${back}`} }>{item.item}</td>
                                            <td style={ {backgroundColor: `${back}`} }>{item[nutrient]} {names[nutrientInd].meas}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="table-title2">{rest} items with least {nutrientName}:</div>
                    <div className="table-div2">
                        
                        <table className="item-table">
                            <thead>
                                <tr>
                                    <th className="item-header">Item</th>
                                    <th>{nutrientName}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bottomData.map((item, i) => {
                                    var back = NaN;
                                    if (i % 2 === 0){
                                        back="white";
                                    } else {
                                        back="lightgrey";
                                    } 
                                    return (
                                    <tr key={item.id} >
                                        <td style={ {backgroundColor: `${back}`} }>{item.item}</td>
                                        <td style={ {backgroundColor: `${back}`} }>{item[nutrient]} {names[nutrientInd].meas}</td>
                                    </tr>
                                    )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                { restData.length > 0 &&
                    <div className="dashboard" >
                        <div className="dash-header">{rest} Avg. Nutrition Per Item</div>
                        <div className="dash-list" style={{left:0}}>
                            {names.slice(0,7).map( (element, index) => {
                                const item = restData[0];
                                const curr = item[`AVG(${element.db_column})`];
                                const percentage = Math.floor( 100*( (curr - element.min)/(element.max-element.min) ) );
                                var color = NaN;
                                if (percentage < 30) {
                                    color = "green";
                                } else if (percentage < 65) {
                                    color = "orange";
                                } else {
                                    color = "red";
                                }
                                var background = "lightgrey";
                                var fill = "white";
                                if (index % 2 === 0){
                                    background = "white";
                                    fill = "lightgrey";
                                }
                                return (
                                    <div className="dash-item" style={{backgroundColor:`${background}`}}>
                                        <div className="dash-title">{element.name}: {Number.parseFloat(curr.slice(0,4))} {element.meas}</div>
                                        <div className="full-bar" style={{backgroundColor: `${fill}`}}>
                                            <div className="bar-filler" style={{
                                                width: `${percentage}%`,
                                                backgroundColor: `${color}`
                                        }}></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="dash-list" style={{left:'50%'}}>
                            {names.slice(7).map( (element, index) => {
                                const item = restData[0];
                                const curr = item[`AVG(${element.db_column})`];
                                const percentage = Math.floor( 100*( (curr - element.min)/(element.max-element.min) ) );
                                var color = NaN;
                                if (percentage < 30) {
                                    color = "green";
                                } else if (percentage < 65) {
                                    color = "orange";
                                } else {
                                    color = "red";
                                }
                                var background = "lightgrey";
                                var fill = "white";
                                if (index % 2 === 1){
                                    background = "white";
                                    fill = "lightgrey";
                                }
                                return (
                                    <div className="dash-item" style={{backgroundColor:`${background}`}}>
                                        <div className="dash-title">{element.name}: {Number.parseFloat(curr.slice(0,4))} {element.meas}</div>
                                        <div className="full-bar" style={{backgroundColor: `${fill}`}}>
                                            <div className="bar-filler" style={
                                                {width: `${percentage}%`,
                                                backgroundColor: `${color}`
                                            }}></div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Restaurant;