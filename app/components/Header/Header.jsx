'use client'

import { useState } from 'react';
import Styles from './Header.module.css'
import { AuthForm } from '../AuthForm/AuthForm';
import { Overlay } from '../Overlay/Overlay';
import { Popup } from '../Popup/Popup';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/app/store/app-store';
import { useRouter } from 'next/navigation';

export default function Header() {

  const store = useStore()


  const router = useRouter()

  const currentRout = usePathname();

  const [popUpIsOpened, setPopUpIsOpend] = useState(false);


  function handleLogut() {
    router.push('/')
    store.logout()
  }


  function openPopUp() {
    setPopUpIsOpend(true)
  }

  function closePopUp() {
    setPopUpIsOpend(false)
  }



  return (
    <header className={Styles['header']} >
      {currentRout === '/' ?
        <div className={Styles['logo']}>
          <img
            className={Styles['logo__image']}
            src="/images/logo.svg"
            alt="Логотип Pindie"
          />
        </div> :
        <Link href={`/`} className={Styles['logo']}>
          <img
            className={Styles['logo__image']}
            src="/images/logo.svg"
            alt="Логотип Pindie"
          />
        </Link>}

      <nav className={Styles['menu']}>
        <ul className={Styles['menu__list']}>
          <li className={Styles['menu__item']}>
            <Link href="/category/new" className={`${Styles["menu__link"]} ${currentRout === "/category/new" ? Styles["menu__link_active"] : ""
              }`} >
              Новинки
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/category/popular" className={`${Styles["menu__link"]} ${currentRout === "/category/popular" ? Styles["menu__link_active"] : ""
              }`} >
              Популярные
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/category/shooter" className={`${Styles["menu__link"]} ${currentRout === "/category/shooter" ? Styles["menu__link_active"] : ""
              }`} >
              Шутеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/category/runner" className={`${Styles["menu__link"]} ${currentRout === "/category/runner" ? Styles["menu__link_active"] : ""
              }`} >
              Ранеры
            </Link>
          </li>
          <li className={Styles['menu__item']}>
            <Link href="/category/pixel" className={`${Styles["menu__link"]} ${currentRout === "/category/pixel" ? Styles["menu__link_active"] : ""
              }`} >
              Пиксельные
            </Link>
          </li >
          <li className={Styles['menu__item']}>
            <Link href="/category/TDS" className={`${Styles["menu__link"]} ${currentRout === "/category/tds" ? Styles["menu__link_active"] : ""
              }`} >
              TDS
            </Link>
          </li >
        </ul >
        <div className={Styles['auth']} style={store.isAuth ? { flexDirection: "column" } : { flexDirection: "row" }}>
          {store.isAuth ? (
            <>
              <button className={Styles['auth__button']} onClick={() => { handleLogut() }}> Выйти</button>
              <button className={Styles['auth__button']} onClick={() => { router.push(`/user/${store.user.id}`) }}> Аккаунт</button>
            </>
          ) : (<button className={Styles['auth__button']} onClick={() => { openPopUp() }}> Войти</button>)}
        </div>
      </nav >

      <Overlay popUpIsOpened={popUpIsOpened} closePopUp={closePopUp} />
      <Popup popUpIsOpened={popUpIsOpened} closePopUp={closePopUp}>
        <AuthForm closePopUp={closePopUp} />
      </Popup>
    </header >
  )
}
