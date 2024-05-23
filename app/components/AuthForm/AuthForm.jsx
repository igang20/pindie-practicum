
'use client'
import Styles from './AuthForm.module.css';
import { useState, useEffect } from 'react';
import { authorize, isResponseOk, normalizeUserGames, normalizeDataObject } from '@/app/api/apiutils';
import { endpoints } from '@/app/api/config';
import { useStore } from '@/app/store/app-store';
import RegForm from './RegForm';


export const AuthForm = (props) => {

  const [authData, setAuthData] = useState({ email: "", password: "" })
  const [message, setMessage] = useState({ status: null, text: null })
  const [isDisaled, setIsdisabled] = useState(false)
  const [isRegistration, setIsRegistration] = useState(false)
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
        setMessage({ status: null, text: null })
        setIsdisabled(false)
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [store.user]);

  async function handleSubmit(e) {
    setIsdisabled(true)
    e.preventDefault();
    const userData = await authorize(endpoints.auth, authData)
    if (isResponseOk(userData)) {
      store.login({ ...userData.user, id: userData._id }, userData.jwt)
      setMessage({ status: "success", text: "Вы авторизовались!" })
    } else {
      setMessage({ status: "error", text: "Неверные почта или пароль" })
      setIsdisabled(false)
    }

  }


  return (
    isRegistration ?
      (
        <RegForm isRegistration={isRegistration} setIsRegistration={setIsRegistration} store={store} />
      )

      :

      (
        <form className={Styles['form']} onSubmit={handleSubmit} >
          <div className={Styles['form__actions']}>
            <button className={isRegistration ? Styles['form__submit'] : Styles['form__reset']} type="button" onClick={() => { setIsRegistration(true) }} >Регистрация </button>
            <button className={isRegistration ? Styles['form__reset'] : Styles['form__submit']} type="button" onClick={() => { setIsRegistration(false) }}>  Авторизация</button>
          </div>
          <div className={Styles['form__fields']}>
            <label className={Styles['form__field']}>
              <span className={Styles['form__field-title']}>Email</span>
              <input className={Styles['form__field-input']} onInput={handleInput} name="email" type="email" placeholder="hello@world.com" />

            </label>
            <label className={Styles['form__field']}>
              <span className={Styles['form__field-title']}>Пароль</span>
              <input className={Styles['form__field-input']} onInput={handleInput} type="password" name='password' placeholder='***********'
              />
            </label>
          </div>
          {message.status && <p className={Styles['form__message']}>{message.text}</p>}
          <div className={Styles['form__actions']}>
            <button className={Styles['form__reset']} type="reset">Очистить</button>
            <button className={Styles['form__submit']} disabled={isDisaled} type="submit">Войти</button>
          </div>
        </form >
      )


  )
};
