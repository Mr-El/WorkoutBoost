import React, { Component } from 'react';
import { DisplayShare } from "../Firebase";

class Other extends Component {
    render() {
        return (
            <div>
                <div className={"dropdown"}>
                    <button className={"dropbtn"}><i className={"fas fa-search"}/> Other... <i className={"fas fa-caret-down"}/></button>
                    <div className={"dropdown-content"}>
                        <a href={"/"}>All Workouts</a>
                        <a href={"/arms"}>Arms</a>
                        <a href={"/back"}>Back</a>
                        <a href={"/chest"}>Chest</a>
                        <a href={"/cardio"}>Cardio</a>
                        <a href={"/core"}>Core</a>
                        <a href={"/glutes"}>Glutes</a>
                        <a href={"/legs"}>Legs</a>
                        <a href={"/shoulders"}>Shoulders</a>
                    </div>
                </div>
                <DisplayShare shown={"OTHER"} />
            </div>
        )
    }
}

export default Other;