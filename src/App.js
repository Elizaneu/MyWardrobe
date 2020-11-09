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
import Outfits from "./Components/Outfits/Outfits";
import Profile from "./Components/Profile/Profile";
import Rec from "./Components/Rec/Rec";
import Reg from "./Components/Reg/Reg";
import Wardrobe from "./Components/Wardrobe/Wardrobe";
import Settings from "./Components/Settings/Settings";
import Add from "./Components/Add/Add";

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
                <Route exact path="/outfits"
                       render={() => <Outfits/>}/>
                <Route exact path="/profile"
                       render={() => <Profile/>}/>
                <Route exact path="/rec"
                       render={() => <Rec/>}/>
                <Route exact path="/reg"
                       render={() => <Reg/>}/>
                <Route exact path="/settings"
                       render={() => <Settings/>}/>
                <Route exact path="/wardrobe"
                       render={() => <Wardrobe/>}/>
                <Route exact path="/add"
                       render={() => <Add/>}/>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {IsAuth})(App);
