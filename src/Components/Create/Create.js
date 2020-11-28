import React from "react";
import Header from "../Header/Header";
import c from "./Create.module.css";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import plus from "../../assets/image/Header/plus.svg";
import {Link} from "react-router-dom";
import {Categories} from "../../Categories";
import {getThing} from "../../API/ThingAPI";
import {ReactPhotoCollage} from "react-photo-collage";
import img1 from '../../assets/image/Wardrobe/img1.jpg'

const Setting = {
    width: '600px',
    height: ['600px'],
    layout: [1,5],
    photos: [
        {src: '../../assets/image/Wardrobe/img1.jpg'},
        {src: '../../assets/image/Wardrobe/img2.jpg'},
        {src: '../../assets/image/Wardrobe/img3.jpg'},
        {src: '../../assets/image/Wardrobe/img4.jpg'},
        {src: '../../assets/image/Wardrobe/img5.jpg'},
    ],
    showNumOfRemainingPhotos: true
}

class Create extends React.Component {

    state = {
        option: Categories[0].option,
        Photos: [],
        block: false,
        page: 0
    }

    async componentDidMount() {
        this.setState({block: true})
        let data = await getThing(this.state.option);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        this.setState({block: false})
    }

    onChangeValue = async (e) => {
        this.setState({option: e.target.value})
        this.setState({block: true})
        let data = await getThing(e.target.value);
        this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        this.setState({block: false})
    }

    changePage = (page) => async () => {
        if (page >= 0) {
            this.setState({page, block: true});
            let data = await getThing(this.state.option, page * 12);
            this.setState({block: false, Photos: data.rows.map(d => ({...d, delete: false}))});
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <div className={c.canvas}>
                    <ReactPhotoCollage {...Setting}/>
                </div>
                <div className={c.container}>
                    <div className={c.topButtons}>
                        <select className={c.categoryButton}
                                value={this.state.option}
                                required
                                onChange={this.onChangeValue}
                                disabled={this.state.block}>
                            {
                                Categories.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <Link to={"/add"} className={c.button}>
                        <span>
                           <img className={c.button_icon} src={plus} alt={""}/>
                        </span>
                            Добавить новый элемент
                        </Link>
                    </div>

                    <div className={c.gallery}>
                        {this.state.Photos.map(u => <img
                            key={u.idThing}
                            className={c.gallery_img}
                            src={"data:image/png;base64," + u.Photo}
                            alt=""/>)}
                    </div>
                    <div className={c.bottomButtonsLeft}>
                        <span className={this.state.block || this.state.page === 0
                            ? c.button + " " + c.button_disabled + " " + c.margin
                            : c.button + " " + c.margin}
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
                    <div className={c.bottomButtonsRight}>
                        <span onClick={this.changePage(this.state.page + 1)} className={c.button + ' ' + c.margin}>
                        Следующая
                    </span>
                        <span className={c.button}>
                            В конец
                        </span>
                    </div>
                </div>
                <span className={c.button + " " + c.button_save}>
                    Сохранить
                </span>
            </div>
        )
    }
}

export default withAuthRedirect(Create);