import React from "react";
import logo from "../../assets/image/logo.svg";
import c from "./Change.module.css";
import {Link} from "react-router-dom";

const Change = (props) => {
    return (
        <div className={c.Content}>
            <Link className={c.LOGO} to={"/home"}>
                MY<span>WARDROBE</span>
            </Link>
            <form>
                <img className={c.icon} src={logo} alt={""}/>
                    <div className={c.title}>
                        Установка нового пароля
                    </div>
                    <p className={c.borders + " " + c.pass1}>
                        <label className={c.label_borders} htmlFor="password1">
                            Пароль:
                        </label>
                        <input id="password1" className={c.input_borders} type="password" placeholder=""/>
                    </p>
                    <p className={c.borders + " " + c.pass2}>
                        <label className={c.label_borders} htmlFor="password2">
                            Подтвердите пароль:
                        </label>
                        <input id="password2" className={c.input_borders} type="password" placeholder=""/>
                    </p>
                    <button className={c.form_btn} type="submit">
                        Изменить
                    </button>
            </form>
        </div>
    )
}

export default Change;
