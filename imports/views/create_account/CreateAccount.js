import React, { Component } from 'react';
import { Form, Container, Grid, Header, Icon } from 'semantic-ui-react';
import {Accounts} from "meteor/accounts-base";
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import {Meteor} from "meteor/meteor";

class CreateAccount extends Component {
    constructor(props){
        super();
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            nick_name: ''
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
    updateForm = (e) => {
        let new_state = {};
        new_state[e.target.name] = e.target.value;
        this.setState(new_state);
    }
    createAccount = () => {
        if(this.state.email && this.state.password && this.state.first_name && this.state.last_name && this.state.nick_name){
            Accounts.createUser({
                username: this.state.email,
                password: this.state.password,
                profile: {first_name: this.state.first_name, last_name: this.state.last_name, nick_name: this.state.nick_name}
            }, (err, res) => {
                if(!err){
                    alert('created');
                } else {
                    alert(err.reason || err.message);
                }
            });
        } else {
            alert('All fields required.')
        }
    }
    render(){
        return(
            <Container className="create_account">
                <Grid centered>
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <Header>
                            <Icon
                                name="signup"
                                size="big"
                            />
                            Sign Up for Krakow city chat
                        </Header>
                        <Form onSubmit={ this.createAccount }>
                            <Form.Input
                                onChange={this.updateForm}
                                value={this.state.email}
                                name="email"
                                type="text"
                                fluid
                                label='Email'
                                placeholder='Email'
                                widths={16}
                            />
                            <Form.Input
                                onChange={this.updateForm}
                                value={this.state.nick_name}
                                name="nick_name"
                                type="text"
                                fluid
                                label='Nick name'
                                placeholder='Nick name'
                                widths={16}
                            />
                            <Form.Input
                                onChange={this.updateForm}
                                value={this.state.first_name}
                                name="first_name"
                                type="text"
                                fluid
                                label='First name'
                                placeholder='First name'
                            />
                            <Form.Input
                                onChange={this.updateForm}
                                value={this.state.last_name}
                                name="last_name"
                                type="text"
                                fluid
                                label='Last name'
                                placeholder='Last name'
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
                        <Link to="/login">Already have an account</Link>
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
})(CreateAccount));