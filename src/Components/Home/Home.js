import React from "react";
import c from "./Home.module.css";
import Header from "../Header/Header";
import img1 from "../../assets/image/Gallery/img1.jpg";
import img2 from "../../assets/image/Gallery/img2.jpg";
import img3 from "../../assets/image/Gallery/img3.jpg";
import img4 from "../../assets/image/Gallery/img4.jpg";
import img5 from "../../assets/image/Gallery/img5.jpg";
import img6 from "../../assets/image/Gallery/img6.jpg";
import logo from "../../assets/image/logo.svg"
import {getCollageAll} from "../../API/CollageAPI";


const Gallery = [
    {
        photo: img1,
    },
    {
        photo: img2,
    },
    {
        photo: img3,
    },
    {
        photo: img4,
    },
    {
        photo: img5,
    },
    {
        photo: img6,
    },
]

class Home extends React.Component {
    state = {
        Photos: [],
        count: 0,
    }

    async componentDidMount() {
        let data = await getCollageAll("", "", "", "Likes", 0, 6)
        this.setState({Photos: data.rows, count: data.count})
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
                    <img className={c.icon} src={logo}/>
                    <p className={c.quote}>
                        Одежда украшает человека
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;