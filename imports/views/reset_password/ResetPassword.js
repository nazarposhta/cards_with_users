import React, { Component } from 'react';
import {Container, Form, Grid, Header, Icon, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import "./ResetPassword.scss";
import {resetFieldsError, updateForm} from "../../lib/helpers";
import { Accounts } from 'meteor/accounts-base';
import HomeRedirector from '../../higher_order/HomeRedirector';
import {validatePassword} from "../../lib/string";
import Spinner from "../common/spinner/Spinner";
import toastr from "toastr";

class ResetPassword extends Component {
    constructor(props){
        super();
        this.state = {
            new_password: '',
            error: false,
            load: false
        };
    }
    setNewPassword = () => {
        if(!validatePassword(this.state.new_password)){
            this.setState({ error: true });
            return;
        }
        if(!this.state.load){
            this.setState({load: true});
            Accounts.resetPassword(this.props.match.params._token, this.state.new_password, (err, res) => {
                this.setState({load: false});
                if(err){
                    toastr["error"](err.reason || err.message, "Error!");
                }
            });
        }
    }
    render(){
        return(
            <Container className="reset_password">
                <Grid centered>
                    <Grid.Column mobile={16} tablet={8} computer={6}>
                        <Header>
                            <Icon
                                name="edit"
                                size="big"
                            />
                            Provide your new password
                        </Header>
                        <Form onSubmit={ this.setNewPassword }>
                            <Form.Field error={this.state.error && !validatePassword(this.state.new_password)}>
                                <label>
                                    Password <br/>
                                    <span className="explain-text">
                                        Minimum eight characters, at least one letter and one number
                                    </span>
                                </label>
                                <input
                                    onFocus={resetFieldsError.bind(this)}
                                    onChange={updateForm.bind(this)}
                                    value={this.state.new_password || ''}
                                    name="new_password"
                                    type="password"
                                    placeholder='Password'
                                />
                            </Form.Field>
                            <Button primary>
                                Save
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
export default HomeRedirector(ResetPassword);