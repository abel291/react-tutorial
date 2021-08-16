import React from "react"
import dataInit from "../helpers/dataInit"
import { CheckCircleIcon } from '@heroicons/react/solid'
export default function Step5Complete({ data, setData, formatNumber }) {
    const handleResetData  = ()=>{
        setData(dataInit)
    }
    return (
        <>
            <div className="max-w-5xl  mx-auto space-y-8 text-sm">
                <div className="space-y-4">
                    <h2 className="text-xl font-medium text-gray-700">Orden Completada</h2>

                    <div className="bg-green-100 p-4 flex space-x-2 rounded-md">
                        <CheckCircleIcon className="h-5 w-5 text-green-400"/>
                        <div className="text-green-700">
                            <span className="font-semibold block text-green-700">Orden completada</span>
                            <span className="text-green-600"> Todo los datos han sido enviados a tu correo</span>
                        </div>
                    </div>

                    <div className="flex item-stretch  divide-x divide-gray-200">
                        <div className="pr-5">
                            <span className=" uppercase text-xs text-gray-700">numero de orden</span>
                            <div className=" font-semibold text-gray-700">{"#" + data.order}</div>
                        </div>
                        <div className="px-5">
                            <span className=" uppercase text-xs text-gray-700">Fecha</span>
                            <div className=" font-semibold text-gray-700">{data.create_date}</div>
                        </div>
                        <div className="px-5">
                            <span className=" uppercase text-xs text-gray-700">total</span>
                            <div className=" font-semibold text-gray-700">{formatNumber(data.totalPrice)}</div>
                        </div>
                        <div className="px-5">
                            <span className=" uppercase text-xs text-gray-700">metodo de pago</span>
                            <div className=" font-semibold text-gray-700">Targeta de credito</div>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-4 text-gray-700">
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
                            <div className="flex justify-between">
                                <span className="text-gray-500">Sub-total</span>
                                <span>{formatNumber(data.subTotalPrice)}</span>
                            </div>
                            {data.discount.amount && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Descuento {data.discount.percent + "%"}</span>
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
                </div>
                <div className="flex justify-end space-x-3">
                    <button onClick={handleResetData}className="btn_back_step_reservation">Volver al inicio</button>
                   
                    
                    <a href={`/report_pdf?order=${data.order}&email=${data.client.email}`} rel="noreferrer" target="_blank" className="btn_next_step_reservation">
                        Ver comprobante
                    </a>
                </div>
            </div>
        </>
    )
}
