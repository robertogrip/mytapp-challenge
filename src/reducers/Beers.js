import { GET_BEER, FETCH_BEERS, SEARCH_BEERS } from '../constants';

const initialState = {
    beer: {},
    beers: [],
    searchBeers: []
};

const Beers = (state = initialState, action) => {
    switch (action.type) {
        case GET_BEER:
            return {
                ...state,
                beer: action.beer
            };
        case FETCH_BEERS:
            return {
                ...state,
                beers: action.beers
            };
        case SEARCH_BEERS:
            return {
                ...state,
                searchBeers: action.searchBeers
            };
        default:
            return state;
    }
};

export { Beers };