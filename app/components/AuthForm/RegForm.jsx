'use clientS'
import { useEffect, useState } from "react";
import Styles from "./AuthForm.module.css"
import { authorize, isResponseOk } from "@/app/api/apiutils";
import { endpoints } from "@/app/api/config";
import { useStore } from "zustand";



export default function RegForm(props) {



    const [registrationData, setRegestrationData] = useState({ username: '', email: '', password: '' })
    const [message, setMessage] = useState({ status: null, text: null })

    const [isDisaled, setIsdisabled] = useState(false)

    function handleLoginInpit(e) {
        const newRegistrationData = registrationData
        newRegistrationData[e.target.name] = e.target.value
        setRegestrationData(newRegistrationData)
    }



    useEffect(() => {
        let timer;
        if (props.store.user) {
            timer = setTimeout(() => {

                setMessage({ status: null, text: null })
                setIsdisabled(false)
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [props.store.user]);

    async function handleSubmit(e) {
        setIsdisabled(true)
        e.preventDefault();


        const userReg = await authorize(endpoints.register, registrationData);


        if (isResponseOk(userReg)) {
            props.store.login(userReg.user, userReg.jwt)
            setMessage({ status: "success", text: "Вы зарегистрировались!" })
        } else {
            setMessage({ status: "error", text: "Ошибка данных!" })
            setIsdisabled(false)
        }
    }


    return (
        <form className={Styles.form} method='post' onSubmit={handleSubmit} >
            <div className={Styles['form__actions']}>
                <button className={props.isRegistration ? Styles['form__submit'] : Styles['form__reset']} type="button" onClick={() => { props.setIsRegistration(true); }} >Регистрация </button>
                <button className={props.isRegistration ? Styles['form__reset'] : Styles['form__submit']} type="button" onClick={() => { props.setIsRegistration(false) }}>  Авторизация</button>
            </div>
            <div className={Styles['form__fields']} >
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Имя пользователя</span>
                    <input className={Styles['form__field-input']} onChange={handleLoginInpit} name='username' placeholder="example_user" required />
                </label>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>E-mail</span>
                    <input className={Styles['form__field-input']} onChange={handleLoginInpit} name='email' placeholder="hello@world.com" required />
                </label>
                <label className={Styles['form__field']}>
                    <span className={Styles['form__field-title']}>Пароль</span>
                    <input className={Styles['form__field-input']} onChange={handleLoginInpit} name="password" placeholder='***********' required />
                </label>
                {message.status && <p className={Styles['form__message']}>{message.text}</p>}
                <div className={Styles['form__actions']}>
                    <button className={Styles['form__reset']} type="reset">Очистить</button>
                    <button className={Styles['form__submit']} disabled={isDisaled} type="submit">Подтвердить</button>
                </div>
            </div>
        </form>
    )
}