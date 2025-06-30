<template>
  <!-- sidebar -->
  <nav class="sidebar bg-white dark:bg-gray-800">
    <!-- sidebar head -->
    <div class="sidebar-head p-4">
      <router-link
        to="/"
        exact
        class="flex"
      >
        <img
          class="w-8 mt-1"
          src="@/assets/logo/logo.svg"
          alt="logo windzo"
        />
        <h2
          class="text-2xl font-normal ml-3 mt-2 text-gray-800 dark:text-gray-200"
          translate="no"
        >
          Windzo<span class="text-primary">.</span>
        </h2>
      </router-link>
      <div
        class="bg-gray-700 absolute mt-3 dark:block hidden rounded-md py-1 px-2 text-xs text-gray-200"
      >
        Dark mode
      </div>
      <button
        class="lg:hidden block dark:text-gray-400 float-right -mt-7"
        @click="$emit('sidebarToggle')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width="25px"
          height="25px"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M7.219 5.781L5.78 7.22L14.563 16L5.78 24.781l1.44 1.439L16 17.437l8.781 8.782l1.438-1.438L17.437 16l8.782-8.781L24.78 5.78L16 14.563z"
          />
        </svg>
      </button>
    </div>
    <!-- sidebar list -->
    <div class="sidebar-list p-4 mt-4 divide-y dark:divide-gray-700">
      <div class="pb-5">
        <p class="font-medium text-gray-400 dark:text-gray-400">Menu</p>
        <div class="wrap-item mt-4 dark:text-gray-500">
          <div class="item">
            <router-link
              to="/"
              exact
              class="w-full flex text-left rounded-md box-border p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/' }"
            >
              <span class="mr-3 text-xl"><Icon icon="bxs:dashboard" /></span>
              <span class="w-full"> Dashboard </span>
            </router-link>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="gg:components" />
              </template>
              <template v-slot:title> Components </template>
              <template v-slot:content>
                <router-link
                  to="/component/alert"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/alert' }"
                >
                  Alert
                </router-link>
                <router-link
                  to="/component/accordion"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/accordion' }"
                >
                  Accordion
                </router-link>
                <router-link
                  to="/component/badge"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/badge' }"
                >
                  Badge
                </router-link>
                <router-link
                  to="/component/breadcumb"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/breadcumb' }"
                >
                  Breadcumb
                </router-link>
                <router-link
                  to="/component/button"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/button' }"
                >
                  Button
                </router-link>
                <router-link
                  to="/component/card"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/card' }"
                >
                  Card
                </router-link>
                <router-link
                  to="/component/dropdown"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/dropdown' }"
                >
                  Dropdown
                </router-link>
                <router-link
                  to="/component/modal"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/component/modal' }"
                >
                  Modal
                </router-link>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="ri:pages-fill" />
              </template>
              <template v-slot:title> Pages </template>
              <template v-slot:content>
                <div class="">
                  <router-link
                    to="/blank"
                    class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/blank' }"
                  >
                    Blank Page
                  </router-link>
                  <menu-accordion>
                    <template v-slot:title> Error Page </template>
                    <template v-slot:content>
                      <router-link
                        to="/404page"
                        class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/404page' }"
                      >
                        404 page
                      </router-link>
                      <router-link
                        to="/500"
                        class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/500' }"
                      >
                        500 page
                      </router-link>
                      <router-link
                        to="/maintenance"
                        class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/maintenance' }"
                      >
                        Maintenance page
                      </router-link>
                    </template>
                  </menu-accordion>
                  <menu-accordion>
                    <template v-slot:title> Authentication </template>
                    <template v-slot:content>
                      <router-link
                        to="/auth/login"
                        class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/auth/login' }"
                      >
                        Login
                      </router-link>
                      <router-link
                        to="/auth/register"
                        class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/auth/register' }"
                      >
                        Register
                      </router-link>
                      <router-link
                        to="/auth/forgot-password"
                        class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/auth/forgot-password' }"
                      >
                        Forgot Password
                      </router-link>
                    </template>
                  </menu-accordion>
                </div>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="mdi:account-group" />
              </template>
              <template v-slot:title> O'quvchilar </template>
              <template v-slot:content>
                <router-link
                  to="/students/list"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/students/list' }"
                >
                  Ro'yxat
                </router-link>
                <router-link
                  to="/students/add"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/students/add' }"
                >
                  Yangi o'quvchi
                </router-link>
                <router-link
                  to="/students/parents"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/students/parents' }"
                >
                  Ota-onalar
                </router-link>
                <router-link
                  to="/students/auth-info"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/students/auth-info' }"
                >
                  Avtorizatsiya ma'lumotlari
                </router-link>
                <router-link
                  to="/students/removed"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/students/removed' }"
                >
                  Safdan chiqarilganlar
                </router-link>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="mdi:bullhorn" />
              </template>
              <template v-slot:title> Marketing </template>
              <template v-slot:content>
                <router-link
                  to="/marketing/payments"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/marketing/payments' }"
                >
                  To'lovlar ro'yxati
                </router-link>
                <router-link
                  to="/marketing/debtors"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/marketing/debtors' }"
                >
                  Qarzdorlar
                </router-link>
                <router-link
                  to="/marketing/report"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/marketing/report' }"
                >
                  Marketing hisobot
                </router-link>
                <router-link
                  to="/marketing/advert-types"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/marketing/advert-types' }"
                >
                  Reklama turlari
                </router-link>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="mdi-cash-minus" />
              </template>
              <template v-slot:title> Chiqimlar </template>
              <template v-slot:content>
                <router-link
                  to="/expenses/add"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/expenses/add' }"
                >
                  Chiqim qo'shish
                </router-link>
                <router-link
                  to="/expenses/search"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/expenses/search' }"
                >
                  Chiqimlarni izlash
                </router-link>
                <router-link
                  to="/expenses/categories"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/expenses/categories' }"
                >
                  Kategoriyalar
                </router-link>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="mdi:academic-cap" />
              </template>
              <template v-slot:title> Imtihonlar </template>
              <template v-slot:content>
                <router-link
                  to="/exams/list"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/exams/list' }"
                >
                  Imtihonlar ro'yxati
                </router-link>
              </template>
            </menu-accordion>
          </div>
          <div class="item mt-3">
            <menu-accordion>
              <template v-slot:icon>
                <Icon icon="mdi:school" />
              </template>
              <template v-slot:title> Ta'lim </template>
              <template v-slot:content>
                <router-link
                  to="/education/groups"
                  class="w-full text-left block rounded-md p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  :class="{ 'text-primary bg-[#EEF6FF]': $route.path === '/education/groups' }"
                >
                  Guruhlar
                </router-link>
              </template>
            </menu-accordion>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { Icon } from "@iconify/vue";
  import MenuAccordion from "./MenuAccordion.vue";
  export default {
    components: {
      Icon,
      MenuAccordion,
    },
  };
</script>
