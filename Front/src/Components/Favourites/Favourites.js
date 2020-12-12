import React from "react";
import c from "./Favourites.module.css";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import logo from "../../assets/image/logo.svg";
import {deleteLike, getCollageAll, getLikedCollage, likeCollage} from "../../API/CollageAPI";
import {Element} from "../Find/Element";


class Favourites extends React.Component {
    state = {
        Photos: [],
        block: false,
        editMod: false,
        page: 0,
        lastPage: 0
    }
    isMount = false;

    async componentDidMount() {
        this.isMount = true;
        this.setState({block: true});
        let data = await getLikedCollage("","","","Likes",0, 12)
        if (this.isMount)
            this.setState({Photos: data.rows.map(d => ({...d, delete: false}))})
        let LP = Math.ceil(data.count / 12 - 1)
        if (this.isMount)
            this.setState({
                block: false,
                lastPage: LP === -1 ? 0 : LP
            })
    }

    changePage = (page) => async () => {
        if (page >= 0 && page <= this.state.lastPage) {
            this.setState({page, block: true});
            let data = await getCollageAll("","","","Likes", page * 12, 12);
            let LP = Math.ceil(data.count / 12 - 1)
            if (this.isMount)
                this.setState({
                    block: false,
                    Photos: data.rows.map(d => ({...d, delete: false})),
                    lastPage: LP === -1 ? 0 : LP
                })
        }
    };

    onLike = (id) => async () => {
        if (this.state.Photos.find(u => u.idCollage === id).isLike) {
            let data = await deleteLike(id);
            if (data.isDeleteLike && this.isMount) {
                this.setState(state => ({
                    ...state,
                    Photos: state.Photos.map(u => {
                        if (u.idCollage === id)
                            return {...u, isLike: false, Likes: u.Likes - 1}
                        else
                            return u;
                    })
                }))
            }
        } else {
            let data = await likeCollage(id);
            if (data.isLike && this.isMount) {
                this.setState(state => ({
                    ...state,
                    Photos: state.Photos.map(u => {
                        if (u.idCollage === id)
                            return {...u, isLike: true, Likes: u.Likes + 1}
                        else
                            return u;
                    })
                }))
            }
        }
    }

    componentWillUnmount () {
        this.isMount = false;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={c.mainFrame}>
                    <p className={c.mainFrame__title}>
                        Избранное
                    </p>
                    <div className={c.mainFrame_gallery}>
                        {this.state.Photos.map(u => <Element
                            key={u.idCollage}
                            likes={u.Likes}
                            isLike={u.isLike}
                            onLike={this.onLike(u.idCollage)}
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

export default withAuthRedirect(Favourites);