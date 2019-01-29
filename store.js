
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //allows you to write action creators that return a function instead of an action


import rootReducer from './reducers/rootReducer';

export function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
