import React from "react";
import c from "./Find.module.css";

export const Category = (props) => {
    return (

        <div className={c.category_items}>
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
    )
}