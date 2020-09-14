import { GET_POSTS, POST_ERROR, UPDATE_LIKES, POST_DELETED, ADD_POST } from '../actions/types';

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