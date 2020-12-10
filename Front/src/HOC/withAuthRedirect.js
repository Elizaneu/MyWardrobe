import {connect} from "react-redux";
import React from "react";
import {Redirect} from "react-router-dom";

const mapStateToProps = state =>({
    isAuth: state.user.isAuth
})

const withAuthRedirect = (Component) => connect(mapStateToProps)((props) => {
    if (props.isAuth)
        return <Component {...props}/>
    else
        return <Redirect to='/auth'/>
})

export default withAuthRedirect;