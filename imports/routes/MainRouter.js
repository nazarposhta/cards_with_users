import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Home from '../views/Home';
import About from '../views/About';
import Login from "../views/login/Login";
import CreateAccount from "../views/create_account/CreateAccount";
import Error404 from "../views/Error404";
import Profile from "../views/profile/Profile";
import ForgotPassword from '../views/forgot_password/ForgotPassword';
import ResetPassword from '../views/reset_password/ResetPassword';

const MainRouter = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/create-account" component={CreateAccount}/>
            <Route path="/login" component={Login}/>
            <Route path="/forgot-password" component={ForgotPassword}/>
            <Route path="/reset-password/:_token" component={ResetPassword}/>
            <Route component={Error404}/>
        </Switch>
    </Router>
)
export default MainRouter