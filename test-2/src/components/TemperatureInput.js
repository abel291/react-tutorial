import React from 'react'

export default function TemperatureInput({ scale, temperature, onTemperatureChange }) {
    
    const handdleInput = (e) => {
        console.log(e.target.value)
        onTemperatureChange(e.target.value)
    }
    return (
        <>
            
            <input onChange={handdleInput} value={temperature} />
        </>
    )
}
