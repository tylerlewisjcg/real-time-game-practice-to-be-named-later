import { createStore, applyMiddleware } from 'redux';
import userReducer from './userReducer';
import promiseMiddleware from 'redux-promise-middleware';

const middleware = applyMiddleware( promiseMiddleware() );

export default createStore( userReducer, middleware );