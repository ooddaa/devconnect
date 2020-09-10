import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import auth from '../../reducers/auth';

const Profile = ({
    getProfileById,
    auth,
    profile: { profile, loading },
    match }) => {
    console.log('match', match)
    useEffect(() => {

        getProfileById(match.params.id);
    }, [getProfileById]);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated && !auth.loading && auth.user._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
