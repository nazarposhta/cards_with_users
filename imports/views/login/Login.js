import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Form, Container, Header, Icon, Grid, Button} from 'semantic-ui-react';
import { updateForm, resetFieldsError } from '../../lib/helpers';
import HomeRedirector from '../../higher_order/HomeRedirector';
import { validateEmail, validatePassword } from "../../lib/string";
import Spinner from "../common/spinner/Spinner";
import toastr from "toastr";

class Login extends Component {
    constructor(props){
        super();
        this.state = {
            email: '',
            password: '',
            error: false
        };
    }
    logIn = () => {
        if(!validateEmail(this.state.email) || !validatePassword(this.state.password)){
            this.setState({ error: true });
            return;
        }
        if(!this.state.load){
            this.setState({ load: true });
            Meteor.loginWithPassword({username: this.state.email}, this.state.password, (err, res) => {
                this.setState({ load: false });
                if(err){
                    toastr["error"](err.reason || err.message, "Error!");
                }
            });
        }

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
                                <Button primary className="spinner-wrapp">
                                    Login
                                    {
                                        this.state.load ?
                                            <Spinner
                                                size="small"
                                            />
                                            :
                                            null
                                    }
                                </Button>
                            </Form>
                            <br/>
                            <Link to="/create-account">Create account</Link><br/>
                            <Link to="/forgot-password">Forgot your password?</Link>
                        </Grid.Column>
                    </Grid>
            </Container>
        )
    }
}
export default HomeRedirector(Login);