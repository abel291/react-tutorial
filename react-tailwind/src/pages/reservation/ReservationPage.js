import React, { useState, useEffect } from "react"

import Step1Date from "./Step1Date"
import Step2Rooms from "./Step2Rooms"
import Step3Complements from "./Step3Complements"
import Step4 from "./step4/Step4"
import Step5Complete from "./Step5Complete"

import Loading from "../../components/Loading"
import Notification from "../../components/Notification"
import { Transition } from "@headlessui/react"
import dataInit from "../../helpers/dataInit"


function ReservationPage() {
    const [data, setData] = useState(dataInit)

    useEffect(() => {
        //step 1
        if (data.step === 1) {
            
        }
    }, [data.step])

    const currencyFormat = Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    const formatNumber = (n) => {
        n = n ? n : 0 // number NaN = 0
        return "$ " + currencyFormat.format(parseFloat(n))
    }

    function updateData(type, value) {
        setData((prevData) => ({ ...prevData, [type]: value }))
    }

    return (
        <div className="container min-h-screen mx-auto py-12">
            <Loading isLoading={data.isLoading}></Loading>
            <Notification errors={data.errors} updateData={updateData}></Notification>

            <Transition
                show={data.step === 1}
                enter="transform transition duration-150"
                enterFrom="opacity-0  scale-95"
                enterTo="opacity-100 scale-100"
            >
                <Step1Date data={data} updateData={updateData} formatNumber={formatNumber} />
            </Transition>

            <Transition
                show={data.step === 2}
                enter="transform transition duration-150"
                enterFrom="opacity-0  scale-95"
                enterTo="opacity-100 scale-100"
            >
                <Step2Rooms data={data} updateData={updateData} formatNumber={formatNumber} />
            </Transition>

            <Transition
                show={data.step === 3}
                enter="transform transition duration-150"
                enterFrom="opacity-0  scale-95"
                enterTo="opacity-100 scale-100"
            >
                <Step3Complements data={data} updateData={updateData} formatNumber={formatNumber} />
            </Transition>

            <Transition
                show={data.step === 4}
                enter="transform transition duration-150"
                enterFrom="opacity-0  scale-95"
                enterTo="opacity-100 scale-100"
            >
                <Step4 data={data} updateData={updateData} formatNumber={formatNumber} />
            </Transition>

            <Transition
                show={data.step === 5}
                enter="transform transition duration-150"
                enterFrom="opacity-0  scale-95"
                enterTo="opacity-100 scale-100"
            >
                <Step5Complete data={data} setData={setData} formatNumber={formatNumber} />
            </Transition>
        </div>
    )
}

export default ReservationPage
