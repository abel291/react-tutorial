import React from "react"

export default function Step2Rooms({ data, updateData, formatNumber }) {
    const handleSelectRoom = (idRoom) => {
        
        let roomQuantity = document.getElementById("room_select_quantity_" + idRoom).value
        let roomSelected = data.rooms.find((x) => x.id === idRoom)
        let complements = roomSelected.complements
        let complementsIds = []

        updateData("roomQuantity", roomQuantity)
        updateData("roomSelected", roomSelected)
        updateData("complements", complements)
        updateData("complementsIds", complementsIds)
        updateData("step", 3)
    }

    return (
        <>
            <div className="max-w-5xl mx-auto space-y-8">
                <h2 className="text-4xl font-bold text-gray-700">Elija las Habitaciones</h2>
                <div className="grid grid-cols-6 gap-6">
                    {data.rooms.map((room) => (
                        <div key={room.id} className="col-span-6 md:col-span-3 lg:col-span-2">
                            <div className="shadow-md hover:shadow-xl transition-shadow duration-300  rounded-lg overflow-hidden">
                                <div className="relative overflow-hidden">
                                    <a
                                        href={"/room/" + room.slug}
                                        target="_blank"
                                        className="w-full  "
                                        rel="noreferrer"
                                    >
                                        <img
                                            src={"/img/rooms/thumbnail/" + room.thumbnail}
                                            alt={room.name}
                                            className="w-full h-64 object-cover transition duration-500 transform hover:scale-110 img-list-room"
                                        />

                                        <div className="text-white leading-tight space-y-1 py-4 px-4 absolute bottom-0 left-0">
                                            <h3 className="font-semibold text-xl">{room.name}</h3>
                                            <p className="text-xl font-light">
                                                <span className="text-2xl font-semibold">
                                                    {room.price}
                                                </span>

                                                <span className="text-base">/ noche</span>
                                            </p>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex flex-wrap p-4  text-gray-600 border-gray-200 md:border-none border space-y-4">
                                    <div className="flex items-center w-full text-sm space-x-4">
                                        <span className="font-bold">Camas: +{room.beds} </span>
                                        <span className="font-bold">Adultos: +{room.adults} </span>
                                        <span className="font-bold">Niños: +{room.kids} </span>
                                    </div>

                                    <div className="w-full">
                                        <select
                                            id={"room_select_quantity_" + room.id}
                                            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                        >
                                            {room.price_per_quantity_room_selected &&
                                                room.price_per_quantity_room_selected.map(
                                                    (price, i) => (
                                                        <option
                                                            key={room.id + "-" + i}
                                                            className="p-1"
                                                            value={i}
                                                        >
                                                            {i + 1 + " - " + formatNumber(price)}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    </div>

                                    <button
                                        onClick={() => handleSelectRoom(room.id)}
                                        className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-full focus:outline-none "
                                    >
                                        Reservar
                                    </button>
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
                </div>
            </div>
        </>
    )
}
