import React, { Component } from 'react';
import SideBar from './common/sidebar/SideBar';
import { Container, Header } from 'semantic-ui-react';
import App from './App';


class About extends Component {
    constructor(props){
        super();
        this.state = {};
    }
    render(){
        return(
            <App>
                <Container>
                    <SideBar/>
                    <Header>About</Header>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                        but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
                        in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                        with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </p>
                </Container>
            </App>
        )
    }
}
export default About;