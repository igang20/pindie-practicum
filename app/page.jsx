'use client'
import { getGamesDataByCategory, isResponseOk } from "./api/apiutils";
import { endpoints } from "./api/config";
import Banner from "./components/Banner/Banner";
import Promo from "./components/Promo/Promo";
import CardsListSection from "./components/CardListSection/CardListSection";
import { useEffect, useState } from "react";
import { Preloader } from "./components/Preloader/Preloader";




export default function Home() {
  const [preloaderVisible, setPreloaderVisible] = useState(true);


  useEffect(() => {
    async function getData(category) {
      const games = await getGamesDataByCategory(endpoints.games, category)
      isResponseOk(games) ? category == "new" ? setNewGamesList(games) : setPopularGamesList(games) : null
      setPreloaderVisible(false)
    }

    getData('new')
    getData('popular')
  }, [])

  const [popularGamesList, setPopularGamesList] = useState([])
  const [newGamesList, setNewGamesList] = useState([])


  return (
    <main>
      <Banner />
      {popularGamesList.length && newGamesList.length
        ?
        (<>

          <CardsListSection id='popular' title="Популярное" data={popularGamesList} type='slider' />
          <CardsListSection id='new' title='Новинки' data={newGamesList} type="slider" />

        </>) : preloaderVisible ? <Preloader /> : false
      }
      < Promo />
    </main>
  );
}



