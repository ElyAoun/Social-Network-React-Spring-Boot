import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { postListReducer, createPostReducer, postDetailsReducer } from './reducers/postReducers'
import { userRegisterReducer, userLoginReducer, usersListReducer, userDetailsReducer, userUpdateReducer } from './reducers/userReducers'
import {makeCommentReducer} from './reducers/commentReducers'

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin : userLoginReducer,
    userUpdate : userUpdateReducer,
    usersList : usersListReducer,
    userDetails : userDetailsReducer,
    postList: postListReducer,
    createPost: createPostReducer,
    postDetails : postDetailsReducer,
    makeComment : makeCommentReducer
})

/*const initialState = {

}*/

const middleware = [thunk]

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))


export default store