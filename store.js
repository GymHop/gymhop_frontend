
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //allows you to write action creators that return a function instead of an action
import { composeWithDevTools } from 'redux-devtools-extension';


import rootReducer from './reducers/rootReducer';

export function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
}
