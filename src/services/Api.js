import axios from 'axios';

const baseUrl = 'https://api.punkapi.com/v2/';

const Api = {
    fetchBeers: () => {
        return axios.get(`${baseUrl}beers`).then(res => res.data)
    },
    searchBeers: (term) => {
        return axios.get(`${baseUrl}beers?beer_name=${term}`).then(res => res.data)
    },
    getBeer: (id) => {
        return axios.get(`${baseUrl}${id}`).then(res => res.data)
    }
}

export default Api;