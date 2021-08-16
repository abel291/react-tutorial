import React, { useState } from "react"
import Step4ClientInput from "./Step4ClientInput.js"
import Step4ResumenOrder from "./Step4ResumenOrder.js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
export default function Step4Client({ data, updateData, formatNumber }) {
    const [stripePromise] = useState(() => loadStripe("pk_test_ejdWQWajqC4QwST95KoZiDZK"))
    return (
        <>
            <div className="max-w-5xl mx-auto space-y-10 text-gray-700 mb-32">
                <div className="flex flex-wrap space-y-10 md:space-y-0">
                    <div className="w-full md:w-1/2  space-y-6 ">
                        <Elements stripe={stripePromise}>
                            <Step4ClientInput data={data} updateData={updateData} /*include input validation stripe*//>
                        </Elements>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-6">
                        <Step4ResumenOrder data={data} updateData={updateData} formatNumber={formatNumber} />
                    </div>
                </div>
            </div>
        </>
    )
}
