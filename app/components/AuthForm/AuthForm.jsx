
'use client'
import Styles from './AuthForm.module.css';
import { useState, useEffect } from 'react';
import { authorize, isResponseOk } from '@/app/api/apiutils';
import { endpoints } from '@/app/api/config';

import { useStore } from '@/app/store/app-store';


export const AuthForm = (props) => {

  const [authData, setAuthData] = useState({ identifier: "", password: "" })
  const [message, setMessage] = useState({ status: null, text: null })
  const [isDisaled, setIsdisables] = useState(false)
  const store = useStore()



  function handleInput(e) {
    const newAuthData = authData;
    newAuthData[e.target.name] = e.target.value;
    setAuthData(newAuthData);
  }

  useEffect(() => {
    let timer;
    if (store.user) {
      timer = setTimeout(() => {
        props.closePopUp();
        setIsdisables(false)
        setMessage({ status: null, text: null })
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [store.user]);

  async function handleSubmit(e) {
    setIsdisables(true)
    e.preventDefault();
    const userAuth = await authorize(endpoints.auth, authData)
    if (isResponseOk(userAuth)) {
      store.login(userAuth, userAuth.jwt)
      setMessage({ status: "success", text: "Вы авторизовались!" })
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" })
    }

  }


  return (
    <form className={Styles['form']} onSubmit={handleSubmit}>
      <h2 className={Styles['form__title']}>Авторизация</h2>
      <div className={Styles['form__fields']}>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input className={Styles['form__field-input']} onInput={handleInput} name="identifier" type="email" placeholder="hello@world.com" />
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input className={Styles['form__field-input']} onInput={handleInput} type="password" name='password' placeholder='***********' suggested="current-password" />
        </label>
      </div>
      {message.status && <p className={Styles['form__message']}>{message.text}</p>}
      <div className={Styles['form__actions']}>
        <button className={Styles['form__reset']} type="reset">Очистить</button>
        <button className={Styles['form__submit']} disabled={isDisaled} type="submit">Войти</button>
      </div>
    </form>
  )
};
