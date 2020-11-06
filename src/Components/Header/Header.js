import React from "react";
import {Link} from "react-router-dom";
import c from "./Header.module.css";
import search from "../../assets/image/Header/search.svg";
import plus from "../../assets/image/Header/plus.svg";
import user from "../../assets/image/Header/user.svg";
import {connect} from "react-redux";
import {Logout} from "../../Reducers/userReducer";

const Header = (props) => {
    return (
        <div>
            <Link className={c.LOGO} to={"/"}>MY<span>WARDROBE</span></Link>
            <Link onClick={props.Logout} to={"/auth"} className={c.exit_btn}>
                {
                    props.isAuth ? "Выйти" : "Войти"
                }
            </Link>
            <div className={c.frame}>
                <Link to="/find" className={c.header_btn}>
                    <span>
                      <img src={search} alt={""}/>
                    </span>
                    НАЙТИ ОБРАЗ
                </Link>
                <Link to="/create" className={c.header_btn}>
                    <span>
                      <img src={plus} alt={""}/>
                    </span>
                    СОЗДАТЬ ОБРАЗ
                </Link>
                <Link to="profile" className={c.header_btn}>
                    <span>
                      <img src={user} alt={""}/>
                    </span>
                    МОЯ СТРАНИЦА
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => (
    {
        isAuth: state.user.isAuth
    }
)

export default connect(mapStateToProps, {Logout})(Header);