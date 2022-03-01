import { POST_LIST_REQUEST,
        POST_LIST_SUCCESS,
        POST_LIST_FAIL,
        POST_CREATE_REQUEST,
        POST_CREATE_SUCCESS,
        POST_CREATE_FAIL,
        POST_REQUEST,
        POST_SUCCESS,
        POST_FAIL,
        LIKE_POST_SUCCESS,
        LIKE_POST_FAIL,
        POST_DELETE_SUCCESS, POST_DELETE_FAIL} from "../constants/postConstants";   

import axios from 'axios'



export const listPosts = () => async (dispatch) => {
    try{
        dispatch({ type: POST_LIST_REQUEST})

        const {data} = await axios.get('/api/posts')

        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: POST_LIST_FAIL,
            payload: error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message

        })
    }
}

export const createPostAction = (image, number_likes=0, post_text, upload_date) => async (dispatch) => {
    try{
        dispatch({
            type: POST_CREATE_REQUEST
        })

        const config = {
            header: {
                'Content-Type':'application/json'
            }  
        }

        const {data} = await axios.post(
            '/api/posts',
            {image, number_likes, post_text, upload_date},
            config
        )

        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}

export const listPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: POST_REQUEST
        })

        const data = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: POST_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: POST_FAIL,
            payload: error.response && error.response.data.message
                     ? error.response.data.message
                     : error.message

        })
    }
}

export const likePostAction = (id) => async (dispatch) =>{
    try{
        const response = await axios.put(`api/posts/${id}/like`)

        dispatch({
            type: LIKE_POST_SUCCESS,
            payload: { id,
                       likes: response.data.likes}
        })

    } catch(error){
        dispatch({
            type: LIKE_POST_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}

export const unlikePostAction = (id) => async (dispatch) =>{
    try{
        const response = await axios.put(`api/posts/${id}/unlike`)

        dispatch({
            type: LIKE_POST_SUCCESS,
            payload: { id,
                       likes: response.data.likes}
        })

    } catch(error){
        dispatch({
            type: LIKE_POST_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}

export const deletePost = (id) => async(dispatch) => {
    try{
        const data = await axios.delete(`api/posts/${id}`)

        dispatch({
            type: POST_DELETE_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}