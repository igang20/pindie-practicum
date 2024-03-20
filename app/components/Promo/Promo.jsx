"use client"
import { useState, useEffect, } from "react";
// import "@/app/globals.css"
import Styles from './Promo.module.css'
import '../../../public/fonts/fonts.css'


export default function Promo() {
    const [codeIsVsible, setVisibilityState] = useState(false)

    useEffect(() => {
        let timeout;
        if (codeIsVsible) {
            timeout = setTimeout(() => {
                setVisibilityState(false);
            }, 5000)
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [codeIsVsible])

    function handleButtonClick() {
        setVisibilityState(true)
    }
    return (
        <section className={` ${Styles["promo"]}`}>
            <div className={` ${Styles["promo__description-block"]}`}>
                <h2 className={`promo__title ${Styles["promo__title"]}`}>Твой промо-код</h2>
                <p className={Styles["promo__description"]}>Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!</p>
                <button className={`button ${Styles.promo__button}`} onClick={handleButtonClick}>{codeIsVsible ? <span className={Styles["promo-code"]}>WEBTEENS10</span> : 'Получить код'}</button>
            </div>
            <img src="/images/promo-illustration.svg" alt="Собака" className={Styles["promo__image"]} />
        </section>
    )
}                               
