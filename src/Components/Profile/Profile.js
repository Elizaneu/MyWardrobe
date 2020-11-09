import React from "react";
import c from "./Profile.module.css";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import img1 from "../../assets/image/Gallery/img1.jpg";
import img2 from "../../assets/image/Gallery/img2.jpg";
import img3 from "../../assets/image/Gallery/img3.jpg";
import img4 from "../../assets/image/Gallery/img4.jpg";
import img5 from "../../assets/image/Gallery/img5.jpg";
import img6 from "../../assets/image/Gallery/img6.jpg";
import logo from "../../assets/image/logo.svg";
import {Link} from "react-router-dom";

const Profile = (props) => {
    return (
        <div>
            <Header/>
            <div className={c.main_frame}>
                <p className={c.name}>
                    Екатерина Иванова
                </p>
                <div className={c.menu}>
                    <Link to={'/wardrobe'} className={c.menu_btn}>
                        Мой гардероб
                    </Link>
                    <Link  to={'/outfits'} className={c.menu_btn}>
                        Мои образы
                    </Link>
                    <Link to={'/favourites'} className={c.menu_btn}>
                        Избранное
                    </Link>
                    <Link to={'/settings'} className={c.menu_btn}>
                        Настройки
                    </Link>
                </div>
                <p className={c.main_text}>
                    Твои лучшие образы по мнению других пользователей
                </p>
                <div className={c.gallery}>
                    <img className={c.gallery_img} src={img1} alt={""}/>
                    <img className={c.gallery_img} src={img2} alt={""}/>
                    <img className={c.gallery_img} src={img3} alt={""}/>
                    <img className={c.gallery_img} src={img4} alt={""}/>
                    <img className={c.gallery_img} src={img5} alt={""}/>
                    <img className={c.gallery_img} src={img6} alt={""}/>
                </div>
            </div>
            <div className={c.bottom}>
                <img className={c.icon} src={logo}/>
                <p className={c.quote}>
                    Создай свой собственный стиль
                </p>
            </div>

        </div>
    )
}

export default withAuthRedirect(Profile);