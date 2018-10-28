import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MainRouter from '../imports/routes/MainRouter';
import { Accounts } from 'meteor/accounts-base';

import 'react-day-picker/lib/style.css';

Meteor.startup(() => {
    render(<MainRouter/>, document.getElementById('render-target'));
});