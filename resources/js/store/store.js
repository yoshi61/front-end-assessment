import Vue from 'vue'
import Vuex from 'vuex'
import zomatoApis from './modules/zomato-apis';

// Set Vuex
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        zomatoApis,
    },
});



