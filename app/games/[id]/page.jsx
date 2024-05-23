
"use client"
import Styles from "./Game.module.css";
import { Overlay } from "@/app/components/Overlay/Overlay";
import { Popup } from "@/app/components/Popup/Popup";
import { AuthForm } from "@/app/components/AuthForm/AuthForm";
import { useEffect, useState } from 'react'
import { getGameDataByID, isResponseOk, checkIfUserVoted, vote, saveVoteTouser } from "@/app/api/apiutils";
import { endpoints } from "@/app/api/config";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { useStore } from "@/app/store/app-store";




export default function GamePage(props) {

    const store = useStore()



    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const [popUpIsOpened, setPopUpIsOpend] = useState(false);
    const [game, setGame] = useState()
    const [votedUsers, setVotedUsers] = useState([])
    const [isVoted, setIsVoted] = useState(false)


    //Запрос игры с сервера, сохранение игры и списка проголосавших в стейт
    useEffect(() => {
        async function getGame() {
            const responce = await getGameDataByID(endpoints.games, props.params.id).then(
                (responce) => {
                    console.log(responce)
                    if (isResponseOk(responce)) {
                        setGame(responce);
                        setVotedUsers(responce.users)
                    } else {
                        setGame(null)
                        setVotedUsers(null)
                    }
                    setPreloaderVisible(false)
                }
            )

        }
        getGame()
    }, [])

    function saveToUser(gameID) {
        const currenIds = store.user.games
        currenIds.push(gameID)
        store.updateUser({ ...store.user, games: currenIds })
    }


    //состояние кнопки голосоваия
    useEffect(() => {
        if (store.user && game) {
            setIsVoted(checkIfUserVoted(game, store.user.id));
        }
    }, [store.user, game]);



    function openPopUp() {
        setPopUpIsOpend(true)
    }

    function closePopUp() {
        setPopUpIsOpend(false)
    }


    async function sendVote() {
        votedUsers.push(store.user)
        const responce = await vote(`${endpoints.games}/${game.id}`, store.token, votedUsers).then((responce) => {
            if (isResponseOk(responce)) {
                setGame(() => { return { ...game, users: votedUsers } })
            } else return;
        })

        setIsVoted(true)
    }

    return (
        game ? (
            <>
                <main className="main">
                    <section className={Styles["game"]}>
                        <iframe
                            className={Styles["game__iframe"]}
                            src={game.link}
                        ></iframe>
                    </section>
                    <section className={Styles["about"]}>
                        <h2 className={Styles["about__title"]}>{game.title}</h2>
                        <div className={Styles["about__content"]}>
                            <p className={Styles["about__description"]}>
                                {game.description}
                            </p>
                            <div className={Styles["about__author"]}>
                                <p>
                                    Автор:
                                    <span className={Styles["about__accent"]}>{game.developer}</span>
                                </p>
                            </div>
                        </div>
                        <div className={Styles["about__vote"]}>
                            <p className={Styles["about__vote-amount"]}>
                                За игру уже проголосовали:
                                <span className={Styles["about__accent"]}>{game.users.length}</span>
                            </p>
                            <button
                                disabled={isVoted}
                                className={`button ${Styles["about__vote-button"]}`}
                                onClick={() => {
                                    store.isAuth ? sendVote() : openPopUp()
                                }}
                            >
                                {isVoted && store.isAuth ? "Голос учтен" : "Голосовать"}
                            </button>
                        </div>
                    </section>
                </main >
                <Overlay popUpIsOpened={popUpIsOpened} closePopUp={closePopUp} />
                <Popup popUpIsOpened={popUpIsOpened} closePopUp={closePopUp}>
                    <AuthForm closePopUp={closePopUp} />
                </Popup>
            </>)
            : preloaderVisible ? <Preloader /> :
                (<section className={Styles['game']}>
                    <p>Такой игры не существует 😢</p>
                </section>
                )


    );
}

