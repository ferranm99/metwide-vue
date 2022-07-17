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
        <div class="pb-8 w-full max-w-9xl mx-auto px-8">
          <!-- Welcome banner -->
          <WelcomeBanner />

          <!-- Dashboard actions -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Right: Actions -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Filter button -->
              <!-- <FilterButton align="right" /> -->
              <!-- Datepicker built with flatpickr -->
              <!-- <Datepicker align="right" /> -->
              <!-- Add view button -->
              <!-- <button class="btn bg-primary-500 hover:bg-primary-600 text-white">
                <svg
                  class="w-4 h-4 fill-current opacity-50 shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                  />
                </svg>
                <span class="hidden xs:block ml-2">Add View</span>
              </button> -->
            </div>
          </div>

          <!-- Cards -->
          <div class="grid grid-cols-12 gap-6">
            <DashboardNbnOrdersCard />
            <DashboardNbnServicesCard />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../partials/Sidebar.vue";
import Header from "../partials/Header.vue";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner.vue";
import FilterButton from "../components/DropdownFilter.vue";
import Datepicker from "../components/Datepicker.vue";
import DashboardNbnOrdersCard from "../partials/dashboard/DashboardNbnOrdersCard.vue";
import DashboardNbnServicesCard from "../partials/dashboard/DashboardNbnServicesCard.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Header,
    WelcomeBanner,
    FilterButton,
    Datepicker,
    DashboardNbnOrdersCard,
    DashboardNbnServicesCard
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      sidebarOpen,
    };
  },
};
</script>
