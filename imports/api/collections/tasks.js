import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks', {idGeneration: 'STRING'});

if (Meteor.isServer) {
    Meteor.publish('tasks', function() {
        if(Meteor.userId()){
            return Tasks.find({owner: Meteor.userId()});
        }
        return [];
    });
}
Meteor.methods({
    'addTask': function (task_name) {
        check(task_name, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        Tasks.insert({text: task_name, date: new Date(), owner: Meteor.userId()});
    },
    'removeTask': function (id) {
        check(id, String);
        if(!Meteor.userId()){
            throw new Meteor.Error('only_for_autorized_users', "Only for autorized users");
        }
        Tasks.remove({_id: id, owner: Meteor.userId()});
    }
})