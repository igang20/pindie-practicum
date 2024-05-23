"use client"
import { useStore } from '@/app/store/app-store'
import { titles } from '@/app/data/data'
import CardsListSection from '@/app/components/CardListSection/CardListSection'
import Styles from "./user.module.css"
import { useEffect, useState } from 'react'
import { Preloader } from '@/app/components/Preloader/Preloader'
import { endpoints } from '@/app/api/config'
import { getData, isResponseOk, normalizeData } from '@/app/api/apiutils'

export default function UserPage(props) {
    const [isSwiper, setListType] = useState(false)
    const store = useStore()
    const [votedGames, SetVotedGames] = useState([])



    useEffect(() => {
        async function getVotedGames(url) {
            const result = [];
            const games = await getData(url)
            games.map((game) => {
                game.users.find((user) => {
                    user._id == props.params.user ? result.push(game) : false
                })
            })
            SetVotedGames(normalizeData(result))
        }

        getVotedGames(endpoints.games)
    }, [])



    return (
        store.user && votedGames ? (
            <div className={Styles.main}>
                <ul className={Styles.userInfo}>
                    <li>Имя:{store.user.username} </li>
                    <li>E-mail: {store.user.email} </li>
                    <li>Проголосовал: {votedGames.length}</li>
                </ul>
                <CardsListSection id='faw' title={titles.faw} data={votedGames} type={isSwiper ? "slider" : false} />
            </div>)
            :
            (<Preloader />)
    )
}