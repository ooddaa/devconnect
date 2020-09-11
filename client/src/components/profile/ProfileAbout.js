import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: { name }
} }) => {
    return (
        <div className="profile-about bg-light p-2">
            <h2 className="text-primary">{name}'s Bio</h2>
            {bio ? <p>{bio}</p> : <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
                neque modi perspiciatis similique?</p>}
            <div className="line"></div>
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills && skills.length > 0 ? skills.map((skill, i) => (
                    <div key={i} className="p-1"><i className="fa fa-check"></i> {skill}</div>
                )) : (<Fragment>No skills</Fragment>)}
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
