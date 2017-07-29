import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { RootState } from '../state';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

export default function configureStore(initialState?) {

  const middleWares = [
    thunkMiddleware,
    // loggerMiddleware,
  ];

  const enhancer = composeEnhancers(applyMiddleware(...middleWares));

  return createStore<RootState>(rootReducer, initialState, enhancer);
}
