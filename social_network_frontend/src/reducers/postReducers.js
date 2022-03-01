import {POST_LIST_REQUEST,
        POST_LIST_SUCCESS,
        POST_LIST_FAIL,
        POST_CREATE_REQUEST,
        POST_CREATE_SUCCESS,
        POST_CREATE_FAIL,
        POST_REQUEST,
        POST_SUCCESS,
        POST_FAIL,
        LIKE_POST_SUCCESS,
        LIKE_POST_FAIL} from '../constants/postConstants.js'

    
export const postListReducer = (state = {posts: []}, action) => {
        switch(action.type){
                case POST_LIST_REQUEST:
                        return {loading: true, posts : []}
                case POST_LIST_SUCCESS:
                        return {loading: false, posts: action.payload}
                case POST_LIST_FAIL:
                        return {loading: false, error: action.payload}
                default:
                        return state;
        }
}

export const createPostReducer = (state = {}, action) => {
        switch(action.type){
                case POST_CREATE_REQUEST:
                        return {loading: true}
                case POST_CREATE_SUCCESS:
                        return {loading: false, posts: action.payload}
                case POST_CREATE_FAIL:
                        return {loading: false, error: action.payload}
                default: return state
        }
}

export const postDetailsReducer = (state = {}, action) => {
        switch(action.type){
                case POST_REQUEST:
                        return {...state, loading: true}
                case POST_SUCCESS:
                        return {loading: false, post: action.payload}
                case POST_FAIL:
                        return {loading: false, post: action.payload}
                default:
                        return state;
        }
}

// export const likePostReducer = (state = {}, action) => {
//         switch(action.type){
//                 case LIKE_POST_SUCCESS:
//                         return {
//                                 posts: posts.map((post) =>
//                                 post.post_id === action.payload.id ? { ...post, number_likes: action.payload.likes } : post
//                         )}
//                 case LIKE_POST_FAIL:
//                         return { error: action.payload}
//         }
// }