import React from "react";
import c from "./Outfits.module.css";
import Header from "../Header/Header";
import logo from "../../assets/image/logo.svg";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {Categories} from "../../Lists/Categories";
import {Dresscode} from "../../Lists/Dresscode";
import {Style} from "../../Lists/Styles";
import {Season} from "../../Lists/Seasons";
import {confirmAlert} from "react-confirm-alert";
import {deleteCollage, getCollage} from "../../API/CollageAPI";

class Outfits extends React.Component {
    state = {
        option: "Категории",
        Photos: [],
        block: false,
        editMod: false,
        page: 0,
        lastPage: 0,
        style: "Стиль",
        dresscode: "Дресс-код",
        season: "Сезон",
    }

    confirmDeleteMessage = {
        title: "Удаление коллажей",
        message: "Подтвердите удаление коллажей",
        buttons: [
            {
                label: "Да",
                onClick: () => {
                    this.state.Photos.forEach((photo) => {
                        if (photo.delete)
                            deleteCollage(photo.idCollage)
                    })
                    this.setState({
                        Photos: this.state.Photos.filter((photo) => {
                            return !photo.delete
                        })
                    })
                }
            },
            {
                label: "Нет"
            }
        ]
    }

    alertMessage = {
        message: "Выберите элементы, которые нужно удалить",
        buttons: [
            {
                label: "Ок"
            }
        ]
    }

    async componentDidMount() {
        this.setState({block: true})
        let dresscode = this.state.dresscode === "Дресс-код" ? "" : this.state.dresscode;
        let season = this.state.season === "Сезон" ? "" : this.state.season;
        let style = this.state.style === "Стиль" ? "" : this.state.style;
        let data = await getCollage(style, season, dresscode);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        let LP = Math.ceil(data.count / 12 - 1)
        this.setState({block: false,
            lastPage: LP === -1 ? 0 : LP} )
    }

    onChangeValue = (name) => async (e) => {
        await this.setState({
            [name]: e.target.value
        });
        this.setState({block: true});
        let category = this.state.option === "Категории" ? "" : this.state.option;
        let dresscode = this.state.dresscode === "Дресс-код" ? "" : this.state.dresscode;
        let season = this.state.season === "Сезон" ? "" : this.state.season;
        let style = this.state.style === "Стиль" ? "" : this.state.style;
        let data = await getCollage(category, style, season, dresscode);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        let LP = Math.ceil(data.count / 12 - 1)
        this.setState({block: false,
            lastPage: LP === -1 ? 0 : LP} )
    }

    chooseForDelete = (photoId) => () => {
        if (this.state.editMod) {
            this.setState({
                Photos: this.state.Photos.map((photo) => {
                    if (photoId !== photo.idCollage)
                        return photo
                    else
                        return {
                            ...photo,
                            delete: !photo.delete
                        }
                })
            })
        }
    }

    buttonDelete = () => {
        if (this.state.editMod) {
            confirmAlert(this.confirmDeleteMessage)
        }
        if (!this.state.editMod) {
            confirmAlert(this.alertMessage)
        }
        this.setState({editMod: !this.state.editMod})
    }

    changePage = (page) => async () => {
        if (page >= 0 && page <= this.state.lastPage) {
            this.setState({page, block: true});
            let data = await getCollage(this.state.option, page * 12);
            let LP = Math.ceil(data.count / 12 - 1)
            this.setState({
                block: false,
                Photos: data.rows.map(d => ({...d, delete: false})),
                lastPage: LP === -1 ? 0 : LP})
        }
    };
    render() {
        return (
            <div>
                <Header/>
                <div className={c.mainFrame}>
                    <p className={c.mainFrame__title}>
                        Мои образы
                    </p>
                    <div className={c.mainFrame_topButtons}>
                        <select className={c.button}
                                value={this.state.option}
                                required
                                disabled={this.state.block}
                                onChange={this.onChangeValue("option")}
                            >
                            {
                                <option key={"Категории"}>Категории</option>
                            }
                            {
                                Categories.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <select className={c.button}
                                value={this.state.style}
                                required
                                disabled={this.state.block}
                                onChange={this.onChangeValue("style")}
                            >
                            {
                                <option key={"Стиль"}>Стиль</option>
                            }
                            {
                                Style.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <select className={c.button}
                                value={this.state.dresscode}
                                required
                                onChange={this.onChangeValue("dresscode")}
                                disabled={this.state.block}
                        >
                            {
                                <option key={"Дресс-код"}>Дресс-код</option>
                            }
                            {
                                Dresscode.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <select className={c.button}
                                value={this.state.season}
                                required
                                onChange={this.onChangeValue("season")}
                                disabled={this.state.block}
                        >
                            {
                                <option key={"Сезон"}>Сезон</option>
                            }
                            {
                                Season.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>

                        <span onClick={this.buttonDelete}
                              className={c.button}>
                        {this.state.editMod ? "Применить" : "Удалить"}
                    </span>
                    </div>
                    <div className={c.mainFrame_gallery}>
                        {this.state.Photos.map(u => <img
                            key={u.idCollage}
                            className={u.delete ? c.onDelete + " " + c.mainFrame_gallery_img : c.mainFrame_gallery_img}
                            onClick={this.chooseForDelete(u.idCollage)}
                            src={"data:image/png;base64," + u.Photo}
                            alt=""/>)}
                    </div>
                    <div className={c.mainFrame_bottomButtonsLeft}>
                    <span className={this.state.block || this.state.page === 0
                        ? c.button + " " + c.button_disabled
                        : c.button}
                          onClick={this.changePage(0)}>
                        В начало
                    </span>
                        <span onClick={this.changePage(this.state.page - 1)}
                              className={this.state.block || this.state.page === 0
                                  ? c.button + " " + c.button_disabled
                                  : c.button}>
                        Предыдущая
                    </span>
                    </div>
                    <div className={c.mainFrame_bottomButtonsRight}>
                    <span onClick={this.changePage(this.state.page + 1)}
                          className={this.state.block || this.state.page === this.state.lastPage
                              ? c.button + " " + c.button_disabled
                              : c.button}>
                        Следующая
                    </span>
                        <span onClick={this.changePage(this.state.lastPage)}
                              className={this.state.block || this.state.page === this.state.lastPage
                                  ? c.button + " " + c.button_disabled
                                  : c.button}>
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
}

export default withAuthRedirect(Outfits);