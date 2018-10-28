import React, { Component } from 'react';
import {Container, Grid, Header, Image, Form, Button, Dropdown} from "semantic-ui-react";
import SideBar from "../common/sidebar/SideBar";
import App from "../App";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { countryOptions } from '../../lib/countries';
import { withTracker } from 'meteor/react-meteor-data';
import {Meteor} from "meteor/meteor";
import Spinner from "../common/spinner/Spinner";


class Profile extends Component {
    constructor(props){
        super();
        this.state = {
            first_name: '',
            last_name: '',
            birthday: '',
            gender: '',
            country: '',
            about_me: '',
            email: '',
            load: false
        };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.user_info && nextProps.user_info.profile){
            let profile = nextProps.user_info.profile || {};
            this.setState({
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                birthday: profile.birthday || '',
                gender: profile.gender || '',
                country: profile.country || '',
                about_me: profile.about_me || '',
                email: nextProps.user_info.username || ''
            });
        }
    }
    updateValue = (val, key) => {
        let new_state = {};
        new_state[key] = val;
        this.setState(new_state);
    }
    saveParameters = () => {
        if(!this.state.load &&
            this.state.first_name &&
            this.state.last_name &&
            this.state.birthday &&
            this.state.gender &&
            this.state.country &&
            this.state.about_me){
            this.setState({load: true}, () => {
                Meteor.call('updateUser',
                    this.state.first_name,
                    this.state.last_name,
                    this.state.birthday,
                    this.state.gender,
                    this.state.country,
                    this.state.about_me,
                    (err, res) => {
                        this.setState({load: false});
                        if(err){
                            alert(err.reason || err.message)
                        }
                    }
                )
            })
        }
    }
    render(){
        return(
            <App>
                <Container>
                    <div className="profile">
                        <SideBar/>
                        <Header>Profile</Header>
                        <Grid>
                            <Grid.Column mobile={16} tablet={6} computer={6}>
                                <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid />
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={10} computer={10}>
                                <Form onSubmit={this.saveParameters}>
                                    <Form.Field
                                        error={this.state.first_name || !this.props.handle ? false : true}
                                        className="spinner-wrapp"
                                    >
                                        <label>First Name</label>
                                        <input
                                            onChange={(e) => {this.updateValue(e.target.value, 'first_name')}}
                                            value={this.state.first_name}
                                            placeholder='First Name'
                                        />
                                        {
                                            !this.props.handle ?
                                                <Spinner
                                                    size="small"
                                                />
                                                :
                                                null
                                        }
                                    </Form.Field>
                                    <Form.Field error={this.state.last_name || !this.props.handle  ? false : true}>
                                        <label>Last Name</label>
                                        <input
                                            onChange={(e) => {this.updateValue(e.target.value, 'last_name')}}
                                            value={this.state.last_name}
                                            placeholder='Last Name'
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input
                                            value={this.state.email}
                                            placeholder='Email'
                                            disabled
                                        />
                                    </Form.Field>
                                    <Form.Field error={this.state.birthday || !this.props.handle  ? false : true}>
                                        <label>Birthday</label>
                                        <DayPickerInput
                                            onDayChange={(e) => {this.updateValue(e, 'birthday')}}
                                            value={this.state.birthday}
                                        />
                                    </Form.Field>
                                    <Form.Select
                                        error={this.state.gender || !this.props.handle  ? false : true}
                                        fluid
                                        label='Gender'
                                        options={
                                            [
                                                { key: 'm', text: 'Male', value: 'male' },
                                                { key: 'f', text: 'Female', value: 'female' },
                                            ]
                                        }
                                        placeholder='Gender'
                                        value={this.state.gender}
                                        onChange={(e, data) => {this.updateValue(data.value, 'gender')}}
                                    />
                                    <Form.Field error={this.state.country || !this.props.handle  ? false : true}>
                                        <label>Country</label>
                                        <Dropdown
                                            placeholder='Select Country'
                                            fluid
                                            search
                                            selection
                                            options={countryOptions}
                                            value={this.state.country}
                                            onChange={(e, data) => {this.updateValue(data.value, 'country')}}
                                        />
                                    </Form.Field>
                                    <Form.TextArea
                                        error={this.state.about_me || !this.props.handle  ? false : true}
                                        onChange={(e) => {this.updateValue(e.target.value, 'about_me')}}
                                        value={this.state.about_me}
                                        label='About me'
                                        placeholder='Tell us more about you...'
                                    />
                                    <Button primary={
                                        this.state.first_name &&
                                        this.state.last_name &&
                                        this.state.birthday &&
                                        this.state.gender &&
                                        this.state.country &&
                                        this.state.about_me ?
                                            true : false
                                    } type='submit' className="spinner-wrapp">
                                        Submit
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
                            </Grid.Column>
                        </Grid>
                    </div>
                </Container>
            </App>
        )
    }
}
export default withTracker(() => {
    let handle = Meteor.subscribe('current_user');
    return {
        user_info: Meteor.user(),
        handle: handle.ready()
    }
})(Profile);