import React from "react";
import Header from "../Header/Header";
import c from "./Create.module.css";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import plus from "../../assets/image/Header/plus.svg";
import back from "../../assets/image/back.svg";
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

const Create = (props) => {
    return (
        <div>
            <Header/>
            <div className={c.canvas}>
            </div>
            <div className={c.first}>
                <div className={c.category}>
                <span className={c.category_title}>
                    Выберите категорию
                </span>
                    <div className={c.category_items}>
                    <span className={c.categoryButton}>
                       Верх
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button}>Футболки и топы</span>
                            <span className={c.button}>Свитеры и кардиганы</span>
                            <span className={c.button}>Рубашки и блузы</span>
                        </div>
                        <span className={c.categoryButton}>
                        Низ
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button}>Юбки</span>
                            <span className={c.button}>Брюки</span>
                            <span className={c.button}>Джинсы</span>
                            <span className={c.button}>Шорты</span>
                        </div>
                        <span className={c.categoryButton}>
                        Самостоятельные единицы
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button}>Комбинезоны</span>
                            <span className={c.button}>Платья</span>
                            <span className={c.button}>Купальники</span>
                        </div>
                        <span className={c.categoryButton}>
                        Верхняя одежда
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button}>Куртки</span>
                            <span className={c.button}>Пальто</span>
                            <span className={c.button}>Плащи</span>
                            <span className={c.button}>Пуховики</span>
                            <span className={c.button}>Пиджаки</span>
                        </div>
                        <span className={c.categoryButton}>
                        Обувь
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button}>Сапоги</span>
                            <span className={c.button}>Ботинки</span>
                            <span className={c.button}>Туфли</span>
                            <span className={c.button}>Босоножки</span>
                            <span className={c.button}>Кроссовки</span>
                        </div>
                        <span className={c.categoryButton}>
                        Аксессуары
                    </span>
                        <div className={c.categoryItem_list}>
                            <span className={c.button}>Сумки</span>
                            <span className={c.button}>Ремни</span>
                            <span className={c.button}>Шляпы</span>
                            <span className={c.button}>Бижутерия</span>
                            <span className={c.button}>Шарфы</span>
                        </div>
                        <span className={c.button}>
                        <span>
                           <img className={c.button_icon} src={plus} alt={""}/>
                        </span>
                        Добавить новый элемент
                    </span>
                    </div>
                </div>
            </div>
            <div>
                <div className={c.category}>
                    <div className={c.categoryItem_list}>
                    <span className={c.button}>
                        <span>
                            <img className={c.button_icon} src={back} alt={""}/>
                        </span>
                        Назад
                    </span>
                        <span className={c.button}>
                        <span>
                           <img className={c.button_icon} src={plus} alt={""}/>
                        </span>
                          Добавить новый элемент
                        </span>
                    </div>
                    <span className={c.categoryButton}>
                        Свитеры и кардиганы
                    </span>
                    <div className={c.gallery}>
                        <div className={c.galleryRow}>
                        <img className={c.gallery_img} src={img1} alt={""}/>
                        <img className={c.gallery_img} src={img2} alt={""}/>
                        <img className={c.gallery_img} src={img3} alt={""}/>
                        <img className={c.gallery_img} src={img4} alt={""}/>
                        </div>
                        <div className={c.galleryRow}>
                        <img className={c.gallery_img} src={img5} alt={""}/>
                        <img className={c.gallery_img} src={img6} alt={""}/>
                        <img className={c.gallery_img} src={img7} alt={""}/>
                        <img className={c.gallery_img} src={img8} alt={""}/>
                        </div>
                        <div className={c.galleryRow}>
                        <img className={c.gallery_img} src={img9} alt={""}/>
                        <img className={c.gallery_img} src={img10} alt={""}/>
                        <img className={c.gallery_img} src={img11} alt={""}/>
                        <img className={c.gallery_img} src={img12} alt={""}/>
                        </div>
                    </div>
                    <div className={c.bottomButton}>
                        <div>
                        <span className={c.button}>
                            В начало
                        </span>
                        <span className={c.button}>
                            Предыдущая
                        </span>
                        </div>
                        <div>
                        <span className={c.button}>
                            Следующая
                        </span>
                        <span className={c.button}>
                            В конец
                        </span>
                        </div>
                    </div>
                </div>
            </div>
            <span className={c.button + " " + c.button_save}>
                Сохранить
            </span>
        </div>
    )
}

export default withAuthRedirect(Create);