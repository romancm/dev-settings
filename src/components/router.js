import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login/Login';
import Logout from '@/components/Logout/Logout';
import Register from '@/components/Register/Register';
import ResetPassword from '@/components/ResetPassword/ResetPassword';
import Dashboard from '@/components/Dashboard/Dashboard';
import Browse from '@/components/Browse/Browse';
import User from '@/components/User/User';
// Settings
import Settings from '@/components/Settings/Settings';
import SettingsProfile from '@/components/Settings/Profile';
import SettingsSocial from '@/components/Settings/Social';
import SettingsGithub from '@/components/Settings/Github';
import SettingsAccount from '@/components/Settings/Account';
import moment from 'moment';

import { store } from '../store';

Vue.use(Router);

const routes = new Router({
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: 'Atom Settings',
            },
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: 'Login to Atom Settings',
            },
        },
        {
            path: '/logout',
            component: Logout,
        },
        {
            path: '/register',
            component: Register,
            meta: {
                title: 'Create an Atom Settings Account',
            },
        },
        {
            path: '/reset-password',
            component: ResetPassword,
            meta: {
                title: 'Reset your Atom Settings Password',
            },
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                title: 'Atom Settings Dashboard',
            },
        },
        {
            path: '/browse',
            component: Browse,
            meta: {
                title: 'Browse Atom Settings',
            },
        },
        {
            path: '/browse/:id',
            component: User,
            meta: {
                title: 'Browse {{User}} Atom Settings',
            },
        },
        {
            path: '/settings',
            component: Settings,
            meta: {
                title: 'Atom Settings',
            },
            children: [
                {
                    path: 'github',
                    component: SettingsGithub,
                    meta: {
                        title: 'Atom Settings | Sync',
                    },
                },
                {
                    path: 'profile',
                    component: SettingsProfile,
                    meta: {
                        title: 'Atom Settings | Profile',
                    },
                },
                {
                    path: 'social',
                    component: SettingsSocial,
                    meta: {
                        title: 'Atom Settings | Social',
                    },
                },
                {
                    path: 'account',
                    component: SettingsAccount,
                    meta: {
                        title: 'Atom Settings | Account',
                    },
                },
            ],
        },
    ],
});

routes.beforeEach((to, from, next) => {
    const session = store.getters.session;
    const isAuth = session && session.token;
    const isAuthPage = ['/register', '/login', '/reset-password', '/logout', '/'].includes(to.path);

    Vue.nextTick(() => {
        // TODO: Refactor, less code?
        if (isAuth) {
            if (isAuthPage) {
                next('/dashboard');
            } else if (session && !session.retain) {
                // console.log('session should expire after a day');
                const sessionAge = moment().diff(session.lastLogin, 'days');
                // console.log(sessionAge);
                if (sessionAge > 0) {
                    console.log('session is too old, logout!');
                }
            }
        } else {
            console.log('no session');
            if (isAuthPage) {
                next();
            } else {
                next('/login');
            }
        }
    });


    // Handle auth routing

    // Redirect if no session found


    // $rootScope.notVerified = $rootScope.session && !$rootScope.session.verified;

    Vue.nextTick(() => {
        const title = to.meta.title ? to.meta.title : 'NO TITLE';
        document.title = title;
    });
    next(); // make sure to always call next()!
    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //     // this route requires auth, check if logged in
    //     // if not, redirect to login page.
    //     if (!auth.loggedIn()) {
    //         next({
    //             path: '/login',
    //             query: { redirect: to.fullPath }
    //         })
    //     } else {
    //         next()
    //     }
    // } else {
    //     next() // make sure to always call next()!
    // }
});

export default routes;
