import React from "react";
import c from "./Favourites.module.css";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import logo from "../../assets/image/logo.svg";
import img1 from "../../assets/image/Gallery/img1.jpg";
import img2 from "../../assets/image/Gallery/img2.jpg";
import img3 from "../../assets/image/Gallery/img3.jpg";
import img4 from "../../assets/image/Gallery/img4.jpg";
import img5 from "../../assets/image/Gallery/img5.jpg";
import img6 from "../../assets/image/Gallery/img6.jpg";
import img7 from "../../assets/image/Gallery/img7.jpg";
import img8 from "../../assets/image/Gallery/img8.jpg";
import img9 from "../../assets/image/Gallery/img9.jpg";
import img10 from "../../assets/image/Gallery/img10.jpg";
import img11 from "../../assets/image/Gallery/img11.jpg"
import img12 from "../../assets/image/Gallery/img12.jpg"

const Favourites = (props) => {
    return (
        <div>
            <Header/>
            <div className={c.mainFrame}>
                <p className={c.mainFrame__title}>
                    Избранное
                </p>
                <span className={c.button + " " + c.mainFrame_topButton}>
                    Выбрать
                </span>
                <div className={c.mainFrame_gallery}>
                    <img className={c.mainFrame_gallery_img} src={img1} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img2} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img3} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img4} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img5} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img6} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img7} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img8} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img9} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img10} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img11} alt={""}/>
                    <img className={c.mainFrame_gallery_img} src={img12} alt={""}/>
                </div>
                <div className={c.mainFrame_bottomButtonsLeft}>
                    <span className={c.button}>
                        В начало
                    </span>
                    <span className={c.button}>
                        Предыдущая
                    </span>
                </div>
                <div className={c.mainFrame_bottomButtonsRight}>
                    <span className={c.button}>
                        Следующая
                    </span>
                    <span className={c.button}>
                        В конец
                    </span>
                </div>
            </div>
            <div className={c.bottom}>
                <img className={c.bottom_icon} src={logo} alt={""}/>
            </div>
        </div>
    )
}

export default withAuthRedirect(Favourites);