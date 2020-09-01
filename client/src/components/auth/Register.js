import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { storeFormInput } from '../../actions/storeFormInput';
import PropTypes from 'prop-types';

// import axios from 'axios';

const Register = ({ setAlert, storeFormInput }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            // console.log("passwords don't match");
            setAlert("Passwords don't match", "danger", 4000); // 2 seconds
        } else {
            // const newUser = { name, email, password };
            // const config = { headers: { "Content-Type": "application/json" } };
            // const body = JSON.stringify(newUser);
            // try {
            //     const res = await axios.post('/api/users', body, config);
            //     console.log(res.data);
            // } catch (error) {
            //     console.log(error)
            // }
            console.log("Success");
        }
    }
    const onInput = e => {
        e.preventDefault();
        console.log('input: ', e.target.value);
        storeFormInput(e.target.value)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)} onInput={e => onInput(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="1"
                        value={password} onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="1"
                        value={password2} onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
}

/* now I need to connect component to redux store? and to actions? */
export default connect(
    null /* put state aka mapStateToProps here */,
    { setAlert, storeFormInput } /* put available actions here */
)(Register);

