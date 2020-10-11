import React, { Component } from "react";
import { WriteShare } from "../Firebase";
import "./Home.css"

export default class Share extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            title: '',
            desc: '',
            video: '',
            music: '',
        }
    }

    handleClick = () => {
        this.props.toggle();
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        let category = this.state.category;
        let title = this.state.title;
        let desc = this.state.desc;
        let video = this.state.video;
        let music = this.state.music;
        desc.replace(/\n/g, '<br/>\n');
        console.log(desc)
        if (!category) {
            alert("Category not selected")
        } else if (video.indexOf(' ') >= 0) {
            alert("Only input link in [VIDEO]")
        } else if (music.indexOf(' ') >= 0) {
            alert("Only input link in [MUSIC]")
        } else {
            if (!video ) {
                video = "No Video"
            }
            if (!music) {
                music = "No Music"
            }
            WriteShare(category, title, desc, video, music);
        }
    }

    handleCategory = (evt) => {
        this.setState({
            category: evt.target.value,
        });
    }

    handleTitleChange = (evt) => {
        this.setState({
            title: evt.target.value,
        });
    }

    handleDescChange = (evt) => {
        this.setState({
            desc: evt.target.value,
        });
    }

    handleVideoChange = (evt) => {
        this.setState({
            video: evt.target.value,
        });
    }

    handleMusicChange = (evt) => {
        this.setState({
            music: evt.target.value,
        });
    }

    render() {
        return (
            <div className="share-modal">
                <div className="share-modal-content">
                    <form onSubmit={this.handleSubmit}>
                        <span className="close" onClick={this.handleClick}>&times;</span>
                        <h1 className={"sharetitle"}>Share Workout</h1>
                        <div className="categories">
                            <select value={this.state.category} onChange={this.handleCategory}>
                                <option value="ALL">Select Category:</option>
                                <option value="ARMS">Arms</option>
                                <option value="BACK">Back</option>
                                <option value="CARDIO">Cardio</option>
                                <option value="CHEST">Chest</option>
                                <option value="CORE">Core</option>
                                <option value="GLUTES">Glutes</option>
                                <option value="LEGS">Legs</option>
                                <option value="SHOULDERS">Shoulders</option>
                                <option value="OTHER">Other...</option>
                            required </select>
                        </div>
                        <input type="sharetext" name="title" value={this.state.title} onChange={this.handleTitleChange} placeholder={"Title"} required/>
                        <br />
                        <textarea className="sharedesc" name="description" wrap="soft" rows="4" cols="50" value={this.state.desc} onChange={this.handleDescChange} placeholder={"Description: \r\n[5x] Reps \r\n[10x] Reps"} required/>
                        <br />
                        <input type="sharetext" name="video" value={this.state.video} onChange={this.handleVideoChange} placeholder={"Video link (optional)"}/>
                        <br />
                        <input type="sharetext" name="music" value={this.state.music} onChange={this.handleMusicChange} placeholder={"Music link (optional)"}/>
                        <br />
                        <button type="submit" className={"publish"}>Publish</button>
                    </form>
                </div>
            </div>
        );
    }
}