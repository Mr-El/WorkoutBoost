import * as firebase from 'firebase';
import React, {Component} from 'react';

// Config for firebase
const config = {
    apiKey: "AIzaSyCOLqtjm2aUT3kT_l_Mqd1qHSx7pEsFTKE",
    authDomain: "workout-planner-6fdd3.firebaseapp.com",
    databaseURL: "https://workout-planner-6fdd3.firebaseio.com",
    projectId: "workout-planner-6fdd3",
    storageBucket: "workout-planner-6fdd3.appspot.com",
    messagingSenderId: "508346888741",
    appId: "1:508346888741:web:5767dd4f080aba9ef605cc",
    measurementId: "G-SFFTW8DM31"
};

firebase.initializeApp(config);

let db = firebase.firestore();

// Register the user
export function RegisterDB(email, password) {
    console.log("REGISTER");
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(result) {
            return db.collection("users").doc(result.user.uid).set({
                username: email.split('@').shift(),
            }).then(next => {
                    result.user.updateProfile({
                    displayName: email.split('@').shift(),
                }).then(reload => {
                    window.location.reload();
                })
            })
        }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
    });
}

// Logins in the user
export function LoginDB(email, password) {
    console.log("LOGIN");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href='/profile';
        } else {
            console.log('user not signed in')
        }
    });
}

// Logs out the user
export function LogoutDB() {
    firebase.auth().signOut().then(function() {
        window.location.href='/login';
    }).catch(function(error) {
        console.log(error);
    });
}

// Checks if the user is online
export function Status() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href = '/profile'
        } else {
            window.location.href = '/login'
        }
    });
}

// Checks if the user is online
export function StatusIn() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            alert("You are not logged in")
            window.location.href = '/login';
        }
    });
}

// Read the username / email / password from database and show it on profile
function ReadDB() {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                let username = user.displayName;
                let email = user.email;
                let password = '********'
                resolve([username, email, password]);
            } else {
                reject();
            }
        });
    });
}

// Writes the special username to the database
export function UsernameSave(username) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updateProfile({
                displayName: username,
            }).then(function() {
                db.collection("users").doc(user.uid).update({
                    username: username,
                }).then(message => {
                    alert('Username Saved!\nYou are all set');
                })
            }).catch(function(error) {
                alert(error);
            });
        } else {
            console.log('not logged in')
        }
    });
}

// Writes the username / email / password to the database
function UserSave(username) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?🛠U+◉🂈⚡👑🛡U+26A1]+/;
            if (username.length > 12) {
                alert("Username cannot be more then 12 characters");
            } else if (format.test(username)) {
                alert("You cannot use special characters")
            } else {
                user.updateProfile({
                    displayName: username,
                }).then(function() {
                    db.collection("users").doc(user.uid).update({
                        username: username,
                    }).then(message => {
                        alert('Username Saved!');
                    })
                }).catch(function(error) {
                    alert(error);
                });
            }
        } else {
            console.log('not logged in')
        }
    });
}

function EmailSave(email) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updateEmail(email).then(function() {
                alert('Email saved')
            }).catch(function(error) {
                alert(error)
            });
        } else {
            console.log('not logged in')
        }
    });
}

function PassSave(password) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.updatePassword(password).then(function() {
                alert('Password saved')
            }).catch(function(error) {
                alert(error);
            });
        } else {
            console.log('not logged in')
        }
    });
}

export const FirebaseInfo = class FirebaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        ReadDB()
            .then(read => {
                this.setState({username: read[0]})
                this.setState({email: read[1]})
                this.setState({password: read[2]})
            }).catch(() => {
            console.log('user not signed in')
        });
    }

    UserSave = (evt) => {
        evt.preventDefault();
        let username = this.state.username;
        UserSave(username);
    }

    EmailSave = (evt) => {
        evt.preventDefault();
        let email = this.state.email;
        EmailSave(email);
    }

    PassSave = (evt) => {
        evt.preventDefault();
        let password = this.state.password;
        PassSave(password);
    }

    handleUserChange = (evt) => {
        this.setState({
            username: evt.target.value,
        });
    }

    handleEmailChange = (evt) => {
        this.setState({
            email: evt.target.value,
        });
    }

    handlePassChange = (evt) => {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        return (
            <form>
                <div className="container">
                    <label>Username:</label>
                    <input id="us" type="text" value={this.state.username} onChange={this.handleUserChange} placeholder={this.state.username} name="username" required/>
                    <button className="system" onClick={this.UserSave}>Save Username</button>
                    <label>Email:</label>
                    <input id="em" type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder={this.state.email} name="email" required/>
                    <button className="system" onClick={this.EmailSave}>Save Email</button>
                    <label>Password:</label>
                    <input id="ps" type="password" value={this.state.password} onChange={this.handlePassChange} placeholder={this.state.password} name="psw" required/>
                    <button className="system" onClick={this.PassSave}>Save Password</button>
                </div>
            </form>
        )
    }
}

