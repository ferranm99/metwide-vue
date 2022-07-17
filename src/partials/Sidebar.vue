<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >
      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-slate-500 hover:text-slate-400"
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg
            class="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"
            />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <img class="h-14 -mt-2" src="../images/logo-white.png" alt="" />
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <ul class="mt-3">
            <!-- Dashboard -->
            <router-link
              to="/"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <ChartSquareBarIcon
                        class="h-5 w-5"
                        :class="isExactActive && 'text-primary'"
                      />
                      <span
                        class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                        >Dashboard</span
                      >
                    </div>
                  </div>
                </a>
              </li>
            </router-link>

            <!-- Account -->
            <router-link
              to="/account"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center justify-between">
                    <div class="grow flex items-center">
                      <IdentificationIcon
                        class="h-5 w-5"
                        :class="isExactActive && 'text-primary'"
                      />
                      <span
                        class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                        >Account</span
                      >
                    </div>
                  </div>
                </a>
              </li>
            </router-link>

            <!-- Orders -->
            <router-link
              v-if="user.$state.is_reseller"
              to="/customers"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <UserGroupIcon
                      class="h-5 w-5"
                      :class="isExactActive && 'text-primary'"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Customers</span
                    >
                  </div>
                </a>
              </li>
            </router-link>

            <!-- Orders -->
            <router-link
              to="/orders"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <ViewGridAddIcon
                      class="h-5 w-5"
                      :class="isExactActive && 'text-primary'"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Orders</span
                    >
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Subscriptions -->
            <router-link
              to="/subscriptions"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <ViewListIcon
                      class="h-5 w-5"
                      :class="isExactActive && 'text-primary'"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Subscriptions</span
                    >
                  </div>
                </a>
              </li>
            </router-link>
            <!-- NBN Services -->
            <router-link
              to="/nbn"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <WifiIcon
                      class="h-5 w-5"
                      :class="isExactActive && 'text-primary'"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Active NBN Services</span
                    >
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Services -->
            <SidebarLinkGroup
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('services')"
            >
              <a
                class="block text-slate-200 hover:text-white truncate transition duration-150"
                :class="
                  currentRoute.fullPath.includes('services') &&
                  'hover:text-slate-200'
                "
                href="#0"
                @click.prevent="
                  sidebarExpanded
                    ? parentLink.handleClick()
                    : (sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <CogIcon
                      class="h-5 w-5"
                      :class="
                        currentRoute.fullPath.includes('services') &&
                        'text-primary'
                      "
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Services
                    </span>
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400"
                      :class="parentLink.expanded && 'transform rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    to="/services/log-fault"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                        :class="isExactActive && '!text-primary-500'"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="capitalize text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Log Fault</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/services/network-status"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                        :class="isExactActive && '!text-primary-500'"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="capitalize text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Network status</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    to="/services/create-order"
                    custom
                    v-slot="{ href, navigate, isExactActive }"
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"
                        :class="isExactActive && '!text-primary-500'"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="capitalize text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >Create order</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </SidebarLinkGroup>
            <!-- NBN Services -->
            <router-link
              to="/invoices"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <CreditCardIcon
                      class="h-5 w-5"
                      :class="isExactActive && 'text-primary'"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Payments & Invoices</span
                    >
                  </div>
                </a>
              </li>
            </router-link>
             <!-- NBN Services -->
            <router-link
              to="/e-commerce/shop"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <CollectionIcon
                      class="h-5 w-5"
                      :class="isExactActive && 'text-primary'"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Shop</span
                    >
                  </div>
                </a>
              </li>
            </router-link>
            <router-link
              to="/support"
              custom
              v-slot="{ href, navigate, isExactActive }"
            >
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-slate-900'"
              >
                <a
                  class="block text-slate-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-slate-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <SupportIcon
                      class="h-5 w-5"
                      :class="isExactActive && 'text-primary'"
                    />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Support</span
                    >
                  </div>
                </a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import {
  CogIcon,
  CollectionIcon,
  CreditCardIcon,
  ChartSquareBarIcon,
  IdentificationIcon,
  SupportIcon,
  ViewGridAddIcon,
  ViewListIcon,
  WifiIcon,
  UserGroupIcon,
} from "@heroicons/vue/outline";

import SidebarLinkGroup from "./SidebarLinkGroup.vue";

export default {
  name: "Sidebar",
  props: ["sidebarOpen"],
  components: {
    SidebarLinkGroup,
    CogIcon,
    CreditCardIcon,
    ChartSquareBarIcon,
    IdentificationIcon,
    SupportIcon,
    ViewGridAddIcon,
    ViewListIcon,
    WifiIcon,
    UserGroupIcon,
    CollectionIcon
  },
  setup(props, { emit }) {
     const user = useUserStore();
    const trigger = ref(null);
    const sidebar = ref(null);

    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const sidebarExpanded = ref(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );

    const currentRoute = useRouter().currentRoute.value;

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!sidebar.value || !trigger.value) return;
      if (
        !props.sidebarOpen ||
        sidebar.value.contains(target) ||
        trigger.value.contains(target)
      )
        return;
      emit("close-sidebar");
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!props.sidebarOpen || keyCode !== 27) return;
      emit("close-sidebar");
    };

    onMounted(() => {
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    });

    watch(sidebarExpanded, () => {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.value);
      if (sidebarExpanded.value) {
        document.querySelector("body").classList.add("sidebar-expanded");
      } else {
        document.querySelector("body").classList.remove("sidebar-expanded");
      }
    });

    return {
      trigger,
      sidebar,
      sidebarExpanded,
      currentRoute,
      user,
    };
  },
};
</script>
