import { Beers } from './Beers';
import { combineReducers } from 'redux';

const Reducers = combineReducers({
    beers: Beers
});

export { Reducers };