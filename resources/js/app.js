/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import 'babel-polyfill'

import './bootstrap'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import routes from './routes'
import { store } from './store/store'
import Master from './components/layouts/Master'

/** Create the router instance and pass the `routes` option
 You can pass in additional options here, but let's
 keep it simple for now.
 */
Vue.use(VueRouter);

const router = new VueRouter({
    routes, // short for routes: routes
    base: '/',
    mode: 'history',
    history: true
});

/**
 * Create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    store,
    router,
    vuetify,
    components: { Master },
    template: '<Master/>'
}).$mount('#app');
