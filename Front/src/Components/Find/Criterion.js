import React from "react";
import c from "./Find.module.css";

export const Criterion = ({style, dresscode, season, onChangeCriterion}) => {
    return (
        <div className={c.category_items}>
                        <span className={c.button__dark}>
                            Стиль
                        </span>
            <div className={c.categoryItem_list}>
                    <span onClick={onChangeCriterion("style", "Классика")}
                          className={style === "Классика" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Классика
                    </span>
                <span onClick={onChangeCriterion("style", "Кэжуал")}
                      className={style === "Кэжуал" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Кэжуал
                    </span>
                <span onClick={onChangeCriterion("style", "Преппи")}
                      className={style === "Преппи" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Преппи
                    </span>
            </div>
            <div className={c.categoryItem_list}>
                    <span onClick={onChangeCriterion("style", "Гранж")}
                          className={style === "Гранж" ? c.button__light + " " + c.button_chosen
                              : c.button__light}>
                        Гранж
                    </span>
                <span onClick={onChangeCriterion("style", "Милитари")}
                      className={style === "Милитари" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Милитари
                    </span>
                <span onClick={onChangeCriterion("style", "Романтика")}
                      className={style === "Романтика" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Романтика
                    </span>
            </div>
            <div className={c.categoryItem_list}>
                    <span onClick={onChangeCriterion("style", "Минимализм")}
                          className={style === "Минимализм" ? c.button__light + " " + c.button_chosen
                              : c.button__light}>
                        Минимализм
                    </span>
                <span onClick={onChangeCriterion("style", "Глэм")}
                      className={style === "Глэм" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Глэм
                    </span>
                <span onClick={onChangeCriterion("style", "Спорт")}
                      className={style === "Спорт" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Спорт
                    </span>
            </div>
            <span className={c.button__dark}>
                    Дресс-код
                </span>
            <div className={c.categoryItem_list}>
                    <span onClick={onChangeCriterion("dresscode", "Прогулка")}
                          className={dresscode === "Прогулка" ? c.button__light + " " + c.button_chosen
                              : c.button__light}>
                        Прогулка
                    </span>
                <span onClick={onChangeCriterion("dresscode", "Работа")}
                      className={dresscode === "Работа" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Работа
                    </span>
                <span onClick={onChangeCriterion("dresscode", "Университет")}
                      className={dresscode === "Университет" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Университет
                    </span>
            </div>
            <div className={c.categoryItem_list}>
                    <span onClick={onChangeCriterion("dresscode", "Тренировка")}
                          className={dresscode === "Тренировка" ? c.button__light + " " + c.button_chosen
                              : c.button__light}>
                        Тренировка
                    </span>
                <span onClick={onChangeCriterion("dresscode", "Вечеринка")}
                      className={dresscode === "Вечеринка" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Вечеринка
                    </span>
                <span onClick={onChangeCriterion("dresscode", "Пляж")}
                      className={dresscode === "Пляж" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Пляж
                    </span>
            </div>
            <span className={c.button__dark}>
                    Сезон
                </span>
            <div className={c.categoryItem_list}>
                    <span onClick={onChangeCriterion("season", "Зима")}
                          className={season === "Зима" ? c.button__light + " " + c.button_chosen
                              : c.button__light}>
                        Зима
                    </span>
                <span onClick={onChangeCriterion("season", "Весна")}
                      className={season === "Весна" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Весна
                    </span>
                <span onClick={onChangeCriterion("season", "Лето")}
                      className={season === "Лето" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Лето
                    </span>
                <span onClick={onChangeCriterion("season", "Осень")}
                      className={season === "Осень" ? c.button__light + " " + c.button_chosen
                          : c.button__light}>
                        Осень
                    </span>
            </div>
        </div>
    )
}