// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vMediaQuery from 'v-media-query';
import FastClick from 'fastclick';
import VueContentPlaceholders from 'vue-content-placeholders';
import axios from 'axios';
import vmodal from 'vue-js-modal';
import VueGitHubButtons from 'vue-github-buttons'; // Component plugin

import 'prismjs';
import 'prism-themes/themes/prism-atom-dark.css';
import 'vue-github-buttons/dist/vue-github-buttons.css'; // Stylesheet
import 'font-awesome/css/font-awesome.css';
import './styles/_variables.scss';

import App from './App';
import router from './router';
import { store } from './store';

Vue.use(VueGitHubButtons, { useCache: true });
Vue.use(ElementUI);
Vue.use(vMediaQuery);
Vue.use(VueContentPlaceholders);
Vue.use(vmodal);

Vue.config.productionTip = false;

/* eslint-disable arrow-body-style */
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        router.push({ name: 'logout', query: { sessionExpired: true } });
    }
    return Promise.reject(error.response);
});

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
