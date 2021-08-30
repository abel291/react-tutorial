import { useState } from "react"

import BannerTitle from "../components/BannerTitle"
import { useAuth } from "../context/AuthContext"


const HomePage = () => {
    const { pages } = useAuth()
    const [page, setpage] = useState(pages.home)
    console.log(pages)
    return (
        <>  
            
            <BannerTitle img={page.img} title={page.title} BannerTitle={page.sub_title} />

            {/* <div class="container mx-auto max-w-screen-xl -mt-20 md:-mt-16 pb-8 border-gray-300 border-b lg:border-none">
                <form
                    action="/reservation"
                    class="flex flex-col items-center bg-white rounded-t-xl px-5 pt-5 overflow-hidden space-y-5 
                                         lg:space-y-0 lg:space-x-6 lg:flex-row lg:p-8
                                         lg:rounded-lg lg:shadow-lg"
                >
                    <div class="grid-cols-1 w-full    gap-8 grid md:grid-cols-3 text-gray-700 ">
                        <div>
                            <label htmlFor="start_date" class=" font-medium tracking-widest block text-sm">
                                Entrada:
                            </label>
                            <div class="lg:flex lg:items-center">
                                <input class="mt-1 form-input form-input-border-normal " type="text" name="start_date" id="start_date" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="end_date" class=" font-medium tracking-widest block text-sm">
                                Salida:
                            </label>
                            <div class="lg:flex lg:items-center">
                                <input class="mt-1 form-input form-input-border-normal " type="text" name="end_date" id="end_date" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="end_date" class=" font-medium tracking-widest block text-sm">
                                Salida:
                            </label>
                            <div class="lg:flex lg:items-center">
                                <select class="form-select form-input form-input-border-normal" name="adults">
                                    <option value="1">1 Adulto</option>
                                    <option value="2">2 Adultos</option>
                                    <option value="3">3 Adultos</option>
                                    <option value="4">4 Adultos</option>
                                    <option value="5">5 Adultos</option>
                                    <option value="6">6 Adultos</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="text-lg focus:outline-none bg-orange-500 text-white font-bold self-stretch uppercase text-center rounded-full lg:rounded-md  px-16  py-2 lg:text-left md:flex-grow"
                        aria-label="btn_reservar"
                    >
                        Reservar
                    </button>
                </form>
            </div>*/}
        </> 
    )
}

export default HomePage
