import { MAKE_COMMENT_REQUEST,
         MAKE_COMMENT_SUCCESS,
         MAKE_COMMENT_FAIL} from "../constants/commentConstants";  
         
export const makeCommentReducer = (state = {}, action) => {
        switch(action.type){
                case MAKE_COMMENT_REQUEST:
                        return {loading: true}
                case MAKE_COMMENT_SUCCESS:
                        return {loading: false, comment: action.payload}
                case MAKE_COMMENT_FAIL:
                        return {loading: false, error: action.payload}
                default: return state
        }
}