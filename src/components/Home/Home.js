import React, { Component } from 'react';
import Share from "./Share";
import { DisplayShare } from "../Firebase";
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seen: false,
        }
    }

    toggleShare = () => {
        this.setState({seen: !this.state.seen});
    }

    render() {
        return (
        <div>
            <div className={"dropdown"}>
                <button className={"dropbtn"}><i className={"fas fa-search"}/> All  Body Workouts <i className={"fas fa-caret-down"}/></button>
                <div className={"dropdown-content"}>
                    <a href={"/arms"}>Arms</a>
                    <a href={"/back"}>Back</a>
                    <a href={"/cardio"}>Cardio</a>
                    <a href={"/core"}>Core</a>
                    <a href={"/chest"}>Chest</a>
                    <a href={"/glutes"}>Glutes</a>
                    <a href={"/legs"}>Legs</a>
                    <a href={"/nutrition"}>Nutrition</a>
                    <a href={"/shoulders"}>Shoulders</a>
                    <a href={"/other"}>Other...</a>
                </div>
            </div>
            <div>
                <DisplayShare shown={"all"} />
            </div>
            <button className={"share"} onClick={this.toggleShare}><i className="fas fa-plus"/></button>
            {this.state.seen ? <Share toggle={this.toggleShare} /> : null}
        </div>
        )
    }
}

export default Home;