import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import {Meteor} from "meteor/meteor";

class SideBar extends Component {
    constructor(props){
        super();
        this.state = {
            active: null
        };
    }
    render(){
        return(
            <div className="sidebar">
                <Menu>
                    <Menu.Item
                        active={this.state.active === 'home'}
                    >
                        <NavLink exact className="main-link" activeClassName="active" to="/">
                            <Icon name="home" size="small" />
                            <span>Home</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item
                        active={this.state.active === 'about'}
                    >
                        <NavLink exact className="main-link" activeClassName="active" to="/about">
                            <Icon name="info circle" size="small" />
                            <span>About</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item
                        active={this.state.active === 'profile'}
                    >
                        <NavLink exact className="main-link" activeClassName="active" to="/profile">
                            <Icon name="user" size="small" />
                            <span>Profile</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={() => {
                            Meteor.logout();
                        }}>
                            <Icon name="log out" size="small" />
                            <span>Logout</span>
                        </a>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
export default SideBar;