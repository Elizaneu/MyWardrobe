import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {IsAuth} from "./Reducers/userReducer";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Change from "./Components/Change/Change";
import Create from "./Components/Create/Create";
import Favourites from "./Components/Favourites/Favourites";
import Find from "./Components/Find/Find";

class App extends React.Component {
    componentDidMount() {
        this.props.IsAuth()
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/auth"
                       render={() => <Auth/>}/>
                <Route exact path="/"
                       render={() => <Home/>}/>
                <Route exact path="/change "
                       render={() => <Change/>}/>
                <Route exact path="/create"
                       render={() => <Create/>}/>
                <Route exact path="/favourites"
                       render={() => <Favourites/>}/>
                <Route exact path="/find"
                       render={() => <Find/>}/>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {IsAuth})(App);
