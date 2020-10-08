import React, { Component } from 'react';
import './Login.css'
import { RegisterDB } from '../Firebase';
import { LoginDB } from '../Firebase';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            system: 'Login',
            email: '',
            password: '',
        }
    }

    changeSystem = () => {
        this.setState({system: "Register"});
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        if (this.state.system === 'Login') {
            LoginDB(email, password);
        } else {
            RegisterDB(email, password);
        }
    }

    handleEmailChange = (evt) => {
        this.setState({
            email: evt.target.value,
        });
    }

    handlePassChange = (evt) => {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        return (
            <div className="modal">
                <form onSubmit={this.handleSubmit}>
                    <div className="imgcontainer">
                        <img src={require('../assets/avatarimage.jpg')} alt="Avatar" className="avatar"/>
                    </div>
                    <div className="container">
                        <label className={this.state.system}>Full Name</label>
                        <input id="fn" type={this.state.system} placeholder="Enter Full Name" name="fullname"/>

                        <label>Email</label>
                        <input id="em" type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Enter Email" name="email" required/>

                        <label>Password</label>
                        <input id="ps" type="password" value={this.state.password} onChange={this.handlePassChange} placeholder="Enter Password" name="psw" required/>

                        <button className="system" type="submit">{this.state.system}</button>
                    </div>

                    <div className="container">
                        <span className="register">Don't have account? <button type="reset" className="registerbtn" onClick={this.changeSystem}>Register</button></span>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;