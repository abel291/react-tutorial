import React, { useEffect, useContext } from "react"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_green.css"
import { Spanish } from "flatpickr/dist/l10n/es.js"

import ValidaterErrors from "../components/ValidaterErrors"
import { useReservation } from "../context/ReservationContext"
import apiClient from "../auth/apiClient"
import { useAuth } from "../context/AuthContext"

function Step1Date() {
    const { verifyAuthenticationError } = useAuth()
    const { data, updateData, setErrors, setIsLoading } = useReservation()

    const optionInputDate = {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        firstDayOfWeek: 1,
        locale: Spanish,
    }

    const handleChange = (e) => {
        updateData(e.target.name, e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors([])

        await apiClient
            .post("/api/reservation/step_1_check_date", {
                start_date: data.startDate.toISOString().slice(0, 10), //format date 2020-12-12
                end_date: data.endDate.toISOString().slice(0, 10),
                adults: data.adults,
                kids: data.kids,
            })
            .then((response) => {
                updateData("rooms", response.data.rooms)
                updateData("night", response.data.night)
                updateData("client", response.data.client)
                updateData("step", 2)
                updateData("discountCodeExmaple", response.data.discount_code_exmaple)
            })
            .catch(function (error) {
                verifyAuthenticationError(error)
                let errorsMsg = ValidaterErrors(error)
                setErrors(errorsMsg)
            })
            .then(function () {
                setIsLoading(false)
            })
    }

    return (
        <>
            <div className>
                <div className="max-w-2xl mx-auto  text-gray-700 space-y-4 sm:space-y-8 ">
                    <h2 className="text-2xl font-semibold">Elija las Fechas</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap ">
                            <div className="w-full sm:w-1/2 space-y-1 ">
                                <label className="block font-semibold text-gray-600 " htmlFor="start_date">
                                    Fecha de inicio
                                </label>
                                <Flatpickr
                                    name="startDate"
                                    value={data.startDate}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
                                    options={{
                                        ...optionInputDate,
                                        minDate: "today",
                                    }}
                                    onChange={(date) => {
                                        let dateSelected = date[0]
                                        updateData("startDate", dateSelected)
                                        if (dateSelected >= data.endDate) {
                                            let addDays = dateSelected.fp_incr(1)
                                            updateData("endDate", addDays)
                                        }
                                    }}
                                />

                                <span className="pl-1 text-red-500 text-sm block"></span>
                            </div>

                            {/* input fecha final */}
                            <div className="w-full sm:w-1/2 space-y-1 sm:pl-3 mt-4 sm:mt-0">
                                <label className="block font-semibold text-gray-600 " htmlFor="end_date">
                                    Fecha de final
                                </label>
                                <Flatpickr
                                    name="endDate"
                                    value={data.endDate}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
                                    options={{
                                        ...optionInputDate,
                                        minDate: data.startDate,
                                    }}
                                    onChange={(date) => updateData("endDate", date[0])}
                                />
                                <span className="pl-1 text-red-500 text-sm block"></span>
                            </div>
                        </div>

                        <div className="flex space-x-3 w-full sm:w-1/2">
                            <div className="w-1/2 space-y-1 ">
                                <label className="  block font-semibold text-gray-600 " htmlFor="adults">
                                    Adultos
                                </label>

                                <select
                                    onChange={handleChange}
                                    value={data.adults}
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
                                    name="adults"
                                >
                                    <option value="1">1 Adulto</option>
                                    <option value="2">2 Adultos</option>
                                    <option value="3">3 Adultos</option>
                                    <option value="4">4 Adultos</option>
                                    <option value="5">5 Adultos</option>
                                    <option value="6">6 Adultos</option>
                                </select>
                                <span className="pl-1 text-red-500 text-sm block"></span>
                            </div>

                            <div className="w-1/2 space-y-1 ">
                                <label className="  block font-semibold text-gray-600 " htmlFor="kids">
                                    Niños
                                </label>

                                <select
                                    onChange={handleChange}
                                    value={data.kids}
                                    name="kids"
                                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none  focus:ring-2 focus:ring-gray-200 focus:border-gray-200 sm:text-sm"
                                >
                                    <option value="0">0 Niños</option>
                                    <option value="1">1 Niño</option>
                                    <option value="2">2 Niños</option>
                                    <option value="3">3 Niños</option>
                                    <option value="4">4 Niños</option>
                                    <option value="5">5 Niños</option>
                                    <option value="6">6 Niños</option>
                                </select>
                                <span x-text="errors.kids" className="pl-1 text-red-500 text-sm block"></span>
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn_next_step_reservation">
                                Chekear disponibilidad
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Step1Date
