import React from "react";
import {Link, Redirect} from "react-router-dom";
import c from "./Reg.module.css";
import logo from "../../assets/image/logo.svg";
import {Field, reduxForm} from "redux-form";
import {Register} from "../../Reducers/userReducer";
import {connect} from "react-redux";


const RegisterForm = reduxForm({form: "reg"})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <img className={c.icon} src={logo} alt={""}/>
            <div className={c.title}>Регистрация</div>
            <Field component="input"
                   name="LastName"
                   type="text"
                   className={c.surname + " " + c.borders}
                   placeholder="Фамилия"/>
            <Field component="input"
                   name="FirstName"
                   type="text"
                   className={c.firstname + " " + c.borders}
                   placeholder="Имя"/>
            <Field component="input"
                   name="Email"
                   type="email"
                   className={c.email + " " + c.borders}
                   placeholder="Электронная почта"/>
            <Field component="input"
                   name="Password"
                   type="password"
                   className={c.password + " " + c.borders}
                   placeholder="Пароль"/>
            <button className={c.form_btn}
                    type="submit">
                Зарегистрироваться
            </button>
            <Link className={c.account} to={"/auth"}>
                Уже есть аккаунт?
            </Link>
        </form>
    )
})


class Reg extends React.Component {
    Submit = (data) => {
        this.props.Register(data.LastName, data.FirstName, data.Email, data.Password)
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to="/"/>
        }
        if (this.props.isCreated){
            return <Redirect to="/auth"/>
        }
        return (
            <div className={c.Content}>
                <Link className={c.LOGO} to={"/"}>MY<span>WARDROBE</span></Link>
                <RegisterForm onSubmit={this.Submit}/>
                <div className={c.error}>
                    {this.props.message}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.user.message,
    isCreated: state.user.isCreated,
})


export default connect(mapStateToProps, {Register})(Reg);

