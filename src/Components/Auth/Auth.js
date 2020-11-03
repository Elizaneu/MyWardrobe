import React from 'react';
import  {Link, Redirect} from "react-router-dom";
import c from "./Auth.module.css";
import user from "../../assets/image/login/user.svg";
import password from "../../assets/image/login/password.svg";
import logo from "../../assets/image/logo.svg";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Login} from "../../Reducers/userReducer";

const AuthForm = reduxForm({form: "auth"})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <img className={c.icon} src={logo} alt={""}/>
            <div className={c.title}>Авторизация</div>
            <div className={c.email_borders}>
                <img src={user} className={c.up_image} alt={""}/>
                <Field component="input"
                       name="Email"
                       type="email"
                       className={c.borders}
                       placeholder="Электронная почта"/>
            </div>
            <div className={c.password_borders}>
                <img src={password} className={c.up_image} alt={""}/>
                <Field component="input"
                       name="Password"
                       type="password"
                       className={c.borders}
                       placeholder="Пароль"/>
            </div>
            <button className={c.form_btn} type="submit">Войти</button>
            <Link className={c.register} to={"/reg"}>Регистрация</Link>
            <Link className={c.forget_pass} to={"/rec"}>Забыли пароль?</Link>
        </form>
    )
})

class Auth extends React.Component {

    Submit = (data) => {
        this.props.Login(data.Email, data.Password, true)
    }

    render() {
        if (this.props.isAuth){
            return <Redirect to="/"/>
        }
        return (
            <div className={c.Content}>
                <Link className={c.LOGO} to={"/home"}>
                    MY<span>WARDROBE</span>
                </Link>
                <AuthForm onSubmit={this.Submit}/>
                <div>
                    {this.props.message}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.user.message,
    isAuth: state.user.isAuth
})

export default connect(mapStateToProps, {Login})(Auth);