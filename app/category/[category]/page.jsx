"use client"
import CardsList from "@/app/components/CardListSection/CardList"
import { endpoints } from "@/app/api/config"
import { titles } from "@/app/data/data"
import { useState } from "react"
import { Preloader } from "@/app/components/Preloader/Preloader"
import { useGetDataByCategory } from "@/app/api/apihooks"
import Styles from "@/app/games/[id]/Game.module.css";




export default function SpecificCategoryPage(props) {
    const CurrentCategory = props.params.category
    const [preloaderVisible, setPreloaderVisible] = useState(true);

    const specifiedGames = useGetDataByCategory(endpoints.games, CurrentCategory)

    return (
        <main className="main">
            {specifiedGames ? (<CardsList id={CurrentCategory} data={specifiedGames} title={titles[CurrentCategory]} />) : preloaderVisible ? <Preloader /> : (<section className={Styles['game']}>
                <p>Такой игры не существует 😢</p>
            </section>
            )}

        </main>
    )
}