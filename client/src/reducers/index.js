import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form'
import authReducer from './auth_reducer'
import spamReducer from './spam_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  spam: spamReducer
});

export default rootReducer;
