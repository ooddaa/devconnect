import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
    experience: {
        title,
        company,
        location,
        from,
        to,
        description,
    } }) => {
    return (
        <div className="profile-exp bg-white p-2">
            <div>
                <h3 className="text-dark">{company ? company : "no company"}</h3>
                <p>
                    <Moment format='YYYY/MM/DD'>{from}</Moment> - {' '}
                    {to === undefined ? (' Now') : (<Moment format='YYYY/MM/DD'>{to}</Moment>)}
                </p>
                <p>
                    <strong>Position: </strong>
                    {title ? title : "no title"}
                </p>
                <p>
                    <strong>Description: </strong>
                    {description ? description : "Lorem ipsum"}
                </p>
            </div>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired,
}

export default ProfileExperience
