import React from 'react';
import {Link, Redirect} from "react-router-dom";
import c from "./Auth.module.css";
import user from "../../assets/image/login/user.svg";
import password from "../../assets/image/login/password.svg";
import logo from "../../assets/image/logo.svg";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Login, setCreate} from "../../Reducers/userReducer";
import {confirmAlert} from "react-confirm-alert";
import "./Confirm.css"
import {require} from "../../Validate/validators";
import Input from "../common/Input/Input";

const AuthForm = reduxForm({form: "auth"})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <img className={c.icon} src={logo} alt={""}/>
            <div className={c.title}>
                Авторизация
            </div>
            <div className={c.email_borders}>
                <img src={user} className={c.up_image} alt={""}/>
                <Field component={Input}
                       errorclassname={c.errorField}
                       name="Email"
                       type="email"
                       validate={require}
                       className={c.borders}
                       placeholder="Электронная почта"/>
            </div>
            <div className={c.password_borders}>
                <img src={password} className={c.up_image} alt={""}/>
                <Field component={Input}
                       name="Password"
                       type="password"
                       errorclassname={c.errorField}
                       validate={require}
                       className={c.borders}
                       placeholder="Пароль"/>
            </div>
            <button className={c.form_btn}>
                Войти
            </button>
            <Link className={c.register} to={"/reg"}>
                Регистрация
            </Link>
        </form>
    )
})

export class Auth extends React.Component {

    alertSetting = {
        title: "Регистрация",
        message: "Пользователь зарегестрирован",
        buttons: [
            {
                label: "OK"
            }
        ]
    }

    componentDidMount() {
        if (this.props.isCreated) {
            confirmAlert(this.alertSetting)
            this.props.setCreate(false);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isCreated) {
            confirmAlert(this.alertSetting)
            this.props.setCreate(false);
        }
    }

    Submit = (data) => {
        this.props.Login(data.Email, data.Password, true)
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to="/"/>
        }
        return (
            <div className="content" className={c.Content}>
                <Link className={c.LOGO} to={"/"}>
                    MY<span>WARDROBE</span>
                </Link>
                <AuthForm onSubmit={this.Submit}/>
                <div className={c.error}>
                    {this.props.message === "error getting data" ?
                        "Необходимо заполнить все поля" :
                        this.props.message === "incorrect email or password" ?
                            "Неверная электронная почта или пароль" : this.props.message}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.user.message,
    isCreated: state.user.isCreated,
    isAuth: state.user.isAuth
})

export default connect(mapStateToProps, {Login, setCreate})(Auth);