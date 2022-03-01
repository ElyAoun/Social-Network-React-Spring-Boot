import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
        USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,
        USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL,
        USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
        USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
        USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
        } from "../constants/userConstants";

import axios from "axios"

export const registerUser = (name, email, password, phone_number, country_of_origin, profile_image) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = { //put type of data in header of the request
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/signUp',
            {name, email, password, phone_number, country_of_origin, profile_image},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}


export const loginUser = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/login',
            {email, password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        console.log("data returned: "+ data);

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try{
        const {data} = await axios.get('/api/logout')

        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}


export const updateUser = (id, name, email, password, phone_number, country_of_origin, profile_image) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const config = { //put type of data in header of the request
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.put(
            `/api/users/${id}`,
            {name, email, password, phone_number, country_of_origin, profile_image},
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}


export const getAllUsers = () => async (dispatch) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST
        })

        const data = await axios.get('/api/users')

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const data = await axios.get(`/api/users/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch(error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}