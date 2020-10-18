import React, { Component } from 'react';
import { LogoutDB } from "../Firebase/Firebase";
import { FirebaseInfo } from "../Firebase/Firebase";
import { Insights } from "../Firebase/Firebase";
import './Profile.css'

class Profile extends Component {
    render() {
        return (
            <div className="modal">
                <div className="container">
                    <h2>Insights</h2>
                    <hr/>
                    <br/>
                    <Insights />
                    <br/>
                    <h2>Edit Profile</h2>
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