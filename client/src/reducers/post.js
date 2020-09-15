import {
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    POST_DELETED,
    ADD_POST,
    ADD_COMMENT,
    DELETE_COMMENT,
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case ADD_POST:
            return {
                ...state,
                loading: false,
                posts: [payload, ...state.posts]
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state,
                loading: false,
                post: { ...state.post, comments: payload.comments }
            }
        case DELETE_COMMENT:
            return {
                ...state,
                loading: false,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(comment => comment._id !== payload.commentId)
                }
            }
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case UPDATE_LIKES:
            return {
                ...state,
                loading: false,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, likes: payload.likes } : post)
            }
        case POST_DELETED:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(post => post._id !== payload.id)
            }
        default:
            return state
    }
}