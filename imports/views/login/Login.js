import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form, Container, Header, Icon, Grid} from 'semantic-ui-react';
import {Meteor} from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super();
        this.state = {
            email: '',
            password: ''
        };
    }
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
    logIn = () => {
        Meteor.loginWithPassword(this.state.email, this.state.password, (err, res) => {
            if(err){
                alert(err.reason || err.message);
            }
        });
    }
    updateForm = (e) => {
        let new_state = {};
        new_state[e.target.name] = e.target.value;
        this.setState(new_state);
    }
    render(){
        return(
            <Container className="login">
                    <Grid centered>
                        <Grid.Column mobile={16} tablet={8} computer={6}>
                            <Header>
                                <Icon
                                    name="user"
                                    size="big"
                                />
                                Login to Krakow city chat
                            </Header>
                            <Form onSubmit={ this.logIn }>
                                <Form.Input
                                    onChange={this.updateForm}
                                    value={this.state.email}
                                    name="email"
                                    type="text"
                                    fluid
                                    label='Email'
                                    placeholder='Email'
                                />
                                <Form.Input
                                    onChange={this.updateForm}
                                    value={this.state.password}
                                    name="password"
                                    type="password"
                                    fluid
                                    label='Password'
                                    placeholder='Password'
                                />
                                <Form.Button primary>Submit</Form.Button>
                            </Form>
                            <br/>
                            <Link to="/create-account">Create account</Link>
                        </Grid.Column>
                    </Grid>
            </Container>
        )
    }
}
export default withRouter(withTracker(() => {
    return {
        user_id: Meteor.userId(),
        loginning: Meteor.loggingIn()
    }
})(Login));