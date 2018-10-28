import React, { Component } from 'react';
import {Container, Form, Grid, Header, Icon, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./ForgotPassword.scss";
import { updateForm, resetFieldsError } from "../../lib/helpers";
import { Accounts } from 'meteor/accounts-base';
import toastr from 'toastr';
import Spinner from "../common/spinner/Spinner";
import { validateEmail } from '../../lib/string';

class ForgotPassword extends Component {
    constructor(props){
        super();
        this.state = {load: false, error: false};
    }
    forgotPassword = () => {
        if(!validateEmail(this.state.email)){
            this.setState({error: true});
            return;
        }
        if(!this.state.load){
            this.setState({load: true});
            Accounts.forgotPassword({ email: this.state.email }, (err, res) => {
                this.setState({load: false});
                if(err){
                    toastr["error"](err.reason || err.message, "Error!");
                } else {
                    this.setState({email: ''});
                    toastr["success"]("We have sent you an email.", "Greate!");
                }
            });
        }

    }
    render(){
        return(
            <Container className="forgot_password">
                <Grid centered>
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <Header>
                            <Icon
                                name="frown outline"
                                size="big"
                            />
                            Forgot your password?
                        </Header>
                        <p>
                            Provide an email address you have used while registration. We will send you an email with link for
                            recovering your password.
                        </p>
                        <Form onSubmit={ this.forgotPassword }>
                            <Form.Field error={this.state.error}>
                                <label>Email</label>
                                <input
                                    onFocus={ resetFieldsError.bind(this) }
                                    onChange={updateForm.bind(this)}
                                    value={this.state.email || ''}
                                    name="email"
                                    type="text"
                                    label='Email'
                                    placeholder='Email'
                                />
                            </Form.Field>
                            <Button primary className="spinner-wrapp">
                                Send
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
                        <Link to="/login">Login</Link><br/>
                        <Link to="/create-account">Create account</Link>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
}
export default ForgotPassword;