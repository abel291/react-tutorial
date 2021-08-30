import { useAuth } from "../context/AuthContext"

import { Route, Redirect, useLocation } from "react-router-dom"
import { Transition } from "@headlessui/react"
import { useEffect, useState } from "react"

const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth()    
    let location = useLocation()
    
    return (
        <>
            <Route exact {...rest}>
                {auth.isLogged ? (
                    ({ match }) => (
                        <Transition
                            show={match != null}
                            enter="transition-opacity duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="duration-0"
                            //unmount={true}
                        >
                            {children}
                        </Transition>
                    )
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )}
            </Route>
        </>
    )
}
export default PrivateRoute
