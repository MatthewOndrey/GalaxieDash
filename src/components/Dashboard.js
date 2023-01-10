import React, { useState, useEffect } from "react";
import Speedometer from './Speedometer.js';
import Fuel from './Fuel.js';
import '../styles/Dashboard.css';
import '../styles/vhs.css';
import speedometer from "./Speedometer.js";
const Dashboard = () => {


    const [currentSpeed,setCurrentSpeed] = useState(0);
    const [currentFuel,setCurrentFuel] = useState(0);
    const [currentTick, setCurrentTick] = useState(0);
    const [currentDirection, setCurrentDirection] = useState(1);

    useEffect(() => {
        var timerID = setInterval( () => tick() ,2000);

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
        const lines2 = document.getElementsByClassName('line2');
        const lines3 = document.getElementsByClassName('line3');
        if(lines.length) {
            for (let i = 0; i < lines.length; i++) {
                document.body.removeChild(lines[i]);
            }
        }
        if(lines2.length) {
            for (let i = 0; i < lines2.length; i++) {
                document.body.removeChild(lines2[i]);
            }
        }
        if(lines3.length) {
            for (let i = 0; i < lines3.length; i++) {
                document.body.removeChild(lines3[i]);
            }
        }

        for(let i = 24; i < 40; i++){
            const line = document.createElement("div");
            line.className = `line line-${i}`;
            line.style.top = `${i * 10}px`;
            const time = Math.random() * 5;
            line.style.animation = `lines ${time}s infinite`;
            document.getElementById("mainbox").appendChild(line) ;
        }

        for(let i = 20; i < 40; i++){
            const line2 = document.createElement("div");
            line2.className = `line2 line-${i}`;
            line2.style.top = `${i * 10}px`;
            const time = Math.random() * 5;
            line2.style.animation = `lines2 ${time}s infinite`;
            document.getElementById("mainbox").appendChild(line2) ;
        }

        for(let i = 22; i < 40; i++){
            const line3 = document.createElement("div");
            line3.className = `line3 line-${i}`;
            line3.style.top = `${i * 10}px`;
            const time = Math.random() * 5;
            line3.style.animation = `lines3 ${time}s infinite`;
            document.getElementById("mainbox").appendChild(line3) ;
        }


    }

    return (
        <>
            <div className="App-header" id="mainbox">
                    <Fuel percentFuel={currentFuel} />
                    <Speedometer currentSpeed={currentSpeed} id="speedometer"/>
            </div>
        </>
    )

}

export default Dashboard;
