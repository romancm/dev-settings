import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Browse from '@/pages/Browse/Browse';
// import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound/NotFound';
import Logout from '@/pages/Logout/Logout';
import ExitPage from '@/pages/ExitPage/ExitPage';

// Profile
import Profile from '@/pages/Profile/Profile';
import UserPackages from '@/pages/Profile/Sections/Packages';
import UserScripts from '@/pages/Profile/Sections/InitScript';
import UserKeymaps from '@/pages/Profile/Sections/Keymaps';
import UserSettings from '@/pages/Profile/Sections/Settings';
import UserSnippets from '@/pages/Profile/Sections/Snippets';
import UserStyles from '@/pages/Profile/Sections/Styles';

// Admin
import AdminPage from '@/pages/Admin/AdminPage';

// Github Auth
import Handshake from '@/pages/Auth/Handshake';

// Settings
import SettingsPage from '@/pages/Settings/SettingsPage';
import SettingsLink from '@/pages/Settings/SettingsLink/SettingsLink';
import AtomLink from '@/pages/Settings/SettingsLink/AtomLink';
import CodeLink from '@/pages/Settings/SettingsLink/CodeLink';
import SettingsProfile from '@/pages/Settings/SettingsProfile';
import SettingsSocial from '@/pages/Settings/SettingsSocial';
import SettingsAccount from '@/pages/Settings/SettingsAccount';

// 3rd party
import moment from 'moment';

// Absolute imports
import { store } from '@/store';

Vue.use(Router);

const routes = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: Browse,
            name: 'home',
            meta: {
                title: 'Atom Settings',
            },
        },
        {
            path: '/code',
            component: Browse,
            name: 'code',
            meta: {
                title: 'Browse | Atom Settings',
            },
        },
        {
            path: '/atom',
            component: Browse,
            name: 'atom',
            meta: {
                title: 'Browse | Atom Settings',
            },
        },
        {
            path: '/atom/:id',
            component: Profile,
            name: 'profile',
            // redirect: '/browse/:id/packages/',
            children: [
                {
                    path: 'packages',
                    component: UserPackages,
                    name: 'packages',
                    children: [
                        {
                            name: 'package',
                            path: ':packageName',
                            component: UserPackages,
                        },
                    ],
                },
                {
                    path: 'init-script',
                    name: 'init-script',
                    component: UserScripts,
                },
                {
                    path: 'keymaps',
                    name: 'keymaps',
                    component: UserKeymaps,
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: UserSettings,
                },
                {
                    path: 'snippets',
                    name: 'snippets',
                    component: UserSnippets,
                },
                {
                    path: 'styles',
                    name: 'styles',
                    component: UserStyles,
                },
            ],
        },
        {
            path: '/404',
            component: NotFound,
            name: '404',
            meta: {
                title: 'Uh Oh! | Atom Settings',
            },
        },
        {
            path: '/logout',
            component: Logout,
            name: 'logout',
            meta: {
                title: 'Logged out | Atom Settings',
            },
        },
        {
            path: '/admin',
            component: AdminPage,
            name: 'admin',
            meta: {
                title: 'Admin | Atom Settings',
                auth: true,
            },
        },
        {
            path: '/auth/handshake',
            component: Handshake,
            name: 'handshake',
            meta: {
                title: 'Logging in | Atom Settings',
                auth: false,
                hideNav: true,
            },
        },
        {
            path: '/account-deleted',
            component: ExitPage,
            name: 'exit-page',
            meta: {
                title: 'Account deleted | Atom Settings',
            },
        },
        {
            path: '/browse',
            component: Browse,
            name: 'browse',
            meta: {
                title: 'Browse | Atom Settings',
            },
        },
        {
            path: '/settings',
            component: SettingsPage,
            meta: {
                title: 'Settings | Atom Settings',
                auth: true,
            },
            children: [
                {
                    path: 'link',
                    component: SettingsLink,
                    name: 'settingsLink',
                    meta: {
                        subRouteTitle: 'Link Settings',
                        title: 'Link your Atom Settings | Atom Settings',
                        auth: true,
                    },
                    children: [
                        {
                            path: 'atom',
                            component: AtomLink,
                            name: 'atom',
                            meta: {
                                subRouteTitle: 'Link Settings / Atom',
                                title: 'Link your Atom Settings | Atom Settings',
                                auth: true,
                            },
                        },
                        {
                            path: 'code',
                            component: CodeLink,
                            name: 'code',
                            meta: {
                                subRouteTitle: 'Link Settings / Visual Studio Code',
                                title: 'Link your Atom Settings | Atom Settings',
                                auth: true,
                            },
                        },
                    ],
                },
                {
                    path: 'profile',
                    component: SettingsProfile,
                    name: 'settingsProfile',
                    meta: {
                        subRouteTitle: 'Profile',
                        title: 'Profile | Atom Settings',
                        auth: true,
                    },
                },
                {
                    path: 'social',
                    component: SettingsSocial,
                    name: 'settingsSocial',
                    meta: {
                        subRouteTitle: 'Social Networks',
                        title: 'Social Networks | Atom Settings',
                        auth: true,
                    },
                },
                {
                    path: 'account',
                    component: SettingsAccount,
                    name: 'settingsAccount',
                    meta: {
                        subRouteTitle: 'Account',
                        title: 'Account | Atom Settings',
                        auth: true,
                    },
                },
            ],
        },
        {
            path: '*',
            redirect: '/404',
        },
    ],
});

routes.beforeEach((to, from, next) => {
    document.title = to.meta.title ? to.meta.title : 'Atom Settings';
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
                next('/settings');
            }

            const url = window.location.href;
            const base = window.location.origin;

            if (url.indexOf('handshake') !== -1) {
                Vue.nextTick(() => {
                    if (url.indexOf('code=') !== -1) {
                        const code = url.split('code=')[1].split('#')[0];
                        window.location.replace(`${base}/#/auth/handshake?code=${code}`);
                    }
                });
            } else {
                next();
            }
        }
    });

    next();
});

export default routes;
