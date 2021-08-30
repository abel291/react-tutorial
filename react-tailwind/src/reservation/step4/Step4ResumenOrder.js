import React, { useState } from "react"
import ValidaterErrors from "../../components/ValidaterErrors"
import TableData from "../TableData"
import { useReservation } from "../../context/ReservationContext"
import apiClient from "../../auth/apiClient"
import { CheckCircleIcon } from "@heroicons/react/solid"
export default function Step4ResumenOrder() {
    const { data, updateData, formatNumber, setErrors, setIsLoading } = useReservation()

    const [discountInput, setDiscountInput] = useState("")

    const handleClickApplyCodeDiscount = async (e) => {
        if (!discountInput) {
            return
        }
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
                code: discountInput,
            })
            .then((response) => {
                updateData("complementsSelect", response.data.complements_cheked)
                updateData("pricePorReservation", response.data.price_per_reservation)
                updateData("subTotalPrice", response.data.sub_total_price)
                updateData("totalPrice", response.data.total_price)

                if (response.data.discount) {
                    updateData("discount", response.data.discount)
                }
            })
            .catch(function (errors) {
                updateData("totalPrice", data.subTotalPrice)
                updateData("discount", {
                    code: "",
                    amount: "",
                    percent: "",
                })
                let msgErrors = ValidaterErrors(errors)
                setErrors(msgErrors)
            })
            .then(function () {
                setIsLoading(false)
            })
    }

    return (
        <>
            
            <TableData data={data} formatNumber={formatNumber}>
                {/* input code discount */}
                <div className="mb-10 font-normal text-sm ">
                    <label htmlFor="discount_input" className="mb-1 form-input-label">
                        Codigo descuento
                        {data.discount.percent && (
                            <div className="ml-2 inline-flex items-center">
                                <span className="text-green-500 text-sm"> Descuento aplicado {data.discount.percent}%</span>
                            </div>
                        )}
                    </label>
                    <div className="flex">
                        <div className="flex-grow pr-2">
                            <input
                                className="mt-1 form-input form-input-border-normal"
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
