import React from "react";
import {Link} from "react-router-dom";
import c from "./Rec.module.css";
import logo from "../../assets/image/logo.svg"
const Rec = (props) => {
    return (
        <div className={c.Content}>
            <Link className={c.LOGO} to={"/home"}>
                MY<span>WARDROBE</span>
            </Link>
            <form>
                <img className={c.icon} src={logo}/>
                <div className={c.title}>
                    Восстановление пароля
                </div>
                <input type="email" className={c.border} placeholder="Электронная почта"/>
                <button className={c.form_btn} type="submit">
                    Продолжить
                </button>
            </form>
        </div>
)
}

export default Rec;