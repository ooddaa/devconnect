import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile()
    }, []);

    return loading && profile === null
        ? (<Spinner />)
        : (<Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i
                    className="fas fa-user-circle fa-2x"
                />{' '}
                Welcome {user && user.name}
            </p>
            <p>
                {profile !== null
                    ? (<Fragment> Has </Fragment>)
                    : (<Fragment>
                        <p>You do not have a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                    </Link>
                    </Fragment>)}
            </p>
        </Fragment>)
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProprs = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProprs, { getCurrentProfile })(Dashboard);
