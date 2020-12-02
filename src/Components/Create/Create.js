import React from "react";
import Header from "../Header/Header";
import c from "./Create.module.css";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import plus from "../../assets/image/Header/plus.svg";
import {Link} from "react-router-dom";
import {Categories} from "../../Lists/Categories";
import {getThing} from "../../API/ThingAPI";
import {createCollage} from "../../API/CollageAPI";
import {Style} from "../../Lists/Styles";
import {Dresscode} from "../../Lists/Dresscode";
import {Season} from "../../Lists/Seasons";
import {saveCollage} from "../../Validate/validators";

class Create extends React.Component {

    state = {
        option: Categories[0].option,
        Photos: [],
        block: false,
        page: 0,
        lastPage: 0,
        chosenPhotos: [],
        style: "Кэжуал",
        dresscode: "Прогулка",
        season: "Осень",
        isCreated: false,
    }
    ref = React.createRef();

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

    changePage = (page) => async () => {
        if (page >= 0) {
            this.setState({page, block: true});
            let data = await getThing(this.state.option, page * 12);
            let LP = Math.ceil(data.count / 12 - 1);
            this.setState({
                block: false,
                Photos: data.rows.map(d => ({...d, delete: false})),
                lastPage: LP === -1 ? 0 : LP
            });
        }
    };

    choosePhoto = (photo) => async () => {
        if (this.state.chosenPhotos.find(p => p.idThing === photo.idThing)) {
            await this.setState(state => ({
                ...state,
                chosenPhotos: state.chosenPhotos.filter(p => p.idThing !== photo.idThing)
            }))
        } else {
            await this.setState(state => ({
                ...state,
                chosenPhotos: [...state.chosenPhotos, photo]
            }))
        }
        this.canvasRender();
    }

    canvasRender = () => {
        const canvas = this.ref.current;
        const ctx = canvas.getContext('2d');
        if (this.state.chosenPhotos.length === 0) {
            ctx.putImageData(new ImageData(500, 500), 0, 0)
        }
        if (this.state.chosenPhotos.length === 1) {
            const img = new Image();
            img.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img, 0, 0, 500, 500)
        }
        if (this.state.chosenPhotos.length === 2) {
            const img1 = new Image(), img2 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 250, 250, 250, 250)
        }
        if (this.state.chosenPhotos.length === 3) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 0, 250, 250, 250)
            ctx.drawImage(img3, 250, 125, 250, 250)
        }
        if (this.state.chosenPhotos.length === 4) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo
            img4.src = "data:image/png;base64," + this.state.chosenPhotos[3].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 0, 250, 250, 250)
            ctx.drawImage(img3, 250, 0, 250, 250)
            ctx.drawImage(img4, 250, 250, 250, 250)
        }
        if (this.state.chosenPhotos.length === 5) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image(),
                img5 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo
            img4.src = "data:image/png;base64," + this.state.chosenPhotos[3].Photo
            img5.src = "data:image/png;base64," + this.state.chosenPhotos[4].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 0, 0, 250, 250)
            ctx.drawImage(img2, 0, 250, 250, 250)
            ctx.drawImage(img3, 300, 0, 150, 150)
            ctx.drawImage(img4, 300, 175, 150, 150)
            ctx.drawImage(img5, 300, 350, 150, 150)
        }
        if (this.state.chosenPhotos.length === 6) {
            const img1 = new Image(), img2 = new Image(), img3 = new Image(), img4 = new Image(),
                img5 = new Image(), img6 = new Image();
            img1.src = "data:image/png;base64," + this.state.chosenPhotos[0].Photo
            img2.src = "data:image/png;base64," + this.state.chosenPhotos[1].Photo
            img3.src = "data:image/png;base64," + this.state.chosenPhotos[2].Photo
            img4.src = "data:image/png;base64," + this.state.chosenPhotos[3].Photo
            img5.src = "data:image/png;base64," + this.state.chosenPhotos[4].Photo
            img6.src = "data:image/png;base64," + this.state.chosenPhotos[5].Photo

            ctx.putImageData(new ImageData(500, 500), 0, 0)
            ctx.drawImage(img1, 33, 0, 150, 150)
            ctx.drawImage(img2, 33, 175, 150, 150)
            ctx.drawImage(img3, 33, 350, 150, 150)
            ctx.drawImage(img4, 292, 0, 150, 150)
            ctx.drawImage(img5, 292, 175, 150, 150)
            ctx.drawImage(img6, 292, 350, 150, 150)
        }
    }

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    onSelectChange = (name) => async (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    onSave = async () => {
        if (this.state.chosenPhotos.length !== 0) {
            const photo = this.ref.current.toDataURL('image/png')
            const file = this.dataURLtoFile(photo, "bla.png")
            let data = await createCollage(file, this.state.style, this.state.dresscode,
                this.state.season, this.state.chosenPhotos.map(p => p.idThing))
            console.log(data);
        } else
            console.log("oops");
        this.setState({chosenPhotos: []});
        this.canvasRender();
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={c.canvas}>
                    <canvas ref={this.ref} width="500px" height="500px">
                        Обновите браузер!!!
                    </canvas>
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
                            className={this.state.chosenPhotos.find(p => p.idThing === u.idThing) ? c.gallery_img + " " + c.chosen : c.gallery_img}
                            src={"data:image/png;base64," + u.Photo}
                            onClick={this.choosePhoto(u)}
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
                        <span onClick={this.changePage(this.state.page + 1)}
                              className={this.state.block || this.state.page === this.state.lastPage
                                  ? c.button + " " + c.button_disabled + ' ' + c.margin
                                  : c.button + ' ' + c.margin}>
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
                    <div className={c.bottom_text}>
                        Укажите характеристики коллажа:
                    </div>
                    <div className={c.criterion}>
                        <select className={c.categoryButton}
                                value={this.state.style}
                                required
                                onChange={this.onSelectChange("style")}
                                disabled={this.state.block}>
                            {
                                Style.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <select className={c.categoryButton}
                                value={this.state.dresscode}
                                required
                                onChange={this.onSelectChange("dresscode")}
                                disabled={this.state.block}>
                            {
                                Dresscode.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                        <select className={c.categoryButton}
                                value={this.state.season}
                                required
                                onChange={this.onSelectChange("season")}
                                disabled={this.state.block}>
                            {
                                Season.map(u => <option key={u.option}>{u.option}</option>)
                            }
                        </select>
                    </div>
                    <span className={this.state.chosenPhotos.length === 0 ? c.button + " " + c.button_save
                        + " " + c.button_disabled : c.button + " " + c.button_save}
                          onClick={this.onSave}>
                        Сохранить
                    </span>
                </div>

            </div>
        )
    }
}

export default withAuthRedirect(Create);