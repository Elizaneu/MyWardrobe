import React from 'react';
import userReducer, {SET_MESSAGE, setAuth, setMessage} from "./userReducer";
import * as ur from "./userReducer";

let state = {
    isAuth: true,
    isCreated: false,
    isEdited: false,
    message: "",
    currentUser: {}
}

describe('actions', () => {
    it('should create an action to set message', () => {
        const message = "test";
        const expectedAction = {
            type: ur.SET_MESSAGE,
            message
        }
        expect(ur.setMessage(message)).toEqual(expectedAction)
    })
    it('should create an action to set isAuth', () => {
        const isAuth = false;
        const expectedAction = {
            type: ur.SET_AUTH,
            isAuth
        }
        expect(ur.setAuth(isAuth)).toEqual(expectedAction)
    })
    it('should create an action to set isCreated', () => {
        const isCreated = true;
        const expectedAction = {
            type: ur.SET_CREATE,
            isCreated
        }
        expect(ur.setCreate(isCreated)).toEqual(expectedAction)
    })
    it('should create an action to set current user', () => {
        const currentUser = "Elizaveta"
        const expectedAction = {
            type: ur.SET_CURRENT_USER,
            currentUser
        }
        expect(ur.setCurrentUser(currentUser)).toEqual(expectedAction)
    })
    it('should create an action to isEdited', () => {
        const isEdited = true;
        const expectedAction = {
            type: ur.SET_UPDATE,
            isEdited
        }
        expect(ur.setUpdate(isEdited)).toEqual(expectedAction)
    })
})


