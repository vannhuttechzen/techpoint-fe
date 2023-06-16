<template>
    <div class="py-2 -mt-2">
        <DarkModeSwitcher />
        <MobileMenu />
        <TopBar />
        <div class="wrapper">
            <div class="wrapper-box">
                <!-- BEGIN: Side Menu -->
                <nav class="side-nav responsive">
                    <ul>
                        <!-- BEGIN: First Child -->
                        <template v-for="(menu, menuKey) in formattedMenu">
                            <li v-if="menu === 'divider'" :key="menu + menuKey" class="side-nav__devider my-6"></li>
                            <li v-else :key="menu + menuKey">
                                <SideMenuTooltip
                                    tag="a"
                                    :content="$t(menu.title)"
                                    :href="menu.subMenu ? 'javascript:;' : router.resolve({ name: menu.pageName }).path"
                                    class="side-menu"
                                    :class="{
                                        'side-menu--active': menu.active,
                                        'side-menu--open': menu.activeDropdown
                                    }"
                                    @click="getTextForBreadCrumb(menu.title), linkTo(menu, router, $event)"
                                >
                                    <div class="side-menu__icon">
                                        <component :is="menu.icon" />
                                    </div>
                                    <div class="side-menu__title">
                                        {{ $t(menu.title) }}
                                        <div v-if="menu.subMenu" class="side-menu__sub-icon" :class="{ 'transform rotate-180': menu.activeDropdown }">
                                            <ChevronDownIcon />
                                        </div>
                                    </div>
                                </SideMenuTooltip>

                                <!-- BEGIN: Second Child -->
                                <transition @enter="enter" @leave="leave">
                                    <ul v-if="menu.subMenu && menu.activeDropdown">
                                        <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                                            <SideMenuTooltip
                                                tag="a"
                                                :content="$t(subMenu.title)"
                                                :href="subMenu.subMenu ? 'javascript:;' : router.resolve({ name: subMenu.pageName }).path"
                                                class="side-menu"
                                                :class="{ 'side-menu--active': subMenu.active }"
                                                @click="getTextForBreadCrumb(subMenu.title), linkTo(subMenu, router, $event)"
                                                v-if="!parseInt(usertype) || !subMenu.id || menus.includes(subMenu.id)"
                                            >
                                                <div class="side-menu__icon">
                                                    <component :is="subMenu.icon" />
                                                </div>
                                                <div class="side-menu__title">
                                                    {{ $t(subMenu.title) }}
                                                    <div
                                                        v-if="subMenu.subMenu"
                                                        class="side-menu__sub-icon"
                                                        :class="{
                                                            'transform rotate-180': subMenu.activeDropdown
                                                        }"
                                                    >
                                                        <ChevronDownIcon />
                                                    </div>
                                                </div>
                                            </SideMenuTooltip>
                                            <!-- BEGIN: Third Child -->
                                            <transition @enter="enter" @leave="leave">
                                                <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                                                    <li v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu" :key="lastSubMenuKey">
                                                        <SideMenuTooltip
                                                            tag="a"
                                                            :content="$t(lastSubMenu.title)"
                                                            :href="
                                                                lastSubMenu.subMenu
                                                                    ? 'javascript:;'
                                                                    : router.resolve({
                                                                          name: lastSubMenu.pageName
                                                                      }).path
                                                            "
                                                            class="side-menu"
                                                            :class="{
                                                                'side-menu--active': lastSubMenu.active
                                                            }"
                                                            @click="getTextForBreadCrumb(lastSubMenu.title), linkTo(lastSubMenu, router, $event)"
                                                            v-if="!parseInt(usertype) || !lastSubMenu.id || menus.includes(lastSubMenu.id)"
                                                        >
                                                            <div class="side-menu__icon">
                                                                <component :is="lastSubMenu.icon" />
                                                            </div>
                                                            <div class="side-menu__title">
                                                                {{ $t(lastSubMenu.title) }}
                                                            </div>
                                                        </SideMenuTooltip>
                                                    </li>
                                                </ul>
                                            </transition>
                                            <!-- END: Third Child -->
                                        </li>
                                    </ul>
                                </transition>
                                <!-- END: Second Child -->
                            </li>
                        </template>
                        <!-- END: First Child -->
                    </ul>
                </nav>
                <!-- END: Side Menu -->
                <!-- BEGIN: Content -->
                <div class="content bg-center bg-cover">
                    <router-view />
                </div>
                <!-- END: Content -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { helper as $h } from '@/utils/helper'
import { useSideMenuStore } from '@/stores/side-menu'
import TopBar from '@/components/top-bar/Main.vue'
import MobileMenu from '@/components/mobile-menu/Main.vue'
import DarkModeSwitcher from '@/components/dark-mode-switcher/Main.vue'
import SideMenuTooltip from '@/components/side-menu-tooltip/Main.vue'
import { linkTo, nestedMenu, enter, leave } from './index'
import dom from '@left4code/tw-starter/dist/js/dom'

const route = useRoute()
const router = useRouter()
const formattedMenu = ref([])
const sideMenuStore = useSideMenuStore()
const sideMenu = computed(() => nestedMenu(sideMenuStore.menu, route))
provide('forceActiveMenu', (pageName) => {
    route.forceActiveMenu = pageName
    formattedMenu.value = $h.toRaw(sideMenu.value)
})

watch(
    computed(() => route.path),
    () => {
        delete route.forceActiveMenu
        formattedMenu.value = $h.toRaw(sideMenu.value)
    }
)

onMounted(() => {
    dom('body').removeClass('error-page').removeClass('login').addClass('main')
    formattedMenu.value = $h.toRaw(sideMenu.value)
})
</script>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      breadCrumb: ""
    }
  },
    computed: {
        ...mapGetters(['menus', 'usertype'])
    },
  methods: {
    ...mapActions('breadcrumb', ['updateBreadcrumb']),
    getTextForBreadCrumb(text) {
      this.updateBreadcrumb(text)
      this.breadCrumb = text
    }
  }
}
</script>

<style>
@media screen and (max-width: 1280px) {
    .responsive {
        display: none;
    }
}
@media screen and (min-width: 1280px) {
    .responsive {
        display: block;
    }
}
</style>
