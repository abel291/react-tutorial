import React, { useState, useEffect } from "react"

import Step1Date from "./reservation/Step1Date"
import Step2Rooms from "./reservation/Step2Rooms"
import Step3Complements from "./reservation/Step3Complements"
import Step4Client from "./reservation/Step4Client"
//import Step5complete from "./reservation/Step5complete"

import Loading from "./components/Loading"
function App() {
    const [data, setData] = useState({
        step: 1,
        isLoading: false,
        errors: [],
        
        //step 1
        startDate: "",
        endDate: "",
        adults: 1,
        kids: 0,

        //step 2
        rooms: [],
        night: 0,
        roomQuantity:0,
        roomSelected:{},
        complements:[],

        //step 3
        complementsIds:[],
        //step 4

        pricePorReservation:0,
        subTotalPrice:0,
        totalPrice:0,
        complementsSelect:[]

        //helpers
        
})

    
    //init
    useEffect(() => {
        //step 1
        let startDate = new Date(new Date().toDateString())
        let endDate = new Date(new Date().toDateString())
        endDate.setDate(endDate.getDate() + 1) // addDays +1
        updateData("endDate", endDate)
        updateData("startDate", startDate)

        
    }, [])

    const currencyFormat = Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    const formatNumber=(n)=> {
        n = n ? n : 0;// number NaN = 0
        return '$ ' + currencyFormat.format(parseFloat(n))
    }

    function updateData(type, value) {
        
        setData((prevData) => ({ ...prevData, [type]: value }))
        
    }

    return (
        <>
            <div className="container min-h-screen mx-auto pt-32">
                {data.step === 1 && <Step1Date data={data} updateData={updateData} formatNumber={formatNumber} />}

                {data.step === 2 && <Step2Rooms data={data} updateData={updateData} formatNumber={formatNumber} />}

                {data.step === 3 && <Step3Complements data={data} updateData={updateData} formatNumber={formatNumber} />}

                {data.step === 4 && <Step4Client data={data} updateData={updateData} formatNumber={formatNumber} />}

            </div>
            <Loading isLoading={data.isLoading}></Loading>
        </>
    )
}

export default App
