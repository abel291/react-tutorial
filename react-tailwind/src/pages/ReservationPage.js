import React from "react"

import Step1Date from "../reservation/Step1Date"
import Step2Rooms from "../reservation/Step2Rooms"
import Step3Complements from "../reservation/Step3Complements"
import Step4 from "../reservation/step4/Step4"
import Step5Complete from "../reservation/Step5Complete"

import NotificationError from "../components/NotificationError"
import { Transition } from "@headlessui/react"
import { useReservation } from "../context/ReservationContext"



function ReservationPage() {
    const { data,setData, errors, setErrors } = useReservation()
    // const ComponentStep=[
    //     Step1Date,
    //     Step2Rooms,
    //     Step3Complements,
    //     Step4,
    //     Step5Complete
    // ]
    return (
        <div className="container min-h-screen mx-auto py-12 relative">
            <NotificationError errors={errors} setErrors={setErrors}></NotificationError>
            {data.step === 1 && <Step1Date />}
            {data.step === 2 && <Step2Rooms />}
            {data.step === 3 && <Step3Complements />}
            {data.step === 4 && <Step4 />}
            {data.step === 5 && <Step5Complete />}
        </div>
    )
}

export default ReservationPage
