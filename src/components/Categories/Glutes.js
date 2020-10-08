import React, { Component } from 'react';
import { DisplayShare } from "../Firebase";

class Glutes extends Component {
    render() {
        return (
            <div>
                <div className={"dropdown"}>
                    <button className={"dropbtn"}><i className={"fas fa-search"}/> Glutes <i className={"fas fa-caret-down"}/></button>
                    <div className={"dropdown-content"}>
                        <a href={"/"}>All Workouts</a>
                        <a href={"/arms"}>Arms</a>
                        <a href={"/back"}>Back</a>
                        <a href={"/chest"}>Chest</a>
                        <a href={"/cardio"}>Cardio</a>
                        <a href={"/core"}>Core</a>
                        <a href={"/legs"}>Legs</a>
                        <a href={"/shoulders"}>Shoulders</a>
                        <a href={"/other"}>Other...</a>
                    </div>
                </div>
                <DisplayShare shown={"glutes"} />
            </div>
        )
    }
}

export default Glutes;