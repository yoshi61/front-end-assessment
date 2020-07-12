import apiService from '../../api-services';
const API_ZOMATO = axios.create(apiService.zomato);

// state
const state = {
    api_data: {
        restaurants:[],
        results_found: 0,
        results_start: 0,
        results_shown: 0
    }
};

// getters
const getters = {
    getResultSet:  state => {
        return state.api_data;
    },
};

const actions = {
    searchForRestaurants(context, params) {
        return API_ZOMATO.get('/search', {params: params})
            .then( response => {

                if (response.status != 200){
                    context.commit('setApiData', {restaurants:[], results_found: 0, results_start: 0, results_shown: 0})
                }else{
                    context.commit('setApiData', response.data);
                }

            })
            .catch( error =>{
                if(!!error.response){
                    context.commit('setApiResponseCode', error.response.status)
                }
                console.log(error.message);
            });
    },

    // Reset api data to default
    clearApiData({commit}){
        commit('setApiData', {restaurants:[], results_found: 0, results_start: 0, results_shown: 0});
    },
};

// mutations
const mutations = {

    setApiData( state, api_data ){
        state.api_data = api_data;
    },
};

// Export const
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}