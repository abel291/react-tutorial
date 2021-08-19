import React from "react"
import dataInit from "../../helpers/dataInit"
import { CheckCircleIcon } from "@heroicons/react/solid"
import TableData from "./TableData"
export default function Step5Complete({ data, setData, formatNumber }) {
    const handleResetData = () => {
        setData(dataInit)
    }
    return (
        <>
            <div className="max-w-3xl  mx-auto  space-y-4 md:space-y-8 text-sm">
                <div className="space-y-4">
                    <h2 className="text-2xl font-medium text-gray-700">Orden Completada</h2>

                    <div className="bg-green-100 p-2 md:p-4 flex space-x-2 rounded-md">
                        <CheckCircleIcon className="h-5 w-5 text-green-400" />
                        <div className="text-green-700">
                            <span className="font-semibold block text-green-700">Orden completada</span>
                            <span className="text-green-600"> Todo los datos han sido enviados a tu correo</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap item-stretch  sm:divide-x divide-gray-200 space-y-3 sm:space-y-0">
                        <div className="w-full md:w-auto md:pr-5">
                            <span className=" uppercase text-xs text-gray-700">numero de orden</span>
                            <div className=" font-semibold text-gray-700">{"#" + data.order}</div>
                        </div>
                        <div className="w-full md:w-auto md:px-5">
                            <span className=" uppercase text-xs text-gray-700">Fecha</span>
                            <div className=" font-semibold text-gray-700">{data.create_date}</div>
                        </div>
                        <div className="w-full md:w-auto md:px-5">
                            <span className=" uppercase text-xs text-gray-700">total</span>
                            <div className=" font-semibold text-gray-700">{formatNumber(data.totalPrice)}</div>
                        </div>
                        <div className="w-full md:w-auto md:px-5">
                            <span className=" uppercase text-xs text-gray-700">metodo de pago</span>
                            <div className=" font-semibold text-gray-700">Targeta de credito</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 text-gray-700">
                    <h2 className="text-xl font-medium mb-4 text-gray-800 ">Resumen de pedido</h2>
                    <TableData data={data} formatNumber={formatNumber} />
                </div>
                <div className="flex flex-col md:flex-row justify-end md:space-x-3 space-y-2 md:space-y-0">
                    <button onClick={handleResetData} className="btn_back_step_reservation">
                        Volver al inicio
                    </button>

                    <a
                        className="w-full sm:w-auto btn_next_step_reservation"
                        href={process.env.REACT_APP_API_URL+`/reservation/report_pdf?order=${data.order}&email=${data.client.email}`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        Ver comprobante
                    </a>
                </div>
            </div>
        </>
    )
}
