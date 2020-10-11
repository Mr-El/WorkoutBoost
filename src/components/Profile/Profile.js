import React, { Component } from 'react';
import { LogoutDB } from "../Firebase";
import { FirebaseInfo } from "../Firebase";
import { Insights } from "../Firebase";
import './Profile.css'

class Profile extends Component {
    render() {
        return (
            <div className="modal">
                <div className="container">
                    <h2><i className="fas fa-chart-line"/> Insights</h2>
                    <hr/>
                    <br/>
                    <Insights />
                    <br/>
                    <h2><i className="fas fa-edit"/> Edit Profile</h2>
                    <hr/>
                    <FirebaseInfo />
                    <hr/>
                </div>
                <button className={"logout"} onClick={LogoutDB}>Log out</button>
            </div>
        )
    }
}

export default Profile;