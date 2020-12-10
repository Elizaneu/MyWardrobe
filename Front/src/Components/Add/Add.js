import React from "react";
import c from "./Add.module.css";
import Header from "../Header/Header";
import logo from "../../assets/image/logo.svg";
import withAuthRedirect from "../../HOC/withAuthRedirect";
import {Field, reduxForm} from "redux-form";
import {require} from "../../Validate/validators";
import {Categories} from "../../Lists/Categories";
import {CreateThing, setCreate} from "../../Reducers/thingReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import FileInput from "../common/FileInput/FileInput";
import {Redirect} from "react-router-dom";

const AddForm = reduxForm({form: "add"})((props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <img className={c.icon} src={logo} alt={""}/>
            <div className={c.title}>
                Добавление нового элемента
            </div>
            <label
                className={c.button + " " + c.chooseFile}
                htmlFor="file">
                {props.value}
            </label>
            <Field
                component={FileInput}
                name="Photo"
                changeValue={props.changeValue}
                className={c.input + " " + c.button + " " + c.chooseFile}
                id="file"/>
            <Field
                component="select"
                name="Category"
                validate={require}
                className={c.button + " " + c.chooseCategory}
                required>
                <option value="none" hidden="">Выбрать категорию</option>
                {
                    Categories.map(u => <option key={u.option}>{u.option}</option>)
                }
            </Field>
            <button className={c.button + " " + c.formButton}>
                Загрузить
            </button>
        </form>
    )
})

class Add extends React.Component {


    Submit = (data) => {
        //console.log(data);
        this.props.CreateThing(data.Photo, data.Category)
    }

    state = {
        value: "Выбрать фото"
    }

    changeValue = (value) => {
        if (value) {
            this.setState({value})

        } else {
            this.setState({value: "Выбрать фото"})
        }
    }

    render() {
        if (this.props.isCreated) {
            this.props.setCreate(false);
            return (
                <Redirect to='/wardrobe'/>
            )
        }

        return (
            <div>
                <Header/>
                <AddForm onSubmit={this.Submit}
                         changeValue={this.changeValue}
                         value={this.state.value}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isCreated: state.thing.isCreated,
    message: state.thing.message,
})

export default compose(
    connect(mapStateToProps, {CreateThing, setCreate}),
    withAuthRedirect)(Add)

// connect(mapStateToProps, {CreateThing})(withAuthRedirect(Add));