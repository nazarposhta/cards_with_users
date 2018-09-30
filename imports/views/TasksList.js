import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/collections/tasks';
import AddTask from './common/add_task/AddTask';
import { Button, Icon, Label } from 'semantic-ui-react';

class TasksList extends Component {
    constructor(props){
        super();
        this.state = {};
    }
    removeTask = (id) => {
        Meteor.call('removeTask', id, (err, res) => {
            if(err){
                alert(err.reason);
            }
        });
    }
    render(){
        return (
            <div>
                {
                    this.props.handle ?
                        this.props.tasks.map((obj) => {
                            return (
                                <Label key={obj._id}
                                       as='a'
                                       tag
                                       onClick={() => {this.removeTask(obj._id)}}
                                       color="teal"
                                >
                                    {obj.text}
                                </Label>
                            )
                        })
                        :
                        <li>
                            Loading...
                        </li>
                }
                <AddTask></AddTask>
            </div>
        );
    }
}
export default withTracker(() => {
    var handle = Meteor.subscribe('tasks');
    return {
        handle: handle.ready(),
        tasks: Tasks.find().fetch()
    }
})(TasksList);