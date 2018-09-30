import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

class App extends Component {
    constructor(props){
        super();
        this.state = {};
    }
    componentWillMount(){
        if (!this.props.user_id) {
            this.props.history.push('/login');
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (!this.props.user_id) {
            this.props.history.push('/login');
        }
    }
    render(){
        return(
            <div className="app">
                {this.props.children}
            </div>
        )
    }
}
export default withRouter(withTracker(() => {
    return {
        user_id: Meteor.userId(),
        loginning: Meteor.loggingIn()
    }
})(App));