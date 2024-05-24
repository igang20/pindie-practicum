"use client"

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useEffect } from "react";
import { useStore } from "./store/app-store";


export function App(props) {
    const store = useStore()

    useEffect(() => {
        store.checkMe()
        console.log(store.user)
    }, [])


    return (

        <>
            <Header />
            {props.children}
            <Footer />
        </>
    )
}