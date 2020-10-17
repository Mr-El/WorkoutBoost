import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar"
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Saved from './components/Saved/Saved'
import Profile from './components/Profile/Profile'
import ProfilePosts from './components/Profile/ProfilePosts'
import UserProfile from './components/Profile/UserProfile'
import Arms from './components/Categories/Arms'
import Back from './components/Categories/Back'
import Cardio from './components/Categories/Cardio'
import Chest from './components/Categories/Chest'
import Core from './components/Categories/Core'
import Glutes from './components/Categories/Glutes'
import Legs from './components/Categories/Legs'
import Nutrition from "./components/Categories/Nutrition";
import Shoulders from './components/Categories/Shoulders'
import Other from './components/Categories/Other'
import Admin from './components/Admin/Admin'
import WelcomeStaff from './components/Admin/WelcomeStaff'
import WelcomeVerified from './components/Admin/WelcomeVerified'
import './App.css';

function App() {
  return (
      <Router>
          <div className="App">
              <Navbar/>
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/saved" component={Saved} />
                  <Route path="/login" component={Login} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/profileposts" component={ProfilePosts} />
                  <Route path="/arms" component={Arms} />
                  <Route path="/back" component={Back} />
                  <Route path="/cardio" component={Cardio} />
                  <Route path="/chest" component={Chest} />
                  <Route path="/core" component={Core} />
                  <Route path="/glutes" component={Glutes} />
                  <Route path="/legs" component={Legs} />
                  <Route path="/nutrition" component={Nutrition} />
                  <Route path="/shoulders" component={Shoulders} />
                  <Route path="/other" component={Other} />
                  <Route path="/admin" component={Admin} />
                  <Route path="/welcomestaff" component={WelcomeStaff} />
                  <Route path="/welcomeverified" component={WelcomeVerified} />
                  <Route path={''.startsWith('/userprofile')} exact component={UserProfile} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
