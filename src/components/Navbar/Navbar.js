import React, { Component } from 'react';
import { MenuItems } from "./Menuitems";
import { Button } from "../Button"
import { Status } from "../Firebase";
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }
    render() {
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">BOOST <i className="fas fa-heartbeat"/></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                    <li>
                        <a className={'nav-links-mobile'} onClick={Status}>Profile</a>
                    </li>
                </ul>
                <a onClick={Status}><Button>Profile</Button></a>
            </nav>
        )
    }
}

export default Navbar;