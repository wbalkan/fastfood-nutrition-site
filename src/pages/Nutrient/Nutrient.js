import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import names from "../../components/names/names";

import './Nutrient.css';

import mcdonalds from '../../assets/mcdonalds.jpg';
import arbys from '../../assets/arbys.png';
import sonic from '../../assets/sonic.png';
import burgerKing from '../../assets/burger-king.jpg';
import dairyQueen from '../../assets/dairy-queen.png';
import chickFilA from '../../assets/chick-fil-a.png';
import subway from '../../assets/subway.png';
import tacoBell from '../../assets/taco-bell.jpeg';

const paths = 
    { 
        "Mcdonalds": mcdonalds,
        "Sonic": sonic,
        "Arbys": arbys,
        "Burger King": burgerKing,
        "Dairy Queen": dairyQueen,
        "Chick Fil-A": chickFilA,
        "Subway": subway,
        "Taco Bell": tacoBell
    }






const Nutrient = () => {
    // get nutrient
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const nutrient_ind = queryParams.get('nutrient_ind');
    const nutrient = names[nutrient_ind].db_column;

    // function for storing sql responses
    const [topData, setTopData] = useState([]);
    const [bottomData, setBottomData] = useState([]);
    const [restData, setRestData] = useState([]);
    useEffect( () => {
        // Query to find topData
        const query1 = `SELECT restaurant, item, ${nutrient} 
        FROM item JOIN restaurant USING (restaurant_id)
        JOIN nutrition_info USING (item_id)
        ORDER BY ${nutrient} DESC, item
        LIMIT 3`
        const apiUrl1 = `${process.env.REACT_APP_API_URL}/data/?sqlQuery=${query1}`;
        console.log(apiUrl1);
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
        const query2 = `SELECT restaurant, item, ${nutrient} 
        FROM item JOIN restaurant USING (restaurant_id)
        JOIN nutrition_info USING (item_id)
        ORDER BY ${nutrient} ASC, item
        LIMIT 3`
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
        const query3 = `SELECT restaurant
        FROM item JOIN restaurant USING (restaurant_id)
        JOIN nutrition_info USING (item_id)
        GROUP BY restaurant_id
        ORDER BY AVG(${nutrient});`
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

      }, [nutrient]);


    return (
        <div className="nutrient-main-container">
            <NavBar backlink="/nutrientchoice" pageName={names[nutrient_ind].name}/>
            {/* <div>nutrient page for {names[nutrient_ind].name}</div>
            <div>{JSON.stringify(topData)}</div>
            <div>{JSON.stringify(bottomData)}</div>
            <div>{JSON.stringify(restData)}</div>
            <img src={paths[restData[0].restaurant]} alt="lowest logo"></img> */}

            { restData.length > 0 &&
            <div className="podium">
                <div className="podium-title">Chains with Highest {names[nutrient_ind].name} per Item</div>
                <div className="podium-container">
                    <img className="podium-image" src={paths[restData[6].restaurant]} alt="logo 2"></img>
                    <div className="podium-rank-2">2</div>
                </div>

                <div className="podium-container" style={ {left: '33%'} }>
                    <img className="podium-image" src={paths[restData[7].restaurant]} alt="logo 1"></img>
                    <div className="podium-rank-1">1</div>
                </div>
                
                <div className="podium-container" style={ {left: '66%'} }>
                    <img className="podium-image" src={paths[restData[5].restaurant]} alt="logo 3"></img>
                    <div className="podium-rank-3">3</div>
                </div>
            </div>
            }
            {restData.length > 0 &&
            <div className="least-nutrient-container">
                <div className="least-nutrient-title">Chain with Lowest {names[nutrient_ind].name} per Item</div>
                <img className="least-nutrient-image" src={paths[restData[0].restaurant]} alt="logo least"></img>
            </div>
            }


            <div className="nutrient-tables">
                    <div className="nutrient-table-title1">Items with most {names[nutrient_ind].name}:</div>
                    <div className="nutrient-table-div1"> 
                        <table className="nutrient-item-table">
                            <thead>
                                <tr>
                                <th className="nutrient-header">Restaurant</th>
                                    <th className="nutrient-header">Item</th>
                                    <th>{names[nutrient_ind].name}</th>
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
                                            <td style={ {backgroundColor: `${back}`} }>{item.restaurant}</td>
                                            <td style={ {backgroundColor: `${back}`} }>{item.item}</td>
                                            <td style={ {backgroundColor: `${back}`} }>{item[nutrient]} {names[nutrient_ind].meas}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="nutrient-table-title2">Items with least {names[nutrient_ind].name}:</div>
                    <div className="nutrient-table-div2">
                        
                        <table className="nutrient-item-table">
                            <thead>
                                <tr>
                                    <th className="nutrient-header">Restaurant</th>
                                    <th className="nutrient-header">Item</th>
                                    <th>{names[nutrient_ind].name}</th>
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
                                        <td style={ {backgroundColor: `${back}`} }>{item.restaurant}</td>
                                        <td style={ {backgroundColor: `${back}`} }>{item.item}</td>
                                        <td style={ {backgroundColor: `${back}`} }>{item[nutrient]} {names[nutrient_ind].meas}</td>
                                    </tr>
                                    )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
        </div>
    )
}

export default Nutrient;