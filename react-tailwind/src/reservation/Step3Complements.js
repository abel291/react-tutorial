import React from "react"
import axios from "axios"
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
                "http://hotel-cartagena.test/api/reservation/step_3_confirmation",
                {
                    room_id: data.roomSelected.id,
                    room_quantity: data.roomQuantity,
                    ids_complements_cheked: data.complementsIds,
                }
            )

            updateData("complementsSelect", response.data.complements_cheked)
            updateData("pricePorReservation", response.data.sub_total_price)
            updateData("subTotalPrice", response.data.sub_total_price)
            updateData("totalPrice", response.data.total_price)
            updateData("step", 4)
            
        } catch (errors) {
            updateData("errors", errors)
        } finally {
            updateData("isLoading", false)
        }
    }
    return (
        <>
            <div className="mx-auto max-w-5xl space-y-8">
                <h2 className="text-3xl font-bold text-gray-700">
                    Agregue complementos adicionale
                </h2>

                <div className="grid grid-cols-2 gap-3">
                    {data.roomSelected.complements.map((complement) => (
                        <div
                            key={data.roomSelected.id + "-" + complement.id}
                            className="flex item-start border border-gray-200 p-4 rounded-md space-x-3"
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

                <div className="flex space-x-3 justify-end">
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
