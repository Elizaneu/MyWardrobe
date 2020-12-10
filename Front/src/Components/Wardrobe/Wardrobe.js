import React from "react";
import c from "./Wardrobe.module.css";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import plus from "../../assets/image/Header/plus.svg";
import {Categories} from "../../Lists/Categories";
import {deleteThing, getThing} from "../../API/ThingAPI";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";

class Wardrobe extends React.Component {
    state = {
        option: Categories[0].option,
        Photos: [],
        block: false,
        editMod: false,
        page: 0,
        lastPage: 0
    }

    confirmDeleteMessage = {
        title: "Удаление элементов",
        message: "Подтвердите удаление элементов гардероба",
        buttons: [
            {
                label: "Да",
                onClick: () => {
                    this.state.Photos.forEach((photo) => {
                        if (photo.delete)
                            deleteThing(photo.idThing)
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
            },

        ],
        afterClose: () => {
            this.setState(state=>({
                ...state,
                Photos: state.Photos.map(u=>({...u, delete: false}))
            }))
        }
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
        let data = await getThing(this.state.option);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        let LP = Math.ceil(data.count / 12 - 1)
        this.setState({
            block: false,
            lastPage: LP === -1 ? 0 : LP
        })
    }

    onChangeValue = async (e) => {
        this.setState({option: e.target.value})
        this.setState({block: true})
        let data = await getThing(e.target.value);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        let LP = Math.ceil(data.count / 12 - 1)
        this.setState({
            block: false,
            lastPage: LP === -1 ? 0 : LP
        })
    }

    chooseForDelete = (photoId) => () => {
        if (this.state.editMod) {
            this.setState({
                Photos: this.state.Photos.map((photo) => {
                    if (photoId !== photo.idThing)
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
        if (this.state.Photos.length === 0)
            return
        if (this.state.editMod) {
            if (this.state.Photos.find(u=>u.delete===true))
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
            let data = await getThing(this.state.option, page * 12);
            let LP = Math.ceil(data.count / 12 - 1)
            this.setState({
                block: false,
                Photos: data.rows.map(d => ({...d, delete: false})),
                lastPage: LP === -1 ? 0 : LP
            })
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <div className={c.mainFrame}>
                    <div className={c.mainFrame_topButton + " " + c.mainFrame_topButton__left}>
                        <select className={c.button}
                                value={this.state.option}
                                required
                                onChange={this.onChangeValue}
                                disabled={this.state.block}>
                            {
                                Categories.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <Link to='/add' className={c.button}>
                    <span>
                        <img className={c.button_icon} src={plus} alt={""}/>
                    </span>
                            Добавить новый элемент
                        </Link>
                    </div>
                    <span onClick={this.buttonDelete}
                          className={this.state.Photos.length === 0 ? c.button + " " + c.button_disabled
                              + " " + c.mainFrame_topButton + " " + c.mainFrame_topButton__right:
                              c.button + " " + c.mainFrame_topButton + " " + c.mainFrame_topButton__right}>
                        {this.state.editMod ? "Применить" : "Удалить"}
                    </span>
                    <div className={c.mainFrame_gallery}>
                        {this.state.Photos.map(u => <img
                            key={u.idThing}
                            className={u.delete ? c.onDelete + " " + c.mainFrame_gallery_img : c.mainFrame_gallery_img}
                            src={"data:image/png;base64," + u.Photo}
                            onClick={this.chooseForDelete(u.idThing)}
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
            </div>
        )
    }
}

export default withAuthRedirect(Wardrobe);