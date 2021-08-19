import React, { useState } from "react"
import Step4ClientInput from "./Step4ClientInput.js"
import Step4ResumenOrder from "./Step4ResumenOrder.js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
export default function Step4Client({ data, updateData, formatNumber }) {
    const [stripePromise] = useState(() => loadStripe("pk_test_ejdWQWajqC4QwST95KoZiDZK"))
    return (
        <>
            <div className="max-w-5xl mx-auto text-gray-700">
                <div className="flex flex-wrap space-y-7 md:space-y-0">
                    
                    <div className="w-full lg:w-1/2 lg:pr-6">
                        <Step4ResumenOrder data={data} updateData={updateData} formatNumber={formatNumber} />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-6 ">
                        <Elements stripe={stripePromise}>
                            <Step4ClientInput data={data} updateData={updateData} /*include input validation stripe*//>
                        </Elements>
                    </div>
                </div>
            </div>
        </>
    )
}
