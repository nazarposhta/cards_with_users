import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch
} from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import Login from "../views/login/Login";
import CreateAccount from "../views/create_account/CreateAccount";
import Error404 from "../views/Error404";
import Meteor from 'meteor/meteor';
import Profile from "../views/profile/Profile";

const MainRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/create-account" component={CreateAccount}/>
            <Route path="/login" component={Login}/>
            <Route component={Error404}/>
        </Switch>
    </Router>
)
export default MainRouter