import Vue from 'vue';
import Router from 'vue-router';
import Browse from '@/components/Browse/Browse';
import Dashboard from '@/components/Dashboard/Dashboard';
import Home from '@/components/Home';
import Login from '@/components/Login/Login';
import Logout from '@/components/Logout/Logout';
import Register from '@/components/Register/Register';
import ResetPassword from '@/components/ResetPassword/ResetPassword';

// User Profile
import User from '@/components/User/User';
import Packages from '@/components/User/Packages';
import InitScript from '@/components/User/InitScript';
import Keymaps from '@/components/User/Keymaps';
import Settings from '@/components/User/Settings';
import Snippets from '@/components/User/Snippets';
import Styles from '@/components/User/Styles';

// http://localhost:8080/#/auth

import VerifyAccount from '@/components/VerifyAccount/VerifyAccount';
// Admin
import AdminPage from '@/components/Admin/AdminPage';

// Github Auth
import Handshake from '@/components/Auth/Handshake';
// Settings
import SettingsPage from '@/components/Settings/SettingsPage';
import SettingsGetStarted from '@/components/Settings/SettingsGetStarted';
import SettingsProfile from '@/components/Settings/SettingsProfile';
import SettingsSocial from '@/components/Settings/SettingsSocial';
import SettingsGithub from '@/components/Settings/SettingsGithub';
import SettingsAccount from '@/components/Settings/SettingsAccount';

// 3rd party
import moment from 'moment';

// Absolute imports
import { store } from '../store';

Vue.use(Router);

const routes = new Router({
    mode: 'history',
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
                unAuth: true,
            },
        },
        {
            path: '/logout',
            component: Logout,
            meta: {
                auth: true,
            },
        },
        {
            path: '/register',
            component: Register,
            meta: {
                title: 'Create an Atom Settings Account',
                unAuth: true,
            },
        },
        {
            path: '/reset-password',
            component: ResetPassword,
            meta: {
                title: 'Reset your Atom Settings Password',
                unAuth: true,
            },
        },
        {
            path: '/admin',
            component: AdminPage,
            meta: {
                title: 'Atom Settings Admin',
                auth: true,
            },
        },
        {
            path: '/auth/handshake',
            component: Handshake,
            meta: {
                title: 'Auth',
                auth: false,
                hideNav: true,
            },
        },
        {
            path: '/dashboard',
            component: Dashboard,
            meta: {
                title: 'Atom Settings Dashboard',
                auth: true,
            },
        },
        {
            path: '/verify/:id/:token',
            component: VerifyAccount,
            meta: {
                title: 'Atom Settings | Verify Account',
                hideVerifyBanner: true,
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
            children: [
                {
                    path: 'packages',
                    name: 'packages',
                    component: Packages,
                },
                {
                    path: 'init-script',
                    name: 'init-script',
                    component: InitScript,
                },
                {
                    path: 'keymaps',
                    component: Keymaps,
                    name: 'keymaps',
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: Settings,
                },
                {
                    path: 'snippets',
                    name: 'snippets',
                    component: Snippets,
                },
                {
                    path: 'styles',
                    name: 'styles',
                    component: Styles,
                },
            ],
        },
        {
            path: '/settings',
            component: SettingsPage,
            meta: {
                title: 'Atom Settings',
                auth: true,
            },
            children: [
                {
                    path: '',
                    component: SettingsGetStarted,
                    meta: {
                        title: 'Atom Settings | Get Started',
                        auth: true,
                    },
                },
                {
                    path: 'github',
                    component: SettingsGithub,
                    meta: {
                        title: 'Atom Settings | Sync',
                        auth: true,
                    },
                },
                {
                    path: 'profile',
                    component: SettingsProfile,
                    meta: {
                        title: 'Atom Settings | Profile',
                        auth: true,
                    },
                },
                {
                    path: 'social',
                    component: SettingsSocial,
                    meta: {
                        title: 'Atom Settings | Social',
                        auth: true,
                    },
                },
                {
                    path: 'account',
                    component: SettingsAccount,
                    meta: {
                        title: 'Atom Settings | Account',
                        auth: true,
                    },
                },
            ],
        },
    ],
});

routes.beforeEach((to, from, next) => {
    const session = store.getters.session;
    const isAuth = session && session.lastLogin;

    Vue.nextTick(() => {
        if (to.meta.auth) {
            if (!isAuth) {
                next('/');
            } else {
                // Handle expired session, currently older than 1 month
                const sessionAge = moment().diff(session.lastLogin, 'months');
                if (sessionAge > 0) {
                    next('/logout?sessionExpired=true');
                }
                next();
            }
        } else {
            if (isAuth && to.meta.unAuth) {
                next('/dashboard');
            }
            next();
        }

        document.title = to.meta.title ? to.meta.title : 'Atom Settings';
    });

    next();
});

export default routes;
