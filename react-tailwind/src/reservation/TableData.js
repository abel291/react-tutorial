
export default function TableData({ data, formatNumber,children},) {
    
    return (
        <div className=" text-sm bg-white border border-gray-200 rounded divide-y divide-gray-200 ">
            <div className="px-3 md:px-6 py-4 space-y-2">
                <h3 className="font-bold text-center mb-2">Reserva</h3>
                <div className="flex justify-between">
                    <span>Entrada</span>
                    <span>{data.startDate.toISOString().slice(0, 10)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Salida</span>
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
            <div className="px-3 md:px-6 py-4 space-y-2">
                <h3 className="font-bold text-center mb-2">Habitacion</h3>
                <div className="flex justify-between">
                    <span>Nombre de habitacion</span>
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
                <div className="px-3 md:px-6 py-4 space-y-2">
                    <h3 className="font-bold text-center mb-2">Complementos</h3>
                    {data.complementsSelect.map((com) => (
                        <div key={com.id} className="flex justify-between ">
                            <span className="">{com.name}</span>
                            <span>{formatNumber(com.total_price)}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="px-3 md:px-6 py-4 space-y-2  font-semibold ">
                {children}

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
            <div className="px-3 md:px-6 py-4 space-y-2">
                <div className="flex justify-between font-bold text-lg">
                    <span className="">Total</span>
                    <span>{formatNumber(data.totalPrice)}</span>
                </div>
            </div>
        </div>
    )
}
