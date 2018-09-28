import { GET_BEER, FETCH_BEERS, SEARCH_BEERS } from '../constants';

//import Api Service
import { Api } from '../services';

const searchBeersSuccess = (beers) => ({
    type: SEARCH_BEERS,
    searchBeers: beers
});

const fetchBeersSuccess = (beers) => ({
    type: FETCH_BEERS,
    beers: beers
});

const getBeersuccess = (beer) => ({
    type: GET_BEER,
    beer: beer[0]
});

function FetchBeers() {
    return function action(dispatch) {
        return Api.fetchBeers()
            .then(response => dispatch(fetchBeersSuccess(response)));
    }
};

function SearchBeers(term) {
    return function action(dispatch) {
        return Api.searchBeers(term)
            .then(response => dispatch(searchBeersSuccess(response)));
    }
};

function GetBeer(id) {
    return function action(dispatch) {
        return Api.getBeer(id)
            .then(response => dispatch(getBeersuccess(response)));
    }
};

export { FetchBeers, SearchBeers, GetBeer };