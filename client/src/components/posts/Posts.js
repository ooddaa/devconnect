import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    // I'd rather refresh posts upon clicking Posts link in Navbar.
    // It will allow me to refresh posts within the posts
    // useEffect(() => {
    //     getPosts();
    // }, [getPosts])
    return loading ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="fas fa-user"> Welcome to the community</i>
        </p>
        <PostForm></PostForm>
        <div className="posts">
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </div>
    </Fragment>
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
}

const mapStateToProprs = state => ({
    post: state.post
})

export default connect(mapStateToProprs, {})(Posts);
