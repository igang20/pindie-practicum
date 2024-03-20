"use client"
import Swiper from "swiper";
import Styles from "./CardsSlider.module.css"
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import Card from "../Card/Card.jsx";



export default function CardListSlider(props) {

    useEffect(() => {
        const options = {
            // Параметры слайдера для экранов мобильных гаджетов шириной < 450px
            loop: false,
            spaceBetween: 10,
            allowTouchMove: true,
            slidesPerView: 1,
            autoplay: {
                enabled: false,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
                enabled: true,
                clickable: true,
            },
            // Параметры слайдера для мониторов компьютера
            breakpoints: {
                450: {
                    loop: true,
                    spaceBetween: 20,
                    slidesPerView: "auto",
                    allowTouchMove: false,
                    speed: 6500,
                    autoplay: {
                        enabled: true,
                        delay: 0,
                    },
                    pagination: {
                        enabled: false,
                    },
                },
            },
            modules: [Autoplay, Pagination],
        };
        new Swiper(".swiper", options);
    }, []);


    return (
        <>
            <div className={`swiper ${Styles["slider"]}`}>
                <ul className={`swiper-wrapper ${Styles["slider-wrapper"]}`}>
                    {props.data.map((item) => {
                        return (
                            <li className={`swiper-slide ${Styles["slide"]}`} key={item.id}>
                                <Link href={`/games/${item.id}`} className={Styles["card-list__link"]}>
                                    <Card {...item} />
                                </Link>
                            </li>
                        );
                    })}

                </ul>
                <div className={`swiper-pagination ${Styles["pagination"]}`}></div>
            </div>

        </>
    )
}