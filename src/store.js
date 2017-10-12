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
    },

    mutations: {
        updateSession(state, session) {
            console.log(session);
            session.lastLogin = moment().format();
            state.session = session;
        },

        updateUser(state, user) {
            state.session.user = user;
        },

        updateBrowseData(state, users) {
            state.users = users;
        },

        reloadUserData(state) {
            const payload = {
                token: state.session.token,
                userName: state.session.user.user,
            };

            axios.post('http://localhost:3333/account/get/', payload)
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
    },
    plugins: [createPersistedState()],
});
