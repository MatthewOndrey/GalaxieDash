import React, { useState, useEffect, useCallback } from "react";
import Speedometer from './Speedometer.js';
import Fuel from './Fuel.js';
import '../styles/Dashboard.css';
import '../styles/vhs.css';
import speedometer from "./Speedometer.js";
const Dashboard = () => {

    const speedoFonts = ["days","punkkid","kal","playbill","teaspoon","witless","strenuous"];

    const [currentSpeed,setCurrentSpeed] = useState(0);
    const [currentFuel,setCurrentFuel] = useState(0);
    const [currentTick, setCurrentTick] = useState(0);
    const [currentDirection, setCurrentDirection] = useState(1);

    const checkKeyPress = useCallback((e) => {
        const { key, keyCode } = e;
        console.log(key, keyCode);
        document.body.style.setProperty('--speedo-font',speedoFonts[keyCode % speedoFonts.length]);
    },[]);

    useEffect(() => {
        window.addEventListener("keydown", checkKeyPress);
        return () => {
            window.removeEventListener("keydown", checkKeyPress);
        };
    }, [checkKeyPress]);

    useEffect(() => {
        var timerID = setInterval( () => tick() ,400);
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
                //console.log(currentFuel, response.currentfuel)
            }
        );
    };

    function tick() {
            getspeed();
           //getfuel();
            drawLines();
            return
    }

    function getHeight(){
        return window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
    }

    function drawLines(){
        const lines = document.getElementsByClassName('line');
        if(lines.length) {
            for (let i = 0; i < lines.length; i++) {
                document.body.removeChild(lines[i]);
            }
        }

        for(let i = 40; i < 70; i++){
            const line = document.createElement("div");
            line.className = `line line-${i}`;
            line.style.top = `${i * 6}px`;
            const time = Math.random() * 5;
            line.style.animation = `pixels ${time}s infinite`;
            document.getElementById("mainbox").appendChild(line) ;
        }

    }

    return (
        <>
            <div className="mainbox" id="mainbox">
                    <Fuel percentFuel={currentFuel} />
                    <Speedometer currentSpeed={currentSpeed} id="speedometer"/>

            </div>
        </>
    )

}

export default Dashboard;
