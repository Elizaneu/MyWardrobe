import React from "react";
import c from "./Find.module.css";

export const Category = ({onChangeCategory, category}) => {
    return (

        <div className={c.category_items}>
                    <span className={c.button__dark}>
                       Верх
                    </span>
            <div className={c.categoryItem_list}>
                <span onClick={onChangeCategory("Футболки и топы")}
                      className={category === "Футболки и топы" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Футболки и топы</span>
                <span onClick={onChangeCategory("Свитеры и кардиганы")}
                      className={category === "Свитеры и кардиганы" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Свитеры и кардиганы</span>
                <span onClick={onChangeCategory("Рубашки и блузы")}
                      className={category === "Рубашки и блузы" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Рубашки и блузы</span>
            </div>
            <span className={c.button__dark}>
                        Низ
                    </span>
            <div className={c.categoryItem_list}>
                <span onClick={onChangeCategory("Юбки")}
                      className={category === "Юбки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Юбки</span>
                <span onClick={onChangeCategory("Брюки")}
                      className={category === "Брюки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Брюки</span>
                <span onClick={onChangeCategory("Джинсы")}
                      className={category === "Джинсы" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Джинсы</span>
                <span onClick={onChangeCategory("Шорты")}
                      className={category === "Шорты" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Шорты</span>
            </div>
            <span className={c.button__dark}>
                        Самостоятельные единицы
                    </span>
            <div className={c.categoryItem_list}>
                <span onClick={onChangeCategory("Комбинезоны")}
                      className={category === "Комбинезоны" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Комбинезоны</span>
                <span onClick={onChangeCategory("Платья")}
                      className={category === "Платья" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Платья</span>
                <span onClick={onChangeCategory("Купальники")}
                      className={category === "Купальники" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Купальники</span>
            </div>
            <span className={c.button__dark}>
                        Верхняя одежда
                    </span>
            <div className={c.categoryItem_list}>
                <span onClick={onChangeCategory("Куртки")}
                      className={category === "Куртки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Куртки</span>
                <span onClick={onChangeCategory("Пальто")}
                      className={category === "Пальто" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Пальто</span>
                <span onClick={onChangeCategory("Плащи")}
                      className={category === "Плащи" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Плащи</span>
                <span onClick={onChangeCategory("Пуховики")}
                      className={category === "Пуховики" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Пуховики</span>
                <span onClick={onChangeCategory("Пиджаки")}
                      className={category === "Пиджаки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Пиджаки</span>
            </div>
            <span className={c.button__dark}>
                        Обувь
                    </span>
            <div className={c.categoryItem_list}>
                <span onClick={onChangeCategory("Сапоги")}
                      className={category === "Сапоги" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Сапоги</span>
                <span onClick={onChangeCategory("Ботинки")}
                      className={category === "Ботинки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Ботинки</span>
                <span onClick={onChangeCategory("Туфли")}
                      className={category === "Туфли" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Туфли</span>
                <span onClick={onChangeCategory("Босоножки")}
                      className={category === "Босоножки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Босоножки</span>
                <span onClick={onChangeCategory("Кроссовки")}
                      className={category === "Кроссовки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Кроссовки</span>
            </div>
            <span className={c.button__dark}>
                        Аксессуары
                    </span>
            <div className={c.categoryItem_list}>
                <span onClick={onChangeCategory("Сумки")}
                      className={category === "Сумки" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Сумки</span>
                <span onClick={onChangeCategory("Ремни")}
                      className={category === "Ремни" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Ремни</span>
                <span onClick={onChangeCategory("Шляпы")}
                      className={category === "Шляпы" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Шляпы</span>
                <span onClick={onChangeCategory("Бижутерия")}
                      className={category === "Бижутерия" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Бижутерия</span>
                <span onClick={onChangeCategory("Шарфы")}
                      className={category === "Шарфы" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>Шарфы</span>
            </div>
        </div>
    )
}