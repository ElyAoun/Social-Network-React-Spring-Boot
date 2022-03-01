import { MAKE_COMMENT_REQUEST,
         MAKE_COMMENT_SUCCESS,
         MAKE_COMMENT_FAIL} from '../constants/commentConstants'

import axios from 'axios'

export const postComment = (id, comment_text, comment_date) => async (dispatch) => {
    try{
        dispatch({
            type: MAKE_COMMENT_REQUEST
        })

        const config = {
            header: {
                'Content-Type':'application/json'
            }  
        }

        const data = await axios.post(
            `/api/posts/${id}/comment`,
            {comment_date, comment_text},
            config
        )

        dispatch({
            type:MAKE_COMMENT_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: MAKE_COMMENT_FAIL,
            payload: error.message && error.response.data.error
                    ? error.response.data.error
                    : error.message
        })
    }
}
