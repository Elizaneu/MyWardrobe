import React from "react";
import c from "./Add.module.css";
import Header from "../Header/Header";
import logo from "../../assets/image/logo.svg";
import withAuthRedirect from "../../HOC/withAuthRedirect";

const Add = (props) => {
    return (
        <div>
            <Header/>
            <form>
                <img className={c.icon} src={logo} alt={""}/>
                <div className={c.title}>
                    Добавление нового элемента
                </div>
                <input className={c.choose_file + " " + c.btn} type="button" value="Выбрать фото"
                       onClick="document.getElementById('file').click();"/>
                <input className={c.cl} id="file" type="file" accept="image/*"/>
                <select className={c.btn + " " + c.choose_cat} required>
                    <option value="none" hidden="">Выбрать категорию</option>
                </select>
                <button className={c.form_btn} type="submit">
                    Загрузить
                </button>
            </form>
        </div>
    )
}

export default withAuthRedirect(Add);