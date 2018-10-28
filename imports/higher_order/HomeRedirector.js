import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

export default function (WrappedComponent) {
    class HomeRedirector extends React.Component {
        componentWillMount(){
            if (this.props.user_id) {
                this.props.history.push('/');
            }
        }

        componentDidUpdate(prevProps, prevState){
            if (this.props.user_id) {
                this.props.history.push('/');
            }
        }
        render (){
            return(<WrappedComponent {...this.props}/>)
        }
    }
    return withRouter(withTracker(() => {
        return {
            user_id: Meteor.userId(),
        }
    })(HomeRedirector));
}