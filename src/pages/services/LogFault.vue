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
          <div class="sm:flex sm:justify-between sm:items-center"> 
            <div class="mb-8">
              <h1
                class="capitalize text-2xl md:text-3xl text-slate-800 font-bold"
              >
                Log Fault
              </h1>
            </div>
            <div class="sm:flex sm:justify-between sm:items-center">
              <!-- Left: Title -->

              <!-- Right: Actions  -->
              <div
                class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
              >
                <!-- Dropdown -->
                <SearchForm />
                <!-- Add customer button -->
                <button
                  class="btn bg-primary-500 hover:bg-primary-600 text-white"
                >
                  <svg
                    class="w-4 h-4 fill-current opacity-50 shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
                    />
                  </svg>
                  <span class="hidden xs:block ml-2">Submit Fault</span>
                </button>
              </div>
            </div>
          </div>
          <div>
              <div class="flex space-x-2">
                <FilterSelectPills @selectedFilter="getFilter($event)" v-if="user.is_reseller"/>
              </div>
            </div>
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
import { useUserStore } from "@/stores/user.js";

export default {
  components: {
    Sidebar,
    Header,
    SearchForm,
    FilterSelectPills,
  },
  setup() {
    const user = useUserStore();
    const sidebarOpen = ref(false);
    const selectFilter = ref("all");
    const filters = {
      views: [
        {
          id: 0,
          name: "views",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "my services",
        },
        {
          id: 3,
          name: "my customers",
        },
        {
          id: 4,
          name: "my staff",
        },
      ],
    };

    const getFilter = (filter) => {
      selectFilter.value = filter;
    };

    return {
      getFilter,
      sidebarOpen,
      selectFilter,
      filters,
      user,
    };
  },
};
</script>
