import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

class AddTask extends Component {
    constructor(props){
        super();
        this.state = {text: ''};
    }
    render(){
        return(
            <form  onSubmit={(e) => {
                e.preventDefault();
                Meteor.call('addTask', this.state.text, (err, res) => {
                    this.setState({text: ''});
                    if(err){
                        alert(err.reason);
                    }
                })
            }} className="add_task">
                <Input
                    icon='tags'
                    iconPosition='left'
                    label={{ tag: true, content: 'Add Tag', color: 'yellow' }}
                    labelPosition='right'
                    placeholder='Enter task name'
                    value={this.state.text}
                    onChange={(e) => { this.setState({ text: e.target.value }) }}
                />
            </form>
        )
    }
}
export default AddTask;