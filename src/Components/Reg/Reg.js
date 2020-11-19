import React from "react";
import {Link, Redirect} from "react-router-dom";
import c from "./Reg.module.css";
import logo from "../../assets/image/logo.svg";
import {Field, reduxForm} from "redux-form";
import {Register} from "../../Reducers/userReducer";
import {connect} from "react-redux";
import {require, maxLength, minLength} from "../../Validate/validators";
import Input from "../common/Input/Input";

const maxLength30 = maxLength(30);
const minLength8 = minLength(8);


const RegisterForm = reduxForm({form: "reg"})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <img className={c.icon} src={logo} alt={""}/>
            <div className={c.title}>Регистрация</div>
            <div className={c.form_input}>
            <Field component={Input}
                   errorclassname={c.errorField}
                   name="LastName"
                   type="text"
                   validate={[require, maxLength30]}
                   className={c.borders}
                   placeholder="Фамилия"/>
            <Field component={Input}
                   errorclassname={c.errorField}
                   name="FirstName"
                   type="text"
                   validate={[require, maxLength30]}
                   className={c.borders}
                   placeholder="Имя"/>
            <Field component={Input}
                   errorclassname={c.errorField}
                   name="Email"
                   type="email"
                   validate={require}
                   className={c.borders}
                   placeholder="Электронная почта"/>
            <Field component={Input}
                   errorclassname={c.errorField}
                   name="Password"
                   type="password"
                   validate={[require, minLength8]}
                   className={c.borders}
                   placeholder="Пароль"/>
            <button className={c.form_btn}
                    type="submit">
                Зарегистрироваться
            </button>
            <Link className={c.account} to={"/auth"}>
                Уже есть аккаунт?
            </Link>
            </div>
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