import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: {},
        userCache: {},
        gistCache: {},
        session: {},
        environment: {},
    },

    mutations: {
        setSession(state, session) {
            session.lastLogin = moment().format();
            state.session = session;
        },

        updateSessionUser(state, user) {
            state.session.user = user;
        },

        updateBrowseData(state, users) {
            state.users = users;
        },

        cacheUser(state, data) {
            data.userDataCachedDate = moment().format();
            Vue.set(state.userCache, data.user, data);
        },

        cacheUserGistData(state, data) {
            data.gistCachedDate = moment().format();
            Vue.set(state.gistCache, data.owner.login, data);
        },

        setEnvironment(state, environment) {
            if (Object.keys(state.environment).length === 0) {
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
                    store.commit('updateSessionUser', data);
                });
        },

        logout(state) {
            state.session = {};
        },
    },

    getters: {
        gistCache(state) { return state.gistCache; },
        userCache(state) { return state.userCache; },
        session(state) { return state.session; },
        users(state) { return state.users; },
        environment(state) { return state.environment; },
    },
    plugins: [createPersistedState()],
});
