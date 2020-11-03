import React from "react";
import c from "./Wardrobe.module.css";
import Header from "../Header/Header";
import img1 from "../../assets/image/Wardrobe/img1.jpg";
import img2 from "../../assets/image/Wardrobe/img2.jpg";
import img3 from "../../assets/image/Wardrobe/img3.jpg";
import img4 from "../../assets/image/Wardrobe/img4.jpg";
import img5 from "../../assets/image/Wardrobe/img5.jpg";
import img6 from "../../assets/image/Wardrobe/img6.jpg";
import img7 from "../../assets/image/Wardrobe/img7.jpg";
import img8 from "../../assets/image/Wardrobe/img8.jpg";
import img9 from "../../assets/image/Wardrobe/img9.jpg";
import img10 from "../../assets/image/Wardrobe/img10.jpg";
import img11 from "../../assets/image/Wardrobe/img11.jpg";
import img12 from "../../assets/image/Wardrobe/img12.jpg";
import plus from "../../assets/image/Header/plus.svg";

const Wardrobe = (props) => {
    return (
        <div>
            <Header/>
            <div className={c.mainFrame}>
                <div className={c.mainFrame_topButton + " " +  c.mainFrame_topButton__left}>
                <select className={c.button} required>
                    <option>Футболки и топы</option>
                    <option>Рубашки и блузы</option>
                    <option>Свитеры и кардиганы</option>
                    <option>Юбки</option>
                    <option>Брюки</option>
                    <option>Джинсы</option>
                    <option>Шорты</option>
                    <option>Комбинезоны</option>
                    <option>Платья</option>
                    <option>Купальники</option>
                    <option>Куртки</option>
                    <option>Пальто</option>
                    <option>Плащи</option>
                    <option>Пуховики</option>
                    <option>Пиджаки</option>
                    <option>Сапоги</option>
                    <option>Ботинки</option>
                    <option>Туфли</option>
                    <option>Босоножки</option>
                    <option>Кроссовки</option>
                    <option>Сумки</option>
                    <option>Ремни</option>
                    <option>Шляпы</option>
                    <option>Бижутерия</option>
                    <option>Шарфы</option>
                </select>
                <span className={c.button}>
                    <span>
                        <img className={c.button_icon} src={plus} alt={""}/>
                    </span>
                    Добавить новый элемент
                </span>
                </div>
                <span className={c.button + " " + c.mainFrame_topButton + " " + c.mainFrame_topButton__right}>
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
        </div>
    )
}

export default Wardrobe;