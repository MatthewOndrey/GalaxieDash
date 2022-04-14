import React, { useState, useEffect } from "react";
import Speedometer from './Speedometer.js';
import Fuel from './Fuel.js';
import '../styles/Dashboard.css';

const Dashboard = () => {


    const [currentSpeed,setCurrentSpeed] = useState(0);
    const [currentFuel,setCurrentFuel] = useState(0);
    const [currentTick, setCurrentTick] = useState(0);
    const [currentDirection, setCurrentDirection] = useState(1);

    useEffect(() => {
        var timerID = setInterval( () => tick() ,1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const getspeed = () => {
        fetch(
            'http://192.168.1.28:5000/api/getspeed', {method: 'GET'}
        ).then(
            (response) => {
                return response.json()

            }
        ).then(
            (response) => {
                setCurrentSpeed(response.currentspeed);
            }
        );
    };

    const getfuel = () => {
        fetch(
            'http://192.168.1.28:5000/api/getfuel', {method: 'GET'}
        ).then(
            (response) => {
                return response.json()

            }
        ).then(
            (response) => {
                setCurrentFuel((~~(response.currentfuel/100))/100);
                console.log(currentFuel, response.currentfuel)
            }
        );
    };

    function tick() {
            getspeed();
            getfuel();
            return
        if (currentTick >= 0) {
            setCurrentTick(currentTick + currentDirection);
            setCurrentSpeed(currentTick);
        }

        if (currentTick >= 119) {
            setCurrentDirection(-1);
            return
        };

        if (currentTick === 0) {
            setCurrentTick(1);
            setCurrentDirection(1);
            return
        }
    }

    return (
        <>
            <header className="App-header">
                <Fuel percentFuel={currentFuel} />
                <Speedometer currentSpeed={currentSpeed} />
            
            </header>
        </>
    )

}

export default Dashboard;