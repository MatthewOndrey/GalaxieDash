import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const Speedometer = ({currentSpeed}) => {
    const mileBlockes = [10,20,30,40,50,60,70,80,90,100,110,120,140,160,180];

    const [currentIndex,setCurrentIndex] = useState(1);

    return (
        <>
            <div className="speedometer">
                <div className="textgradient">
                    {mileBlockes.map(function(currentSpoo, index) {
                        if (((index+1)*10) < currentSpeed) {
                            return <div className="speedbox" key={index}>{currentSpoo}</div>;
                            }
                        })}
                    <div className="currentSpeedbox glow"
                      style={{textIndent:currentSpeed>10?((((currentSpeed-1) % 10))*10)-66:20}}>{currentSpeed}
                    </div>
                </div>
            </div>
        </>
    )
}

Speedometer.defaultProps = {
    currentSpeed: 0,
};

Speedometer.propTypes = {
    currentSpeed: PropTypes.number.isRequired,
};

export default Speedometer;