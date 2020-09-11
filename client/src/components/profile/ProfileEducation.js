import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
    education: {
        school,
        degree,
        from,
        to,
        description,
        fieldofstudy
    } }) => {
    return (
        <div className="profile-edu bg-white p-2">
            <div>
                <h3>{school ? school : "no school"}</h3>
                <p>
                    <Moment format='YYYY/MM/DD'>{from}</Moment> - {' '}
                    {to === undefined ? (' Now') : (<Moment format='YYYY/MM/DD'>{to}</Moment>)}
                </p>
                <p>
                    <strong>Degree: </strong>
                    {degree ? degree : "no degree"}
                </p>
                <p>
                    <strong>Field Of Study: </strong>
                    {fieldofstudy ? fieldofstudy : "no fieldofstudy"}
                </p>
                <p>
                    <strong>Description: </strong>
                    {description ? description : "Lorem ipsum"}
                </p>
            </div>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,
}

export default ProfileEducation;
