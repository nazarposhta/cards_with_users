import React, { Component } from 'react';
import { Form, Container, Grid, Header, Icon } from 'semantic-ui-react';
import {Accounts} from "meteor/accounts-base";
import { Link } from 'react-router-dom';
import {resetFieldsError, updateForm} from '../../lib/helpers';
import HomeRedirector from '../../higher_order/HomeRedirector';
import { validateEmail, validatePassword } from "../../lib/string";
import toastr from "toastr";

class CreateAccount extends Component {
    constructor(props){
        super();
        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            password: '',
            error: false,
            load: false
        };
    }
    createAccount = () => {
        if(!validateEmail(this.state.email) || !validatePassword(this.state.password) || !this.state.first_name || !this.state.last_name){
            this.setState({error: true});
            return;
        }
        if(!this.state.load){
            this.setState({load: true});
            Accounts.createUser({
                email: this.state.email,
                username: this.state.email,
                password: this.state.password,
                profile: {first_name: this.state.first_name, last_name: this.state.last_name}
            }, (err, res) => {
                this.setState({load: false});
                if(err){
                    toastr["error"](err.reason || err.message, "Error!");
                }
            });
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
                            <Form.Field error={this.state.error && !validateEmail(this.state.email)}>
                                <label>Email</label>
                                <input
                                    onFocus={resetFieldsError.bind(this)}
                                    onChange={updateForm.bind(this)}
                                    value={this.state.email}
                                    name="email"
                                    type="text"
                                    placeholder='Email'
                                />
                            </Form.Field>
                            <Form.Field error={this.state.error && !this.state.first_name}>
                                <label>First name</label>
                                <input
                                    onFocus={resetFieldsError.bind(this)}
                                    onChange={updateForm.bind(this)}
                                    value={this.state.first_name}
                                    name="first_name"
                                    type="text"
                                    placeholder='First name'
                                />
                            </Form.Field>
                            <Form.Field error={this.state.error && !this.state.last_name}>
                                <label>Last name</label>
                                <input
                                    onFocus={resetFieldsError.bind(this)}
                                    onChange={updateForm.bind(this)}
                                    value={this.state.last_name}
                                    name="last_name"
                                    type="text"
                                    placeholder='Last name'
                                />
                            </Form.Field>
                            <Form.Field error={this.state.error && !validatePassword(this.state.password)}>
                                <label>
                                    Password <br/>
                                    <span className="explain-text">
                                        Minimum eight characters, at least one letter and one number
                                    </span>
                                </label>
                                <input
                                    onFocus={resetFieldsError.bind(this)}
                                    onChange={updateForm.bind(this)}
                                    value={this.state.password}
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                />
                            </Form.Field>
                            <Form.Button primary>Create</Form.Button>
                        </Form>
                        <br/>
                        <Link to="/login">Already have an account</Link><br/>
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}
export default HomeRedirector(CreateAccount);