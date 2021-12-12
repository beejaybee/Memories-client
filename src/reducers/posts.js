import {
    FETCH_ALL_POSTS,
    CREATE_POST,
    UPDATE_A_POST,
    DELETE_POST,
    LIKE_POST,
    FETCH_BY_SEARCH,
    START_LOADING,
    END_LOADING,
    FETCH_ONE_POST,
    COMMENT_POST
} from '../type';

const postReducer = (state = {isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        
        case END_LOADING:
            return { ...state, isLoading: false }
        
        case FETCH_ALL_POSTS:
            return {
                ...state,
                posts: action.payload.data,
                currenPage: action.payload.currenPage,
                numberOfPages: action.payload.numberOfPages
            };
            
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        
        case FETCH_ONE_POST:
            return { ...state, post: action.payload }; 
        
        case CREATE_POST:
            return { ...state, posts: [...state.posts, action.payload] };
                
        case UPDATE_A_POST:
        case LIKE_POST:
            return { ...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post) }
        
        case COMMENT_POST:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.payload._id) return action.payload;
                    
                    return post;
                })
            }
                        
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload) }
        
        default:
            return state;
    }
}

export default postReducer;