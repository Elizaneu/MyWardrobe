import React from "react";
import c from "./Settings.module.css";
import logo from "../../assets/image/logo.svg";
import Header from "../Header/Header";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {Link, Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {confirmAlert} from "react-confirm-alert";
import {DeleteUser, EditUser} from "../../Reducers/userReducer";
import {connect} from "react-redux";
import {maxLength, minLength} from "../../Validate/validators";
import Input from "../common/Input/Input";

const maxLength30 = maxLength(30);
const minLength8 = minLength(8);

const SettingForm = reduxForm({form: "settings"})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <img className={c.icon} src={logo} alt={""}/>
            <div className={c.title}>
                Настройки
            </div>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="firstname">
                    Имя:
                </label>
                <Field
                    component={Input}
                    name="FirstName"
                    errorclassname={c.errorField}
                    className={c.form_input}
                    id="firstname"
                    validate={maxLength30}
                    type="text"/>
            </p>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="lastname">
                    Фамилия:
                </label>
                <Field
                    component={Input}
                    name="LastName"
                    errorclassname={c.errorField}
                    className={c.form_input}
                    id="lastname"
                    validate={maxLength30}
                    type="text"/>
            </p>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="pw2">
                    Новый пароль:
                </label>
                <Field
                    component={Input}
                    name="Password"
                    errorclassname={c.errorField}
                    className={c.form_input}
                    validate={minLength8}
                    id="pw2"
                    type="password"/>
            </p>
            <p className={c.form_p}>
                <label className={c.form_label} htmlFor="pw3">
                    Подтвердите пароль:
                </label>
                <Field
                    component={Input}
                    name="ConfirmPassword"
                    errorclassname={c.errorField}
                    className={c.form_input}
                    id="pw3"
                    type="password"/>
            </p>
            <button className={c.form_btn}>
                Сохранить
            </button>
        </form>
    )
})

class Settings extends React.Component {
    alertSetting = {
        title: "Удаление страницы",
        message: "Подтвердите удаление страницы",
        buttons: [
            {
                label: "Да",
                onClick: () => {
                    this.props.DeleteUser()
                }
            },
            {
                label: "Нет"
            }
        ]
    }

    state ={
        message:""
    }

    Submit = (data) => {
        if (data.Password === data.ConfirmPassword)
            this.props.EditUser(data.LastName || undefined,
                data.FirstName || undefined,
                data.Email || undefined,
                data.Password || undefined)
        else {
            this.setState({message: "Пароли не совпадают"})
            setTimeout(() => {
                this.setState({message: ""})
                }, 1000);
        }

    }

    render() {
        if (this.props.isDeleted) {
            return <Redirect to='/auth' />
        }
        return (
            <div>
                <Header/>
                <SettingForm onSubmit={this.Submit}/>
                <div className={c.error}>{this.state.message}</div>
                <span onClick={() => confirmAlert(this.alertSetting)} className={c.delete}>
                    Удалить страницу
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.user.isAuth,
    message: state.user.message,
    isDeleted: state.user.isDeleted,
})

export default connect(mapStateToProps, {EditUser, DeleteUser})(withAuthRedirect(Settings));