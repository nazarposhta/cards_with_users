import React, { Component } from 'react';
import "./Spinner.scss";

class Spinner extends Component {
    constructor(props){
        super();
        this.state = {};
    }
    render(){
        return(
            <div data-size={this.props.size} className="loader_wrapp">
                <div className="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

        )
    }
}
export default Spinner;