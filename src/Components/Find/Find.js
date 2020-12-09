import React from "react";
import c from "./Find.module.css";
import Header from "../Header/Header";
import logo from "../../assets/image/logo.svg";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {Criterion} from "./Criterion";
import {Category} from "./Category";
import {deleteLike, getCollageAll, getCollageAllCategory, likeCollage} from "../../API/CollageAPI";
import {Element} from "./Element";


class Find extends React.Component {

    state = {
        category: "",
        search: 1,
        sort: "Likes",
        Photos: [],
        count: 0,
        block: false,
        page: 0,
        lastPage: 0,
        style: "",
        dresscode: "",
        season: "",
        offset: 0,
    }

    componentDidMount() {
        this.getCollages()
    }

    onChangeValue = async (e) => {
        await this.setState({search: Number(e.target.value)})
        this.getCollages()
    }

    getCollages = async () => {
        let data;
        if (this.state.search === 1)
            data = await getCollageAll(this.state.style, this.state.season,
                this.state.dresscode, this.state.sort, this.state.offset, 6)
        else
            data = await getCollageAllCategory(this.state.category,this.state.offset, 6, this.state.sort)
        this.setState({Photos: data.rows, count: data.count})
        let LP = Math.ceil(this.state.count / 6 - 1);
        this.setState({
            block: false,
            lastPage: LP === -1 ? 0 : LP
        })
    }

    onLike = (id) => async () => {
        if (this.state.Photos.find(u => u.idCollage === id).isLike) {
            let data = await deleteLike(id);
            if (data.isDeleteLike) {
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
            if (data.isLike) {
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

    changeSort = async (e) => {
        await this.setState({sort: e.target.value, offset: 0, page: 0});
        this.getCollages();
    }

    onChangeCriterion = (key, value) => async () => {
        await this.setState({[key]: this.state[key] === value ? "" : value});
        this.getCollages();
    }

    onChangeCategory = (value) => async () => {
        await this.setState({category: this.state.category === value ? "" : value});
        this.getCollages();
    }

    changePage = (page) => async () => {
        if (page >= 0 && page <= this.state.lastPage) {
            await this.setState({page, block: true, offset: page*6});
            this.getCollages()
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <div className={c.mainFrame}>
                    <div className={c.searchSpace}>
                        <select
                            onChange={this.onChangeValue}
                            className={c.button__dark}
                            value={this.state.search}
                            required>
                            <option value={1}>По критериям</option>
                            <option value={0}>По категориям</option>
                        </select>
                        {this.state.search === 1 && <Criterion
                            style={this.state.style}
                            dresscode={this.state.dresscode}
                            season={this.state.season}
                            onChangeCriterion={this.onChangeCriterion}/>}
                        {this.state.search === 0 && <Category
                        onChangeCategory={this.onChangeCategory}
                        category={this.state.category}/>}
                    </div>
                    <div className={c.searchResult}>
                        <select value={this.state.sort} onChange={this.changeSort}
                                className={c.button__light + " " + c.button__light__brown} required>
                            <option value={"Likes"}>
                                По популярности
                            </option>
                            <option value={"CreationDate"}>
                                По дате добавления
                            </option>
                        </select>
                        <div className={c.gallery}>
                            {this.state.Photos.map(u => <Element key={u.idCollage}
                                                                 isLike={u.isLike}
                                                                 likes={u.Likes}
                                                                 src={"data:image/png;base64," + u.Photo}
                                                                 onLike={this.onLike(u.idCollage)}/>)}
                        </div>
                        <div className={c.bottomButtonsLeft}>
                        <span className={this.state.block || this.state.page === 0
                            ? c.button__light + " " + c.button__light__brown
                            + " " + c.button_disabled + " " + c.margin
                            : c.button__light + " " + c.button__light__brown
                            + " " + c.margin}
                              onClick={this.changePage(0)}>
                        В начало
                    </span>
                            <span onClick={this.changePage(this.state.page - 1)}
                                  className={this.state.block || this.state.page === 0
                                      ? c.button__light + " " + c.button__light__brown
                                      + " " + c.button_disabled
                                      : c.button__light + " " + c.button__light__brown}>
                        Предыдущая
                    </span>
                        </div>
                        <div className={c.bottomButtonsRight}>
                        <span onClick={this.changePage(this.state.page + 1)}
                              className={this.state.block || this.state.page === this.state.lastPage
                                  ? c.button__light + " " + c.button__light__brown
                                  + " " + c.button_disabled + " " + c.margin
                                  : c.button__light + " " + c.button__light__brown
                                  + " " + c.margin}>
                        Следующая
                    </span>
                            <span onClick={this.changePage(this.state.lastPage)}
                                  className={this.state.block || this.state.page === this.state.lastPage
                                      ? c.button__light + " " + c.button__light__brown
                                      + " " + c.button_disabled
                                      : c.button__light + " " + c.button__light__brown}>
                            В конец
                        </span>
                        </div>
                    </div>
                </div>
                <div className={c.bottom}>
                    <img className={c.bottom_icon} src={logo} alt={""}/>
                </div>
            </div>
        )
    }
}

export default withAuthRedirect(Find);