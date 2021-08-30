import React, { useRef } from "react"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_green.css"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import ValidaterErrors from "../../components/ValidaterErrors.js"

import { useReservation } from "../../context/ReservationContext.js"

import apiClient from "../../auth/apiClient"
export default function Step4Form() {
    const { data, updateData, setErrors, setIsLoading } = useReservation()

    const handleChangeInput = (e) => {
        let dataClient = { ...data.client, [e.target.name]: e.target.value }
        updateData("client", dataClient)
    }

    const nameCardStripe = useRef()
    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async (e) => {
        // Block native form submission.
        e.preventDefault()
        setErrors([])
        let nameCardInpu = nameCardStripe.current.value

        if (!nameCardInpu) {
            setErrors(["El nombre del titular de la targeta es requerido"])
            return
        }
        setIsLoading(true)

        if (!stripe || !elements) {
            // Stripe.js aún no se ha cargado. Asegúrate de deshabilitar
            // envío del formulario hasta que se haya cargado Stripe.js.
            return
        }

        // Obtenga una referencia a un CardElement montado
        const cardElement = elements.getElement(CardElement)

        //Use su elemento de tarjeta con otras API de Stripe.js
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: { name: nameCardInpu },
        })

        if (error) {
            setIsLoading(false)
            console.log("[error]", error)
            if (error.type === "validation_error") {
                setErrors(error.message)
            } else {
                setErrors("Al parecer hubo un error! El pago a través de su targeta no se pudo realizar.")
            }
        } else {
            //console.log("[PaymentMethod]", paymentMethod)
            await apiClient
                .post("/api/reservation/step_4_finalize", {
                    start_date: data.startDate.toISOString().slice(0, 10), //format date 2020-12-12
                    end_date: data.endDate.toISOString().slice(0, 10),
                    adults: data.adults,
                    kids: data.kids,
                    night: data.night,
                    room_id: data.roomSelected.id,
                    room_quantity: data.roomQuantity,
                    ids_complements_cheked: data.complementsIds,
                    methodpayment: paymentMethod.id,
                    client: data.client,
                    email_confirmation: data.client.email_confirmation,
                    code: data.discount.code,
                })
                .then((response) => {
                    updateData("order", response.data.order)
                    updateData("create_date", response.data.create_date)
                    updateData("step", 5)
                })
                .catch(function (errors) {
                    let msgErrors = ValidaterErrors(errors)
                    setErrors(msgErrors)
                })
                .then(function () {
                    setIsLoading(false)
                })
        }
    }
    return (
        <>
            <div>
                {/* <h2 className="text-2xl font-medium mb-4 text-gray-800">Informacion de Contacto</h2> */}
                <div className="space-y-6">
                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                        {/* <div>
                            <label htmlFor="name" className="form-input-label">
                                Nombre y apellido
                            </label>
                            <input
                                className="mt-1 form-input form-input-border-normal "
                                name="name"
                                id="name"
                                type="text"
                                defaultValue={data.client.name}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="form-input-label">
                                Telefono
                            </label>
                            <input
                                className="mt-1 form-input form-input-border-normal "
                                name="phone"
                                id="phone"
                                type="text"
                                defaultValue={data.client.phone}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="form-input-label">
                                Email
                            </label>
                            <input
                                defaultValue={data.client.email}
                                onChange={handleChangeInput}
                                className="mt-1 form-input form-input-border-normal "
                                name="email"
                                id="email"
                                type="email"
                            />
                        </div>

                        <div>
                            <label htmlFor="email_confirmation" className="form-input-label">
                                Confirmar email
                            </label>
                            <input
                                className="mt-1 form-input form-input-border-normal "
                                name="email_confirmation"
                                id="email_confirmation"
                                type="email"
                                defaultValue={data.client.email}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div>
                            <label htmlFor=" country" className="form-input-label">
                                Pais
                            </label>
                            <input
                                className="mt-1 form-input form-input-border-normal "
                                name="country"
                                id="country"
                                type="text"
                                defaultValue={data.client.country}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div>
                            <label htmlFor="city" className="form-input-label">
                                Ciudad
                            </label>
                            <input
                                className="mt-1 form-input form-input-border-normal "
                                name="city"
                                id="city"
                                type="text"
                                defaultValue={data.client.city}
                                onChange={handleChangeInput}
                            />
                        </div> */}

                        <div>
                            <label htmlFor="check_in" className="block font-semibold text-sm text-gray-600">
                                Hora de llegada
                            </label>
                            <Flatpickr
                                name="check_in"
                                className="mt-1 form-input form-input-border-normal "
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "G:i K",
                                    time_24hr: false,
                                    defaultDate: data.client.check_in,
                                }}
                                onChange={(date) => {
                                    let hour = date[0].toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
                                    updateData("client", { ...data.client, check_in: hour })
                                }}
                            />
                        </div>

                        <div className="special_request  sm:col-span-2">
                            <label htmlFor="special_request" className="form-input-label">
                                Peticion especial
                            </label>

                            <textarea
                                name="special_request"
                                id="special_request"
                                rows="5"
                                className="mt-1 form-input form-input-border-normal "
                                placeholder="Algo a tener en cuenta...."
                                defaultValue={data.client.special_request}
                                onChange={handleChangeInput}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b border-gray-200"></div>
            <div>
                <h2 className="text-xl font-medium mb-4 text-gray-800">Pago</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="titleCard" className="form-input-label">
                            Titular de la targeta
                        </label>
                        <input
                            className="mt-1 form-input form-input-border-normal"
                            id="titleCard"
                            type="text"
                            ref={nameCardStripe}
                            defaultValue={data.client.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="form-input-label">
                            Targeta de credito
                        </label>
                        <div className="px-3 py-2.5 bg-white mt-1 border border-gray-300 rounded-md shadow-sm ">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            color: "#303238",
                                            fontSize: "14px",
                                            fontFamily: '"Open Sans", sans-serif',
                                            fontSmoothing: "antialiased",
                                            "::placeholder": {
                                                color: "#CFD7DF",
                                            },
                                        },
                                        invalid: {
                                            color: "#e5424d",
                                            ":focus": {
                                                color: "#303238",
                                            },
                                        },
                                    },
                                }}
                            ></CardElement>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap space-y-3 md:space-y-0 md:space-x-3 justify-end">
                <button onClick={() => updateData("step", 3)} className="btn_back_step_reservation">
                    Volver
                </button>

                <button onClick={handleSubmit} disabled={!stripe} className="btn_next_step_reservation">
                    Confirmar orden
                </button>
            </div>
        </>
    )
}
