import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';
import createPersistedState from 'vuex-persistedstate';

// TODO: find more suitable names for methods

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {},
        users: {},
        session: {},
        gistData: {},
    },

    mutations: {
        updateSession(state, token) {
            state.session = {
                token,
                lastLogin: moment().format(),
            };
        },
        updateUser(state, user) {
            console.log('user updated');
            state.user = user;
        },

        updateBrowseData(state, users) {
            state.users = users;
        },

        updateGistData(state, gistData) {
            console.log('gistData updated');
            state.gistData = gistData;
        },

        reloadUserData(state) {
            const payload = {
                token: state.session.token,
                id: state.user._id,
            };

            axios.post('https://atom-settings-api.herokuapp.com/account/get/', payload)
                .then(({ data }) => {
                    store.commit('updateUser', data);
                });
        },

        logout(state) {
            state.session = {};
            state.user = {};
        },
    },

    getters: {
        session(state) { return state.session; },
        user(state) { return state.user; },
        users(state) { return state.users; },
        gistData(state) { return state.gistData; },
    },
    plugins: [createPersistedState()],
});
