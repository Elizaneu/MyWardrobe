import React from 'react';
import userReducer, {setAuth, setMessage} from "./userReducer";

let state = {
    isAuth: true,
    isCreated: false,
    isEdited: false,
    message: "",
    currentUser: {}
}

it('message should be changed', () => {
    let action = setMessage("test");
    let newState = userReducer(state, action);
    expect(newState.message).toBe("test");
})

it('isAuth should be changed', () => {
    let action = setAuth(false);
    let newState = userReducer(state, action);
    expect(newState.isAuth).toBe(false);
})