import axios from "../../../helpers/axios"
import React, { useState } from "react"
import ValidaterErrors from "../../../components/ValidaterErrors"
import TableData from "../TableData"

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
            <h2 className="text-2xl font-medium mb-4 text-gray-800">Resumen de pedido</h2>
            <TableData data={data} formatNumber={formatNumber}>
                {/* input code discount */}
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

                    <span className="text-xs text-gray-400 font-semibold uppercase">{data.discountCodeExmaple.join(" - ")}</span>
                </div>
            </TableData>
        </>
    )
}
