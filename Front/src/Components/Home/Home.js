import React from "react";
import c from "./Home.module.css";
import Header from "../Header/Header";
import logo from "../../assets/image/logo.svg"
import {getCollageAll} from "../../API/CollageAPI";

class Home extends React.Component {
    state = {
        Photos: [],
        count: 0,
    }
    isMount = false;

    async componentDidMount() {
        this.isMount = true;
        let data = await getCollageAll("", "", "","Likes", 0, 6)
        if (this.isMount)
            this.setState({Photos: data.rows, count: data.count})
    }
    componentWillUnmount () {
        this.isMount = false;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={c.main_frame}>
                    <div className={c.main_text}>
                        <p className={c.main_text1}>
                            Вдохновение
                        </p>
                        <p className={c.main_text2}>
                            · лучшие образы ·
                        </p>
                    </div>
                    <div className={c.gallery}>
                        {this.state.Photos.map(u => <img
                            key={u.idCollage}
                            className={c.gallery_img}
                            src={"data:image/png;base64," + u.Photo}
                            alt=""/>)}
                    </div>
                </div>
                <div className={c.bottom}>
                    <img className={c.icon} src={logo} alt=""/>
                    <p className={c.quote}>
                        Одежда украшает человека
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;