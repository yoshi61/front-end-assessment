import apiService from '../../api-services';
const API_ZOMATO = axios.create(apiService.zomato);

const actions = {
    searchForRestaurants(context) {
        return new Promise((resolve, reject) => {
            API_ZOMATO.get('/search')
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
};

// Export const
export default{
    namespaced: true,
    actions,
}