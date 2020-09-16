import React, { Fragment } from 'react';

const NotFound = props => {
    return (
        <Fragment>
            <div className="h1 x-large text-primary">
                <i className="fas fa-exclamation-triangle" />{' '} Page Not Found
            </div>
            <p className="large">Sorry, this page does not exist</p>
        </Fragment>
    )
}

export default NotFound
