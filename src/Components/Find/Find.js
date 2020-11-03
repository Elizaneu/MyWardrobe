import React from "react";
import c from "./Find.module.css";
import Header from "../Header/Header";
import img1 from "../../assets/image/Gallery/img1.jpg";
import img2 from "../../assets/image/Gallery/img2.jpg";
import img3 from "../../assets/image/Gallery/img3.jpg";
import img4 from "../../assets/image/Gallery/img4.jpg";
import img5 from "../../assets/image/Gallery/img5.jpg";
import img6 from "../../assets/image/Gallery/img6.jpg";
import img7 from "../../assets/image/Gallery/img7.jpg";
import img8 from "../../assets/image/Gallery/img8.jpg";
import fav from "../../assets/image/Search/fav.svg";
import favNotAct from "../../assets/image/Search/favNotActive.svg";
import logo from "../../assets/image/logo.svg";
import withAuthRedirect from "../../HOC/withAuthRedirect";


const Find = (props) => {
    return (
        <div>
            <Header/>
            <div className={c.mainFrame}>
                <div className={c.searchSpace}>
                    <select className={c.button__dark} required>
                        <option>По критериям</option>
                        <option>По категориям</option>
                    </select>
                    <div className={c.category_items + " " + c.first}>
                <span className={c.button__dark}>
                    Стиль
                </span>
                        <div className={c.categoryItem_list}>
                    <span className={c.button__light}>
                        Классика
                    </span>
                            <span className={c.button__light}>
                        Кэжуал
                    </span>
                            <span className={c.button__light}>
                        Преппи
                    </span>
                        </div>
                        <div className={c.categoryItem_list}>
                    <span className={c.button__light}>
                        Гранж
                    </span>
                            <span className={c.button__light}>
                        Милитари
                    </span>
                            <span className={c.button__light}>
                        Романтика
                    </span>
                        </div>
                        <div className={c.categoryItem_list}>
                    <span className={c.button__light}>
                        Минимализм
                    </span>
                            <span className={c.button__light}>
                        Глэм
                    </span>
                            <span className={c.button__light}>
                        Спорт
                    </span>
                        </div>
                        <span className={c.button__dark}>
                    Дресс-код
                </span>
                        <div className={c.categoryItem_list}>
                    <span className={c.button__light}>
                        Прогулка
                    </span>
                            <span className={c.button__light}>
                        Работа
                    </span>
                            <span className={c.button__light}>
                        Университет
                    </span>
                        </div>
                        <div className={c.categoryItem_list}>
                    <span className={c.button__light}>
                        Тренировка
                    </span>
                            <span className={c.button__light}>
                        Вечеринка
                    </span>
                            <span className={c.button__light}>
                        Пляж
                    </span>
                        </div>
                        <span className={c.button__dark}>
                    Сезон
                </span>
                        <div className={c.categoryItem_list}>
                    <span className={c.button__light}>
                        Зима
                    </span>
                            <span className={c.button__light}>
                        Весна
                    </span>
                            <span className={c.button__light}>
                        Лето
                    </span>
                            <span className={c.button__light}>
                        Осень
                    </span>
                        </div>
                    </div>
                    <div className={c.category_items + " " + c.second}>
                    <span className={c.button__dark}>
                       Верх
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button__light}>Футболки и топы</span>
                            <span className={c.button__light}>Свитеры и кардиганы</span>
                            <span className={c.button__light}>Рубашки и блузы</span>
                        </div>
                        <span className={c.button__dark}>
                        Низ
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button__light}>Юбки</span>
                            <span className={c.button__light}>Брюки</span>
                            <span className={c.button__light}>Джинсы</span>
                            <span className={c.button__light}>Шорты</span>
                        </div>
                        <span className={c.button__dark}>
                        Самостоятельные единицы
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button__light}>Комбинезоны</span>
                            <span className={c.button__light}>Платья</span>
                            <span className={c.button__light}>Купальники</span>
                        </div>
                        <span className={c.button__dark}>
                        Верхняя одежда
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button__light}>Куртки</span>
                            <span className={c.button__light}>Пальто</span>
                            <span className={c.button__light}>Плащи</span>
                            <span className={c.button__light}>Пуховики</span>
                            <span className={c.button__light}>Пиджаки</span>
                        </div>
                        <span className={c.button__dark}>
                        Обувь
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button__light}>Сапоги</span>
                            <span className={c.button__light}>Ботинки</span>
                            <span className={c.button__light}>Туфли</span>
                            <span className={c.button__light}>Босоножки</span>
                            <span className={c.button__light}>Кроссовки</span>
                        </div>
                        <span className={c.button__dark}>
                        Аксессуары
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button__light}>Сумки</span>
                            <span className={c.button__light}>Ремни</span>
                            <span className={c.button__light}>Шляпы</span>
                            <span className={c.button__light}>Бижутерия</span>
                            <span className={c.button__light}>Шарфы</span>
                        </div>
                    </div>
                </div>
                <div className={c.searchResult}>
                    <select className={c.button__light + " " + c.button__light__brown} required>
                        <option>
                            По популярности
                        </option>
                        <option>
                            По дате добавления
                        </option>
                    </select>
                    <div className={c.gallery}>
                        <div className={c.galleryRow}>
                            <img className={c.gallery_img} src={img1} alt={""}/>
                            <img className={c.gallery_img} src={img2} alt={""}/>
                            <img className={c.gallery_img} src={img3} alt={""}/>
                        </div>
                        <div className={c.galleryRow}>
                            <span className={c.gallery_like}>
                                <img className={c.button_icon} src={favNotAct} alt={""}/>
                                10 нравится
                            </span>
                            <span className={c.gallery_like}>
                                <img className={c.button_icon} src={favNotAct} alt={""}/>
                                10 нравится
                            </span>
                            <span className={c.gallery_like}>
                                <img className={c.button_icon} src={favNotAct} alt={""}/>
                                10 нравится
                            </span>
                        </div>
                        <div className={c.galleryRow}>
                            <img className={c.gallery_img} src={img5} alt={""}/>
                            <img className={c.gallery_img} src={img6} alt={""}/>
                            <img className={c.gallery_img} src={img7} alt={""}/>
                        </div>
                        <div className={c.galleryRow}>
                            <span className={c.gallery_like}>
                                <img className={c.button_icon} src={favNotAct} alt={""}/>
                                10 нравится
                            </span>
                            <span className={c.gallery_like}>
                                <img className={c.button_icon} src={favNotAct} alt={""}/>
                                10 нравится
                            </span>
                            <span className={c.gallery_like}>
                                <img className={c.button_icon} src={favNotAct} alt={""}/>
                                10 нравится
                            </span>
                        </div>
                    </div>
                    <div className={c.bottomButton}>
                        <div>
                        <span className={c.button__light + " " + c.button__light__brown}>
                            В начало
                        </span>
                            <span className={c.button__light + " " + c.button__light__brown}>
                            Предыдущая
                        </span>
                        </div>
                        <div>
                        <span className={c.button__light + " " + c.button__light__brown}>
                            Следующая
                        </span>
                            <span className={c.button__light + " " + c.button__light__brown}>
                            В конец
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={c.bottom}>
                <img className={c.bottom_icon} src={logo} alt={""}/>
            </div>
        </div>
    )
}

export default withAuthRedirect(Find);