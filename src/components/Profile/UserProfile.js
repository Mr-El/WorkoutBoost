import React, { Component } from 'react';
import { UserProfiles } from "../Firebase";

class UserProfile extends Component {
    render() {
        return (
            <div>
                <UserProfiles />
            </div>
        )
    }
}

export default UserProfile;