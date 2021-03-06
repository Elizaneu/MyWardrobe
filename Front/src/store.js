import {reducer as formReducer} from  "redux-form"
import userReducer from "./Reducers/userReducer";
import errorReducer from "./Reducers/errorReducer"
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import thingReducer from "./Reducers/thingReducer";

let reducers = combineReducers({
    form: formReducer,
    user: userReducer,
    thing: thingReducer,
    error: errorReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store