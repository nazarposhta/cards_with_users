import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error404 extends Component {
    constructor(props){
        super();
        this.state = {};
    }
    render(){
        return(
            <div>
                Error 404...
                Page not found...
                <Link to="/">Go Home</Link>
            </div>
        )
    }
}
export default Error404;