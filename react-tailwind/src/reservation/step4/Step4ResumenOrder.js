import axios from "../../helpers/axios"
import React, { useState } from "react"
import ValidaterErrors from "../../components/ValidaterErrors"

export default function Step4ResumenOrder({ data, handleSubmit, stripe, formatNumber, updateData }) {
    const [discountInput, setDiscountInput] = useState("")

    const handleClickApplyCodeDiscount = async (e) => {
        if (!discountInput) {
            return
        }
        e.preventDefault()
        updateData("isLoading", true)
        updateData("errors", [])
        console.log(data.discount.code)
        try {
            const response = await axios.post("/reservation/step_3_confirmation", {
                start_date: data.startDate.toISOString().slice(0, 10), //format date 2020-12-12
                end_date: data.endDate.toISOString().slice(0, 10),
                adults: data.adults,
                kids: data.kids,
                night: data.night,
                room_id: data.roomSelected.id,
                room_quantity: data.roomQuantity,
                ids_complements_cheked: data.complementsIds,
                code: discountInput,
            })
            updateData("complementsSelect", response.data.complements_cheked)
            updateData("pricePorReservation", response.data.price_per_reservation)
            updateData("subTotalPrice", response.data.sub_total_price)
            updateData("totalPrice", response.data.total_price)

            if (response.data.discount) {
                updateData("discount", response.data.discount)
            }
        } catch (errors) {
            updateData("totalPrice", data.subTotalPrice)
            updateData("discount", {
                code: "",
                amount: "",
                percent: "",
            })
            ValidaterErrors(errors.response, updateData)
        } finally {
            updateData("isLoading", false)
        }
    }

    return (
        <>
            <h2 className="text-xl font-medium mb-4 text-gray-800">Resumen de pedido</h2>
            <div className=" text-sm bg-white border border-gray-200 rounded shadow-sm divide-y divide-gray-200 ">
                <div className="px-6 py-4 space-y-2">
                    <h3 className="font-bold text-center mb-2">Reserva</h3>
                    <div className="flex justify-between">
                        <span>Entrada</span>
                        <span>{data.startDate.toISOString().slice(0, 10)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Slaida</span>
                        <span>{data.endDate.toISOString().slice(0, 10)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Adultos</span>
                        <span>{data.adults}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Niños</span>
                        <span>{data.kids}</span>
                    </div>
                </div>
                <div className="px-6 py-4 space-y-2">
                    <h3 className="font-bold text-center mb-2">Habitacion</h3>
                    <div className="flex justify-between">
                        <span>Habitacion</span>
                        <span>{data.roomSelected.name}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Noches</span>
                        <span>{data.night}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Precio por noche</span>
                        <span>{formatNumber(data.roomSelected.price)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Habitaciones</span>
                        <span>{data.roomQuantity}</span>
                    </div>

                    {(data.night > 1 || data.roomQuantity > 1) && (
                        <div className="flex justify-between">
                            <span>Precio total por habitaciones</span>
                            <span>{formatNumber(data.pricePorReservation)}</span>
                        </div>
                    )}
                </div>
                {data.complementsSelect.length > 0 && (
                    <div className="px-6 py-4 space-y-2">
                        <h3 className="font-bold text-center mb-2">Complementos</h3>
                        {data.complementsSelect.map((com) => (
                            <div key={com.id} className="flex justify-between ">
                                <span className="">{com.name}</span>
                                <span>{formatNumber(com.total_price)}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="px-6 py-4 space-y-2  font-semibold ">
                    <div className="mb-10 font-normal text-sm ">
                        <label htmlFor="discount_input" className="mb-1 form-input-label">
                            Codigo descuento
                        </label>
                        <div className="flex">
                            <div className="flex-grow pr-2">
                                <input
                                    className="form-input"
                                    id="discount_input"
                                    type="text"
                                    value={discountInput}
                                    onChange={(e) => setDiscountInput(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleClickApplyCodeDiscount}
                                disabled={!discountInput}
                                className={
                                    (discountInput ? "bg-yellow-500 focus:bg-yellow-400" : "bg-yellow-200 cursor-default") +
                                    " px-4 font-semibold  text-white rounded-md text-center focus:outline-none"
                                }
                            >
                                Aplicar
                            </button>
                        </div>

                        <span className="text-xs text-gray-400 font-semibold">{data.discountCodeExmaple.join(" - ")}</span>

                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Sub-total</span>
                        <span>{formatNumber(data.subTotalPrice)}</span>
                    </div>
                    {data.discount.amount && (
                        <div className="flex justify-between">
                            <span className="text-gray-500">Descuento {data.discount.percent+'%'}</span>
                            <span>{formatNumber(-data.discount.amount)}</span>
                        </div>
                    )}
                </div>
                <div className="px-6 py-6 space-y-2">
                    <div className="flex justify-between font-bold text-lg">
                        <span className="">Total</span>
                        <span>{formatNumber(data.totalPrice)}</span>
                    </div>
                </div>
                
            </div>
        </>
    )
}
