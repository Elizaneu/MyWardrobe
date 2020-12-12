import React from "react";
import c from "./Profile.module.css";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import logo from "../../assets/image/logo.svg";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getCollage} from "../../API/CollageAPI";

class Profile extends React.Component {
    state = {
        Photos: [],
        count: 0,
    }
    isMount = false;

    async componentDidMount() {
        this.isMount = true;
        let data = await getCollage("", "", "", 0, 6, "Likes")
        if (this.isMount)
            this.setState({Photos: data.rows, count: data.count})
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className={c.main_frame}>
                    <p className={c.name}>
                        {this.props.curUser.FirstName + " " + this.props.curUser.LastName}
                    </p>
                    <div className={c.menu}>
                        <Link to={'/wardrobe'} className={c.menu_btn}>
                            Мой гардероб
                        </Link>
                        <Link to={'/outfits'} className={c.menu_btn}>
                            Мои образы
                        </Link>
                        <Link to={'/favourites'} className={c.menu_btn}>
                            Избранное
                        </Link>
                        <Link to={'/settings'} className={c.menu_btn}>
                            Настройки
                        </Link>
                    </div>
                    <p className={c.main_text}>
                        Твои лучшие образы по мнению других пользователей
                    </p>
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
                        Создай свой собственный стиль
                    </p>
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    curUser: state.user.currentUser,
})

export default connect(mapStateToProps, {})(withAuthRedirect(Profile));