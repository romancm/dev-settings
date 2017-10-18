// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import axios from 'axios';
import Toasted from 'vue-toasted';
import vmodal from 'vue-js-modal';

import 'font-awesome/css/font-awesome.css';

import App from './App';
import router from './router';
import { store } from './store';

Vue.use(vmodal);
Vue.use(Toasted, { duration: 2000 });

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// console.log(store.getters.getTodos);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});

FastClick.attach(document.body);
