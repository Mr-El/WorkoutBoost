import React, { Component } from 'react';
import './Extra.css'
import Logo from '../assets/LogoT.png'

class Error extends Component {
    render() {
        return (
            <div>
                <h1 className={"error-title"}>Oops! You ran out of pre-workout</h1>
                <label className={"error-subtitle"}>
                    You didn't have enough energy to make<br/>
                    it to the page you were looking for
                </label>
                <br/>
                <img className={"error-logo"} src={Logo} alt="Logo"/>
                <br/>
                <button className={"error-button"} onClick={() => window.location.href = "/"}>Go back home</button>
            </div>
        )
    }
}

export default Error;