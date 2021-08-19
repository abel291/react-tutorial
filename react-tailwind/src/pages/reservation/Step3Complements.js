import React from "react"
import axios from "../../helpers/axios"
import ValidaterErrors from "../../components/ValidaterErrors"

export default function Step3Complements({ data, updateData, formatNumber }) {
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
        updateData("isLoading", true)
        updateData("errors", [])

        try {
            const response = await axios.post(
                "/reservation/step_3_confirmation",
                {
                    start_date: data.startDate.toISOString().slice(0, 10), //format date 2020-12-12
                    end_date: data.endDate.toISOString().slice(0, 10),
                    adults: data.adults,
                    kids: data.kids,
                    night: data.night,
                    room_id: data.roomSelected.id,
                    room_quantity: data.roomQuantity,
                    ids_complements_cheked: data.complementsIds,
                }
            )            
            updateData("complementsSelect", response.data.complements_cheked)
            updateData("pricePorReservation", response.data.price_per_reservation)
            updateData("subTotalPrice", response.data.total_price)
            updateData("totalPrice", response.data.total_price)            
            
            if (response.data.discount) {
                updateData("discount", response.data.discount)
            }
            
            updateData("step", 4)
            
        } catch (errors) {
            ValidaterErrors(errors.response, updateData)
        } finally {
            updateData("isLoading", false)
        }
    }
    return (
        <>
            <div className="mx-auto max-w-5xl space-y-4 sm:space-y-8">
                <h2 className="text-2xl font-bold text-gray-700">
                    Agregue complementos adicionale
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.roomSelected.complements.map((complement) => (
                        <div
                            key={data.roomSelected.id + "-" + complement.id}
                            className="flex item-start shadow p-4 rounded-lg space-x-3 bg-white"
                        >
                            <div>
                                <input
                                    onClick={(e) => handleChecked(e.target.checked, complement.id)}
                                    type="checkbox"
                                    className="form-checkbox  focus:ring-yellow-500 h-5 w-5 text-yellow-600 border-gray-300 rounded"
                                    value={complement.id}
                                />
                            </div>
                            <div className="flex flex-col text-gray-700 ">
                                <span className="font-bold ">{complement.name}</span>
                                <p className="text-sm text-gray-400">
                                    {complement.description_min}
                                </p>
                                <div className="mt-3 ">
                                    <span className="font-bold text-lg">
                                        {formatNumber(complement.price)}
                                    </span>
                                    <span className="text-sm">
                                        {complement.type_price === "reservation"
                                            ? " por reservacion"
                                            : " por noche"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3 justify-end">
                    <button
                        onClick={() => updateData("step", 2)}
                        className="btn_back_step_reservation"
                    >
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
