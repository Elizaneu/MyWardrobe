import React from "react";
import {Link} from "react-router-dom";
import c from "./Reg.module.css";
import logo from "../../assets/image/logo.svg";

const Reg = (props) => {
    return (
        <div className={c.Content}>
            <Link className={c.LOGO} to={"/home"}>MY<span>WARDROBE</span></Link>
            <form>
                <img className={c.icon} src={logo} alt={""}/>
                <div className={c.title}>Регистрация</div>
                <input type="text" className={c.surname + " " + c.borders} placeholder="Фамилия"/>
                <input type="text" className={c.firstname + " " + c.borders} placeholder="Имя"/>
                <input type="email" className={c.email + " " + c.borders} placeholder="Электронная почта"/>
                <input type="password" className={c.password + " " + c.borders} placeholder="Пароль"/>
                <button className={c.form_btn} type="submit">Зарегистрироваться</button>
                <Link className={c.account} to={"/auth"}>Уже есть аккаунт?</Link>
            </form>
        </div>
    )
}

export default Reg;

