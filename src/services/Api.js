import axios from 'axios';

const baseUrl = 'https://api.punkapi.com/v2/';

const Api = {
    fetchBeers: () => {
        return axios.get(`${baseUrl}beers?per_page=30`).then(res => res.data)
    },
    searchBeers: (term) => {
        return axios.get(`${baseUrl}beers?beer_name=${term}&per_page=30`).then(res => res.data)
    },
    getBeer: (id) => {
        return axios.get(`${baseUrl}beers/${id}`).then(res => res.data)
    }
}

export default Api;