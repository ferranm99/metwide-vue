<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="flex justify-between items-end mb-6">
            <!-- Left: Title -->
            <div>
              <div class="mb-8">
                <h1
                  class="capitalize text-2xl md:text-3xl text-slate-800 font-bold"
                >
                  {{ selectedTab.name }}
                </h1>
              </div>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Dropdown -->
              <SearchForm />
              <!-- Refresh button -->
              <button
                class="btn bg-primary-500 hover:bg-primary-600 text-white"
              >
                <RefreshIcon class="h-5 w-5 text-primary-100" />
                <span class="hidden xs:block ml-2">Refresh</span>
              </button>
            </div>
          </div>

          <!-- Tab -->
          <div class="bg-white p-6 rounded-sm">
            <!-- Start -->
            <div class="relative">
              <div
                class="absolute bottom-0 w-full h-px bg-slate-200"
                aria-hidden="true"
              ></div>
              <ul
                class="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar"
              >
                <li
                  v-for="item in pageHeader"
                  :key="item.id"
                  class="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8"
                >
                  <button
                    class="block pb-3 whitespace-nowrap border-b-2 text-base"
                    :class="
                      selectedTab.id === item.id &&
                      'text-primary-500  border-primary-500 font-semibold'
                    "
                    @click="selectTab(item)"
                  >
                    {{ item.name }}
                  </button>
                </li>
              </ul>
            </div>
            <!-- End -->
          </div>
          <AccountOverview v-if="selectedTab.id === 0" />
          <Invoices v-if="selectedTab.id === 1" />
          <PayMyBill v-if="selectedTab.id === 2" />
          <UpdatePaymentMethods v-if="selectedTab.id === 3" />
          <Transactions v-if="selectedTab.id === 4" />
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import SearchForm from "@/components/SearchForm.vue";
import FilterSelectPills from "@/components/FilterSelectPills.vue";
import Invoices from "./Invoices.vue";
import AccountOverview from "./AccountOverview.vue";
import PayMyBill from "./PayMyBill.vue";
import UpdatePaymentMethods from "./UpdatePaymentMethods.vue";
import Transactions from "./Transactions.vue";
import { RefreshIcon } from "@heroicons/vue/outline";
import { useUserStore } from "@/stores/user.js";

export default {
  components: {
    // components
    Sidebar,
    Header,
    SearchForm,
    FilterSelectPills,
    UpdatePaymentMethods,
    Transactions,

    // Icons
    RefreshIcon,

    // pages
    Invoices,
    AccountOverview,
    PayMyBill,
  },
  setup() {
    const user = useUserStore();
    const sidebarOpen = ref(false);
    const selectedTab = ref({ id: 0, name: "Payments & Invoices" });
    const pageHeader = ref([
      {
        id: 0,
        name: "Account Overview",
      },
      {
        id: 1,
        name: "View Invoices",
      },
      {
        id: 2,
        name: "Pay My Account",
      },
      {
        id: 3,
        name: "Update Payment Method",
      },
      {
        id: 4,
        name: "Account Transactions",
      },
    ]);

    const selectTab = (item) => {
      selectedTab.value = item;
    };

    return {
      selectTab,
      sidebarOpen,
      pageHeader,
      selectedTab,
      user
    };
  },
};
</script>
