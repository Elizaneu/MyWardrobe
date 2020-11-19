import React from "react";
import c from "./Wardrobe.module.css";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import plus from "../../assets/image/Header/plus.svg";
import {Categories} from "../../Categories";
import {deleteThing, getThing} from "../../API/ThingAPI";
import {Link} from "react-router-dom";

class Wardrobe extends React.Component {
    state = {
        option: Categories[0].option,
        Photos: [],
        block: false,
        editMod: false
    }


    async componentDidMount() {
        this.setState({block: true})
        let data = await getThing(this.state.option);
        this.setState({Photos: data.map(d => ({...d, delete: false}))})
        this.setState({block: false})
    }

    onChangeValue = async (e) => {
        this.setState({option: e.target.value})
        this.setState({block: true})
        let data = await getThing(e.target.value);
        this.setState({Photos: data.map(d => ({...d, delete: false}))})
        this.setState({block: false})
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
        if (this.state.editMod) {
            this.state.Photos.forEach((photo) => {
                if (photo.delete)
                    deleteThing(photo.idThing)
            })
            this.setState({Photos: this.state.Photos.filter((photo) => {
                return !photo.delete
                })})
        }
        this.setState({editMod: !this.state.editMod})
    }

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
                          className={c.button + " " + c.mainFrame_topButton + " " + c.mainFrame_topButton__right}>
                        {this.state.editMod ? "Применить" : "Удалить"}
                    </span>
                    <div className={c.mainFrame_gallery}>
                        {this.state.Photos.map(u => <img
                            className={u.delete ? c.onDelete + " " + c.mainFrame_gallery_img : c.mainFrame_gallery_img}
                            src={"data:image/png;base64," + u.Photo}
                            onClick={this.chooseForDelete(u.idThing)}
                            alt=""/>)}
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
}

export default withAuthRedirect(Wardrobe);