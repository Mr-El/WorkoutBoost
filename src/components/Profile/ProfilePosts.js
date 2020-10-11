import React, { Component } from 'react';
import { ProfilePost } from "../Firebase";

class ProfilePosts extends Component {

    render() {
        return (
            <div>
                <div className={"dropdown"}>
                    <button className={"dropbtn"}><i className={"fas fa-search"}/> Your Posts </button>
                </div>
                <ProfilePost />
            </div>
        )
    }
}

export default ProfilePosts;