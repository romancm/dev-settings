import Vue from 'vue';
import Router from 'vue-router';
import Browse from '@/pages/Browse/Browse';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login/Login';
import Logout from '@/pages/Logout/Logout';
import Register from '@/pages/Register/Register';
import ResetPassword from '@/pages/ResetPassword/ResetPassword';

// User Profile
import User from '@/pages/User/User';
import Packages from '@/pages/User/Packages';
import InitScript from '@/pages/User/InitScript';
import Keymaps from '@/pages/User/Keymaps';
import Settings from '@/pages/User/Settings';
import Snippets from '@/pages/User/Snippets';
import Styles from '@/pages/User/Styles';

// http://localhost:8080/#/auth

import VerifyAccount from '@/pages/VerifyAccount/VerifyAccount';
// Admin
import AdminPage from '@/pages/Admin/AdminPage';

// Github Auth
import Handshake from '@/pages/Auth/Handshake';
// Settings
import SettingsPage from '@/pages/Settings/SettingsPage';
import SettingsGetStarted from '@/pages/Settings/SettingsGetStarted';
import SettingsProfile from '@/pages/Settings/SettingsProfile';
import SettingsSocial from '@/pages/Settings/SettingsSocial';
import SettingsGithub from '@/pages/Settings/SettingsGithub';
import SettingsAccount from '@/pages/Settings/SettingsAccount';

// 3rd party
import moment from 'moment';

// Absolute imports
import { store } from '@/store';

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
                hideNav: true,
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
