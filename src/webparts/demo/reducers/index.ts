import { Reducer, combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import lists from './listsReducer';
import { RootState } from '../state';

// ALL reducers must got through this reducer
const rootReducer = combineReducers<RootState>({
  lists,
  form,
});

export default rootReducer;
