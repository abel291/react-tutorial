import React from "react"

import ValidaterErrors from "../components/ValidaterErrors"
import { useReservation } from "../context/ReservationContext"
import apiClient from "../auth/apiClient"
import { useAuth } from "../context/AuthContext";

export default function Step3Complements() {
    const {verifyAuthenticationError} =useAuth();
    const { data, updateData, formatNumber, setErrors, setIsLoading } = useReservation()

    const handleChecked = (checked, idComplements) => {
        if (checked) {
            data.complementsIds.push(idComplements)
        } else {
            data.complementsIds = data.complementsIds.filter((x) => x !== idComplements)
        }
        updateData("complementsIds", data.complementsIds)
    }
    const handleNextStep = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors([])

        await apiClient
            .post("/api/reservation/step_3_confirmation", {
                start_date: data.startDate.toISOString().slice(0, 10), //format date 2020-12-12
                end_date: data.endDate.toISOString().slice(0, 10),
                adults: data.adults,
                kids: data.kids,
                night: data.night,
                room_id: data.roomSelected.id,
                room_quantity: data.roomQuantity,
                ids_complements_cheked: data.complementsIds,
            })
            .then((response) => {
                updateData("complementsSelect", response.data.complements_cheked)
                updateData("pricePorReservation", response.data.price_per_reservation)
                updateData("subTotalPrice", response.data.total_price)
                updateData("totalPrice", response.data.total_price)

                if (response.data.discount) {
                    updateData("discount", response.data.discount)
                }

                updateData("step", 4)
            })
            .catch(function (error) {
                verifyAuthenticationError(error)
                let msgErrors = ValidaterErrors(error)
                setErrors(msgErrors)
            })
            .then(function () {
                setIsLoading(false)
            })
    }
    return (
        <>
            <div className="mx-auto max-w-5xl space-y-4 sm:space-y-8">
                <h2 className="text-2xl font-bold text-gray-700">Agregue complementos adicionale</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.roomSelected.complements.map((complement) => (
                        <div
                            key={data.roomSelected.id + "-" + complement.id}
                            className="flex item-start shadow p-4 rounded space-x-3 bg-white border border-gray-50"
                        >
                            <div>
                                <input
                                    onClick={(e) => handleChecked(e.target.checked, complement.id)}
                                    type="checkbox"
                                    id={complement.id}
                                    className="form-checkbox  focus:ring-yellow-500 h-5 w-5 text-yellow-600 border-gray-300 rounded"
                                    value={complement.id}
                                    defaultChecked={data.complementsIds.includes(complement.id)}
                                />
                            </div>
                            <div className="flex flex-col text-gray-700 ">
                                <label htmlFor={complement.id}>
                                    <span className="font-bold ">{complement.name}</span>
                                    <p className="text-sm text-gray-400">{complement.description_min}</p>
                                    <div className="mt-3 ">
                                        <span className="font-bold text-lg">{formatNumber(complement.price)}</span>
                                        <span className="text-sm">
                                            {complement.type_price === "reservation" ? " por reservacion" : " por noche"}
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3 justify-end">
                    <button onClick={() => updateData("step", 2)} className="btn_back_step_reservation">
                        Volver
                    </button>

                    <button onClick={handleNextStep} className="btn_next_step_reservation">
                        Confirmar Datos
                    </button>
                </div>
            </div>
        </>
    )
}
