import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    POST_DELETED,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    DELETE_COMMENT
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error) {
        console.log('getPosts POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// Add like
export const addLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: postId, likes: res.data
            }
        })
    } catch (error) {
        console.log('getPosts POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// Remove like
export const removeLike = postId => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {
                id: postId, likes: res.data
            }
        })
    } catch (error) {
        console.log('getPosts POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// Delete post
export const deletePost = postId => async dispatch => {
    try {
        await axios.delete(`/api/posts/delete/${postId}`);

        dispatch({
            type: POST_DELETED,
            payload: { id: postId }
        })
    } catch (error) {
        console.log('deletePost POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// Add post
export const addPost = text => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const res = await axios.post(`/api/posts/`, text, config);

        dispatch({
            type: ADD_POST,
            payload: res.data // post
        })

        dispatch(setAlert('Post created', 'success', 3000));
    } catch (error) {
        console.log('addPost POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/by_post/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data // post
        })

    } catch (error) {
        console.log('getPost POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// Add comment
export const addComment = (postId, text) => async dispatch => {
    try {
        const config = { headers: { 'Content-Type': 'application/json' } };
        const res = await axios.post(`/api/posts/comment/${postId}`, text, config);

        dispatch({
            type: ADD_COMMENT,
            payload: {
                id: postId,
                comments: res.data // post.comments
            }
        })

        dispatch(setAlert('Comment Added', 'success', 3000));
    } catch (error) {
        console.log('addComment POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: {
                comments: res.data, // post.comments
                postId,
                commentId,
            }
        })

        dispatch(setAlert('Comment Deleted', 'success', 3000));
    } catch (error) {
        console.log('deleteComment POST_ERROR', error);
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: error.response.statusText,
                status: error.response.status
            }
        });
    }
}