
import React, { Fragment, useState } from 'react';

import './App.css';
import TemperatureInput from './components/TemperatureInput';

function App() {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };
  const [scale, setScale] = useState('c')
  const [temperature, setTemperature] = useState(0)

  const convertTemperature = (temperature, scale) => {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    let temperatureConvert = 0
    if (scale === 'c') {
      temperatureConvert = (temperature - 32) * 5 / 9;
    } else {
      temperatureConvert = (temperature * 9 / 5) + 32;
    }

    const rounded = Math.round(temperatureConvert * 1000) / 1000;
    return rounded.toString();

  }
  const handleCelsiusChange = (temperature) => {
    setTemperature(temperature);
    setScale('c');
  }

  const handleFahrenheitChange = (temperature) => {
    setTemperature(temperature);
    setScale('f');
  }
  const celsius = scale === 'f' ? convertTemperature(temperature, scale) : temperature;
  const fahrenheit = scale === 'c' ? convertTemperature(temperature, scale) : temperature;
  return (
    <>
      <div>
        
        <span style={{display:'block','marginTop':20}}> {scaleNames['c']} </span>
        
        <TemperatureInput
          scale='c'
          temperature={celsius}
          onTemperatureChange={handleCelsiusChange} />
      </div>
      <div>
        
        <span style={{display:'block','marginTop':20}}> {scaleNames['f']} </span>
        
        <TemperatureInput
          scale='c'
          temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange} />
      </div>
    </>
  );
}

export default App;
