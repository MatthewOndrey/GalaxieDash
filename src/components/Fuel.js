import React from 'react';
import PropTypes from 'prop-types';

import GaugeChart from 'react-gauge-chart'

const Fuel = ({percentFuel}) => {


    const fuelgauge = {
        width:  200
    }

    return (
        <>

                <GaugeChart id="speed"
                            nrOfLevels={4}
                            colors={['purple', '#cc0000','#00cccc', 'green']}
                            percent={percentFuel}
                            hideText={true}
                            arcPadding={0.04}
                            className="fuelgauge"
                            cornerRadius={0}
                            animate={false}
                            needleColor={'white'}
                            needleBaseColor={'silver'}
                            style={fuelgauge}
                />

        </>
    )

}

Fuel.defaultProps = {
    percentFuel: 0,
};

Fuel.propTypes = {
    percentFuel: PropTypes.number.isRequired,
};

export default Fuel;