function DeleteDoc(collection, doc, notify) {
    db.collection(collection).doc(doc).delete().then(function() {
        if (notify === true) {
            alert("Successfully deleted workout!");
        }
        window.location.reload();
    }).catch(function(error) {
        alert("Error removing document: " + error);
    });
}

// When user publishes workout it goes to shared collection
export function WriteShare(category, title, desc, video, music) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let today = new Date();
            let day = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            let dateTime = `${day}`;
            let shared = {
                category : category,
                username : user.displayName,
                useruid : user.uid,
                time : dateTime,
                createdAt : today,
                title : title,
                desc : desc,
                video : video,
                music : music,
            }
            // Add a new document with a generated id.
            let Num;
            const sharedRef = db.collection('shared');
            const sharedNum = db.collection("users").doc(user.uid);
            sharedNum.get().then(function(doc){
                Num = doc.data().shared;
                return Num;
            });
            sharedRef.add(shared)
                .then(function() {
                    sharedNum.update({
                        shared: Num + 1,
                    }).then(message => {
                        console.log("Saved to database [SHARED]");
                        window.location.reload();
                    })
                }).catch(function(error) {
                console.error("Error adding document: ", error);
            });
        } else {
            alert('Not logged in\nGo to profile and log in')
        }
    });
}

export const DisplayShare = class DisplayShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            username: [],
            sender: [],
            time: [],
            title: [],
            desc: [],
            video: [],
            music: [],
            docid: [],
            useruid: [],
        }
        this.ReadShare();
    }
    ReadShare = async () => {
        const sharedRef = db.collection('shared').orderBy('createdAt', "desc");
        const snapshot = await sharedRef.get();

        snapshot.forEach(doc => {
            if (doc.data().category === this.props.shown) {
                this.setState(prevState => ({
                    category: [...prevState.category, doc.data().category],
                    username: [...prevState.username, doc.data().username],
                    time: [...prevState.time, doc.data().time],
                    title: [...prevState.title, doc.data().title],
                    desc: [...prevState.desc, doc.data().desc],
                    video: [...prevState.video, doc.data().video],
                    music: [...prevState.music, doc.data().music],
                    docid: [...prevState.docid, doc.id],
                    useruid: [...prevState.docid, doc.data().useruid],
                }));
                if (firebase.auth().currentUser !== null) {
                    if (doc.data().useruid === firebase.auth().currentUser.uid) {
                        this.setState(prevState => ({
                            sender: [...prevState.sender, true],
                        }));
                    } else {
                        this.setState(prevState => ({
                            sender: [...prevState.sender, false],
                        }));
                    }
                } else {
                    this.setState(prevState => ({
                        sender: [...prevState.sender, false],
                    }));
                }
            } else if (this.props.shown === "all") {
                this.setState(prevState => ({
                    category: [...prevState.category, doc.data().category],
                    username: [...prevState.username, doc.data().username],
                    time: [...prevState.time, doc.data().time],
                    title: [...prevState.title, doc.data().title],
                    desc: [...prevState.desc, doc.data().desc],
                    video: [...prevState.video, doc.data().video],
                    music: [...prevState.music, doc.data().music],
                    docid: [...prevState.docid, doc.id],
                    useruid: [...prevState.docid, doc.data().useruid],
                }));
                if (firebase.auth().currentUser !== null) {
                    if (doc.data().useruid === firebase.auth().currentUser.uid) {
                        this.setState(prevState => ({
                            sender: [...prevState.sender, true],
                        }));
                    } else {
                        this.setState(prevState => ({
                            sender: [...prevState.sender, false],
                        }));
                    }
                } else {
                    this.setState(prevState => ({
                        sender: [...prevState.sender, false],
                    }));
                }
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.category.map((item, index) => {
                    return (
                        <div className={"post"} key={index}>
                            <button className="saved-button" onClick={() => WriteSave(this.state.category[index],this.state.title[index],this.state.desc[index],this.state.video[index],this.state.music[index],this.state.username[index])}><i className="fas fa-bookmark"/></button>
                            <button className={this.state.sender[index] ? "delete-button" : "hide"} onClick={() => DeleteDoc("shared", this.state.docid[index], true)}><i className="fas fa-trash"/></button>
                            <h4 className={"postcategory"}>
                                {this.state.category[index]}
                            </h4>
                            <br/>
                            <input type="posttext" placeholder={this.state.title[index]} readOnly/>
                            <br/>
                            <textarea className="postdesc" name="description" rows="4" cols="50" placeholder={this.state.desc[index]} readOnly/>
                            <br/>
                            <a href={this.state.video[index]}><input type="postlink" placeholder={this.state.video[index]} readOnly/></a>
                            <br/>
                            <a href={this.state.music[index]}><input type="postlink" placeholder={this.state.music[index]} readOnly/></a>
                            <br/>
                            <h5 className={"postuser"} style={this.state.sender[index] ? {color: "#66FF66"} : {color: "white"}}>
                                {this.state.username[index]} - {this.state.time[index]}
                            </h5>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export function WriteSave(category, title, desc, video, music, username) {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            let today = new Date();
            let day = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            let dateTime = `${day}`;
            let saved = {
                category : category,
                username : username,
                saver : user.uid,
                time : dateTime,
                createdAt : today,
                title : title,
                desc : desc,
                video : video,
                music : music,
            }
            // Add a new document with a generated id.
            const savedRef = db.collection('saved');
            savedRef.add(saved)
                .then(function() {
                    alert('Added to [SAVED]')
                }).catch(function(error) {
                console.error("Error adding document: ", error);
            });
        } else {
            alert('Not logged in\nGo to profile and log in')
        }
    });
}

export const DisplaySaved = class DisplaySaved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            username: [],
            time: [],
            title: [],
            desc: [],
            video: [],
            music: [],
            docid: [],
        }
        this.ReadShare();
    }
    ReadShare = async () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                window.location.href='/login';
                alert("You can't see saved without logging in")
            }
        });
        const savedRef = db.collection('saved').orderBy('createdAt', "desc");
        const snapshot = await savedRef.get();

        snapshot.forEach(doc => {
            if (doc.data().saver === firebase.auth().currentUser.uid) {
                this.setState(prevState => ({
                    category: [...prevState.category, doc.data().category],
                    username: [...prevState.username, doc.data().username],
                    time: [...prevState.time, doc.data().time],
                    title: [...prevState.title, doc.data().title],
                    desc: [...prevState.desc, doc.data().desc],
                    video: [...prevState.video, doc.data().video],
                    music: [...prevState.music, doc.data().music],
                    docid: [...prevState.docid, doc.id],
                }));
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.category.map((item, index) => {
                    return (
                        <div className={"post"} key={index}>
                            <button className="saved-button" onClick={() => DeleteDoc("saved", this.state.docid[index])}><i className="fas fa-ban"/></button>
                            <h4 className={"postcategory"}>
                                {this.state.category[index]}
                            </h4>
                            <br/>
                            <input type="posttext" placeholder={this.state.title[index]} readOnly/>
                            <br/>
                            <textarea className="postdesc" name="description" rows="4" cols="50" placeholder={this.state.desc[index]} readOnly/>
                            <br/>
                            <a href={this.state.video[index]}><input type="postlink" placeholder={this.state.video[index]} readOnly/></a>
                            <br/>
                            <a href={this.state.music[index]}><input type="postlink" placeholder={this.state.music[index]} readOnly/></a>
                            <br/>
                            <h5 className={"postuser"}>
                                {this.state.username[index]} - {this.state.time[index]}
                            </h5>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export const AdminPage = class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            username: [],
            title: [],
            desc: [],
            video: [],
            music: [],
            docid: [],
            useruid: [],
            changeuser: "",
            changeuid: "",
        }
        this.ReadShare();
    }
    ReadShare = async () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                window.location.href='/login';
                alert("You can't see saved without logging in")
            }
        });
        const savedRef = db.collection('shared').orderBy('createdAt', "desc");
        const snapshot = await savedRef.get();

        snapshot.forEach(doc => {
            if ("1EVRpW32MscYqqFv99ALrZrHhw03" === firebase.auth().currentUser.uid) {
                this.setState(prevState => ({
                    category: [...prevState.category, doc.data().category],
                    username: [...prevState.username, doc.data().username],
                    title: [...prevState.title, doc.data().title],
                    desc: [...prevState.desc, doc.data().desc],
                    video: [...prevState.video, doc.data().video],
                    music: [...prevState.music, doc.data().music],
                    docid: [...prevState.docid, doc.id],
                    useruid: [...prevState.useruid, doc.data().useruid],
                }));
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.category.map((item, index) => {
                    return (
                        <div className={"post"} key={index}>
                            <button className="saved-button" onClick={() => DeleteDoc("shared", this.state.docid[index])}><i className="fas fa-trash"/></button>
                            <h4 className={"postcategory"}>
                                {this.state.category[index]}
                            </h4>
                            <br/>
                            <input type="posttext" placeholder={this.state.title[index]} readOnly/>
                            <br/>
                            <textarea className="postdesc" name="description" rows="4" cols="50" placeholder={this.state.desc[index]} readOnly/>
                            <br/>
                            <a href={this.state.video[index]}><input type="postlink" placeholder={this.state.video[index]} readOnly/></a>
                            <br/>
                            <a href={this.state.music[index]}><input type="postlink" placeholder={this.state.music[index]} readOnly/></a>
                            <br/>
                            <h5 className={"postuser"}>
                                {this.state.username[index]} - {this.state.useruid[index]}
                            </h5>
                        </div>
                    )
                })}
            </div>
        )
    }
}