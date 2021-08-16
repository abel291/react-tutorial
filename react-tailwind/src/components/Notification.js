import { Transition } from "@headlessui/react"
import { useEffect } from "react"
import { XCircleIcon,XIcon } from '@heroicons/react/solid'
export default function Notification({ errors, updateData }) {
    
    useEffect(()=>{
        if(errors.length !== 0){
            document.getElementById("root").scrollIntoView({ behavior: "smooth" })
            updateData('isLoading',false)
        }
    },[errors])


    return (
        <Transition
            show={errors.length !== 0}
            enter="transform transition duration-150"
            enterFrom="opacity-0  scale-95"
            enterTo="opacity-100 scale-100"
            leave="transform transition duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div className="flex max-w-2xl mx-auto w-full bg-red-100 rounded-md p-4 mb-10">
                <div>
                    <XCircleIcon className="h-5 w-5 text-red-500" />                      
                </div>
                <div className="px-4 flex-grow">
                    <span className="text-red-700 font-semibold">Tienes Errores por revisar </span>
                    <ul className="list-disc text-red-600">
                        {
                        Array.isArray(errors) 
                            ? errors.map((msg, i) => <li key={i}>{msg}</li>) 
                            : <li>{errors}</li>
                        }
                    </ul>
                </div>
                <div>
                    <button onClick={(e) => updateData("errors", [])} className="outline-none focus:outline-none">
                        <XIcon className="h-5 w-5 text-red-500"/>                        
                    </button>
                </div>
            </div>
        </Transition>
    )
}
