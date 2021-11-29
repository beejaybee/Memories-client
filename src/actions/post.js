import * as api from '../api';
import { FETCH_ALL_POSTS, CREATE_POST, UPDATE_A_POST , DELETE_POST, LIKE_POST } from '../type';

//Action Creators
export const getPosts = () => async dispatch => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL_POSTS, payload: data });
    } catch (error) {
        console.log(error.message)
    }
    
}

export const createPost = post => async dispatch => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE_POST, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePost = (id, updatedPost) => async dispatch => {
    try {
        const { data } = await api.updatePost(id, updatedPost);

        dispatch({ type: UPDATE_A_POST, payload: data });

    } catch (error) {
        console.log(error.message)
    }   
}

export const deletePost = id => async dispatch => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE_POST, payload: id});

    } catch (error) {
        console.log(error)
    }
}

export const likePost = id => async dispatch => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE_POST, payload: data });

    } catch (error) {
        console.log(error.message);
    }
}