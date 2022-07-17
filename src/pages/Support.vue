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
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div>
              <div class="mb-4">
                <h1
                  class="capitalize text-2xl md:text-3xl text-slate-800 font-bold"
                >
                  Support
                </h1>
              </div>
              <div class="flex space-x-2">
                <FilterSelectPills @selectedFilter="getFilter($event)" v-if="user.is_reseller"/>
              </div>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Dropdown -->
              <SearchForm />
              <!-- Add customer button -->
            </div>
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
import SearchForm from "../components/SearchForm.vue";
import FilterSelectPills from "../components/FilterSelectPills.vue";
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
      user
    };
  },
};
</script>
