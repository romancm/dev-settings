import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from 'axios';

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {},
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
    },

    getters: {
        session(state) { return state.session; },
        user(state) { return state.user; },
        gistData(state) { return state.gistData; },
    },
    plugins: [createPersistedState()],
});
