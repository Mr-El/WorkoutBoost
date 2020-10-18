import React, { Component } from 'react';
import { DisplaySaved } from "../Firebase/Firebase";

class Saved extends Component {

    render() {
        return (
            <div>
                <div className={"dropdown"}>
                    <button className={"dropbtn"}><i className={"fas fa-search"}/> Saved </button>
                </div>
                <DisplaySaved />
            </div>
        )
    }
}

export default Saved;