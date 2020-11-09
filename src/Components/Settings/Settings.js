import React from "react";
import c from "./Settings.module.css";
import logo from "../../assets/image/logo.svg";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {Link} from "react-router-dom";
import {reduxForm} from "redux-form";


const SettingForm = reduxForm({form: "settings"})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <img className={c.icon} src={logo} alt={""}/>
            <div className={c.title}>
                Настройки
            </div>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="firstname">
                    Имя:
                </label>
                <input
                    name="FirstName"
                    className={c.form_input}
                    id="firstname"
                    type="text"
                    placeholder="Имя"/>
            </p>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="lastname">
                    Фамилия:
                </label>
                <input
                    name="LastName"
                    className={c.form_input}
                    id="lastname"
                    type="text"
                    placeholder="Фамилия"/>
            </p>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="pw1">
                    Пароль:
                </label>
                <input
                    name="Password"
                    className={c.form_input}
                    id="pw1"
                    type="password"
                    placeholder="••••••••"/>
            </p>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="pw2">
                    Новый пароль:
                </label>
                <input
                    name="Password"
                    className={c.form_input}
                    id="pw2"
                    type="password"
                    placeholder="••••••••"/>
            </p>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="pw3">
                    Подтвердите пароль:
                </label>
                <input className={c.form_input} id="pw3" type="password" placeholder="••••••••"/>
            </p>
            <button className={c.form_btn} type="submit">
                Сохранить
            </button>
            <Link className={c.delete}>
                Удалить страницу
            </Link>
        </form>
    )
})
const Settings = (props) => {
    return (
        <div>
            <Header/>

        </div>
)
}

export default withAuthRedirect(Settings);