import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

// TODO: find more suitable names for methods

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: {},
        session: {},
        environment: {},
    },

    mutations: {
        updateSession(state, session) {
            session.lastLogin = moment().format();
            state.session = session;
        },

        updateUser(state, user) {
            state.session.user = user;
        },

        updateBrowseData(state, users) {
            state.users = users;
        },

        setEnvironment(state, environment) {
            if (Object.keys(state.environment).length === 0) {
                // baseUrl: environment === 'development' ? 'http://localhost:3333' : 'https://atom-settings-api.herokuapp.com',
                state.environment = {
                    baseUrl: environment === 'development' ? 'http://localhost:3333' : 'http://api.atomsettings.com',
                    githubClientId: environment === 'development' ? '5aeeffcd5b5afb0043fa' : '5a92b9da5f2017553b90',
                };
            }
        },

        reloadUserData(state) {
            const payload = {
                token: state.session.token,
                userName: state.session.user.user,
            };

            axios.post(`${state.environment.baseUrl}/account/get/`, payload)
                .then(({ data }) => {
                    store.commit('updateUser', data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        logout(state) {
            state.session = {};
        },
    },

    getters: {
        session(state) { return state.session; },
        users(state) { return state.users; },
        environment(state) { return state.environment; },
    },
    plugins: [createPersistedState()],
});
