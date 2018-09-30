import React, { Component } from 'react';
import TasksList from './TasksList';
import { Container, Header } from 'semantic-ui-react';
import SideBar from './common/sidebar/SideBar';
import App from './App';

export default class Home extends Component {

    render() {
        return (
            <App>
                <Container>
                    <SideBar/>
                    <Header as='h1'>Add your notes.</Header>
                    <TasksList/>
                </Container>
            </App>
        );
    }
}