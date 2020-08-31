import React from 'react';
import PropTypes from 'prop-types'; // https://www.npmjs.com/package/prop-types
import { connect } from 'react-redux';

const Alert = ({ alerts }) =>
    alerts !== null && alerts.length > 0 && alerts.map(({ id, msg, alertType }) => (
        <div key={id} className={`alert alert-${alertType}`}>
            {msg}
        </div>
    ))

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert // what's in main reducer? aka '../../reducers/index.js' 
})

export default connect(mapStateToProps)(Alert);
