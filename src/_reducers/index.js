import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { compose } from './compose.reducer';
import { mail } from './mail.reducer';
import { mails } from './mails.reducer';
import { mailStatistics } from './mailStatistics.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  compose,
  mail,
  mails,
  mailStatistics,
  alert
});

export default rootReducer;