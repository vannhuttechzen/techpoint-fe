import {createRouter, createWebHistory} from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import ErrorPage from '../views/error-page/Main.vue'
import Error403Page from '../views/error-page/403.vue'
import CriteriaGroupManagement from "@/views/criteria-groups-management/Main.vue";
import GiftManagement from "@/views/gift-management/Main.vue";
import store from "@/stores";
import {isEmpty} from "lodash";
import Login from "@/views/auth/Login.vue";
import UserLayout from "@/layouts/user/UserLayout.vue";
import LandingPage from "@/views/viewuser/LandingPage.vue";
import IntermediatePage from "@/views/auth/IntermediatePage.vue"
import GiftsRequested from "@/views/gifts-requested-management/Main.vue"
import PointsRequested from "@/views/points-requested-management/Main.vue"
import Main from "@/views/viewuser/gift-page/Main.vue";
import CriterionMain from "@/views/viewuser/criterion-page/CriterionMain.vue";
import GiftHistory from "@/views/viewuser/GiftHistory.vue";
const routes = [
    {
        path: '/techpoint',
        component: SideMenu,
        children: [
            {
                path: '/techpoint',
                name: 'admin-group-criteria',
                component: CriteriaGroupManagement,
                meta: {
                    requiresAuth: true,
                    id: 1
                },
            },

            {
                path: '/points-requested',
                name: 'points-requested',
                component: PointsRequested,
                meta: {
                    requiresAuth: true,
                    id: 1
                }
            },

            {
                path: '/gift',
                name: 'gift-management',
                component: GiftManagement,
                meta: {
                    requiresAuth: true,
                    id: 1
                }
            },

            {
                path: '/gifts-requested',
                name: 'gifts-requested',
                component: GiftsRequested,
                meta: {
                    requiresAuth: true,
                    id: 1
                }
            },
        ]
    },
    {
        path: "/",
        component: UserLayout,
        name: "point-user",
        children: [
            {
                path: "/",
                name: "point-user",
                component: LandingPage
            }
        ]
    },
    {
        path: "/gift-history",
        name: "gift-history",
        component: GiftHistory
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: '/error-page',
        name: 'error-page',
        component: ErrorPage
    },
    {
        path: '/:pathMatch(.*)*',
        component: ErrorPage
    },
    {
        path: '/permission-page',
        name: 'permission-page',
        component: Error403Page
    },
    {
        path: '/intermediate',
        name: 'intermediate',
        component: IntermediatePage
    },
    {
        path: '/gift-user',
        component: Main,
        name: "gift-user",
        children: [
            {
                path: "/",
                name: "gift-user",
                component: Main
            }
        ]
    },
    {
        path: '/user-criterion-page',
        name: 'user-criterion-page',
        component: CriterionMain
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {left: 0, top: 0}
    }
})

router.beforeEach(async (to, from, next) => {
    let {token, user} = store.state.auth

    if (token && isEmpty(user)) {
        await store.dispatch("auth/getAuthInfo", token)
        user = store.state.auth.user

    }
    let isAuthenticated = token && !isEmpty(user)
    if (!isAuthenticated && (to.name === 'point-user' || to.name === 'login'|| to.name === 'gift-user' || to.name === 'user-criterion-page' || to.name === 'gift-history')) next()
    else if (isAuthenticated && to.name === 'login') next({name: 'point-user'})
    else if (isAuthenticated) next()
    else next({name: 'login'})
})
export default router
