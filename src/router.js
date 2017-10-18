import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Browse from '@/pages/Browse/Browse';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Home from '@/pages/Home';
import Logout from '@/pages/Logout/Logout';
// User Profile
import User from '@/pages/User/User';
import UserPackages from '@/pages/User/Packages';
import UserScripts from '@/pages/User/InitScript';
import UserKeymaps from '@/pages/User/Keymaps';
import UserSettings from '@/pages/User/Settings';
import UserSnippets from '@/pages/User/Snippets';
import UserStyles from '@/pages/User/Styles';

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
            name: 'home',
            meta: {
                title: 'Atom Settings',
            },
        },
        {
            path: '/logout',
            component: Logout,
            name: 'logout',
            meta: {
                hideNav: true,
            },
        },
        {
            path: '/admin',
            component: AdminPage,
            name: 'admin',
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
            name: 'dashboard',
            meta: {
                title: 'Atom Settings Dashboard',
                auth: true,
            },
        },
        {
            path: '/browse',
            component: Browse,
            name: 'browse',
            meta: {
                title: 'Browse Atom Settings',
            },
        },
        {
            path: '/browse/:id',
            component: User,
            name: 'user',
            meta: {
                title: 'Browse {{User}} Atom Settings',
            },
            children: [
                {
                    path: 'packages',
                    meta: {
                        tabName: 'Packages',
                    },
                    component: UserPackages,
                },
                {
                    path: 'init-script',
                    meta: {
                        tabName: 'Init Script',
                    },
                    component: UserScripts,
                },
                {
                    path: 'keymaps',
                    meta: {
                        tabName: 'Keymaps',
                    },
                    component: UserKeymaps,
                },
                {
                    path: 'settings',
                    meta: {
                        tabName: 'Settings',
                    },
                    component: UserSettings,
                },
                {
                    path: 'snippets',
                    meta: {
                        tabName: 'Snippets',
                    },
                    component: UserSnippets,
                },
                {
                    path: 'styles',
                    meta: {
                        tabName: 'Styles',
                    },
                    component: UserStyles,
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
                    name: 'settingsGetStarted',
                    meta: {
                        title: 'Atom Settings | Get Started',
                        auth: true,
                    },
                },
                {
                    path: 'github',
                    component: SettingsGithub,
                    name: 'settingsGithub',
                    meta: {
                        title: 'Atom Settings | Sync',
                        auth: true,
                    },
                },
                {
                    path: 'profile',
                    component: SettingsProfile,
                    name: 'settingsProfile',
                    meta: {
                        title: 'Atom Settings | Profile',
                        auth: true,
                    },
                },
                {
                    path: 'social',
                    component: SettingsSocial,
                    name: 'settingsSocial',
                    meta: {
                        title: 'Atom Settings | Social',
                        auth: true,
                    },
                },
                {
                    path: 'account',
                    component: SettingsAccount,
                    name: 'settingsAccount',
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
