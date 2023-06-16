<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 xl:-mt-5 0 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="" class="-intro-x hidden xl:flex">
        <img alt="Icewall Tailwind HTML Admin Template" class="w-6" src="@/assets/images/logo.svg" />
        <span class="text-white text-lg ml-3" > TechPoint </span>
      </a>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto">
        <ol class="breadcrumb breadcrumb-light responsive">
          <li class="breadcrumb-item"><a href="#">{{ $t("lang.HEADER.HD1") }}</a></li>
          <li class="breadcrumb-item active" aria-current="page">{{$t(getBreadCrumb)}}</li>
        </ol>
      </nav>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->
      <div class="intro-x relative mr-3 sm:mr-6">
        <a class="notification notification--light sm:hidden" href="">
          <SearchIcon class="notification__icon dark:text-slate-500" />
        </a>
        <div class="search-result" :class="{ show: searchDropdown }">
          <div class="search-result__content">
            <div class="search-result__content__title">Pages</div>
            <div class="mb-5">
              <a href="" class="flex items-center">
                <div
                  class="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                  <InboxIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Mail Settings</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div class="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                  <UsersIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Users & Permissions</div>
              </a>
              <a href="" class="flex items-center mt-2">
                <div
                  class="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                  <CreditCardIcon class="w-4 h-4" />
                </div>
                <div class="ml-3">Transactions Report</div>
              </a>
            </div>
            <div class="search-result__content__title">Users</div>
            <div class="mb-5">
              <a v-for="(faker, fakerKey) in $_.take($f(), 4)" :key="fakerKey" href class="flex items-center mt-2">
                <div class="w-8 h-8 image-fit">
                  <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="faker.photos[0]" />
                </div>
                <div class="ml-3">{{ faker.users[0].name }}</div>
                <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                  {{ faker.users[0].email }}
                </div>
              </a>
            </div>
            <div class="search-result__content__title">Products</div>
            <a v-for="(faker, fakerKey) in $_.take($f(), 4)" :key="fakerKey" href class="flex items-center mt-2">
              <div class="w-8 h-8 image-fit">
                <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" :src="faker.images[0]" />
              </div>
              <div class="ml-3">{{ faker.products[0].name }}</div>
              <div class="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                {{ faker.products[0].category }}
              </div>
            </a>
          </div>
        </div>
      </div>
      <!-- END: Search -->
      <Dropdown class="multiple-language intro-x w-8 h-8">
          <DropdownToggle tag="div" role="button" @click="showLang = !showLang" class="w-8 h-8 flex items-center overflow-hidden">{{ languageItem[indexLanguage].name }}</DropdownToggle>
          <DropdownMenu  class="w-40">
              <DropdownContent
                  class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
                  <template v-for="(itemLang, indexLang) in languageItem">
                      <p v-if="indexLang != indexLanguage" :key="indexLang" @click="changeLang(itemLang.value, indexLang)" class="text-center cursor-pointer text-base-1 font-medium uppercase">
                          {{ itemLang.name }}</p>
                  </template>
              </DropdownContent>
          </DropdownMenu>
      </Dropdown>
      <!-- BEGIN: Notifications -->

      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->
      <Dropdown class="intro-x w-8 h-8">
        <DropdownToggle tag="div" role="button"
          class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
          <img alt="Icewall Tailwind HTML Admin Template" :src="avatarUrl" />
        </DropdownToggle>
        <DropdownMenu class="w-56">
          <DropdownContent
            class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">
            <DropdownHeader tag="div" class="!font-normal">
              <div class="font-medium">
                {{ username }}
              </div>
              <div class="text-xs text-white/60 truncate mt-0.5 dark:text-slate-500">
                {{ email }}
              </div>
            </DropdownHeader>
            <DropdownDivider class="border-white/[0.08]" />
            <DropdownItem @click="handleLogout" class="dropdown-item hover:bg-white/5">
              <ToggleRightIcon class="w-4 h-4 mr-2" /> {{$t("lang.HEADER.HD7")}}
            </DropdownItem>
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'dashboard',
  data: () => ({
      name: '',
      showLang: false,
      indexLanguage: 0,
      languageItem: [
          {
              name: "en",
              value: 'en'
          },
          {
              name: "vi",
              value: 'vi'
          },
          {
              name: "ja",
              value: 'ja'
          }
      ]
  }),
  created() {
      let language = localStorage.getItem("language") == undefined ? "vi" : localStorage.getItem("language");
      for (const key in this.languageItem) {
          if(this.languageItem[key].value == language){
              this.indexLanguage = key;
          }
      }
  },
  computed: {
    ...mapGetters('auth', ['username', 'email','avatarUrl']),
    ...mapGetters('breadcrumb', ['getBreadCrumb'])
  },
  methods: {
      changeLang(value,index) {
          this.indexLanguage = index;
          this.showLang = false;
          localStorage.setItem("language", value);
          location.reload();
      },
    ...mapActions(['setLang']),
    ...mapActions('auth', ['logout']),
    handleLogout() {
      const isLogout = this.logout();
      this.$router.push('/login');
    },
  },
};
</script>

<script setup>
import { ref } from "vue";
import {DropdownContent, DropdownMenu, DropdownToggle} from "@/global-components/dropdown";

const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};
</script>

<style scoped>
.multiple-language {
    font-size: 15px;
    font-weight: 500;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
}


@media screen and (max-width: 1280px) {
  .responsive {
    border-left-width: 0 !important;
    padding-left: 0 !important;
    margin-left: 0 !important;
  }
}
</style>