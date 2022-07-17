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
          <div class="mb-8">
            <h1
              class="capitalize text-2xl md:text-3xl text-slate-800 font-bold"
            >
              Network status
            </h1>
          </div>
          <div class="sm:flex sm:justify-between sm:items-center">
            <!-- Left: Title -->

            <div>
              <div class="flex space-x-2">
                <FilterSelectPills @selectedFilter="getFilter($event)" />
              </div>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Dropdown -->
              <SearchForm />
              <!-- Refresh button -->
              <div>
                <button
                  @click.prevent="refresh"
                  class="btn bg-primary-500 hover:bg-primary-600 text-white"
                >
                  <RefreshIcon class="h-5 w-5 text-primary-100" />
                  <span class="hidden xs:block ml-2">Refresh</span>
                </button>
                <Loading class="pl-2 w-8 h-8" v-if="loading" />
              </div>
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
import { RefreshIcon } from "@heroicons/vue/outline";
import Loading from "@/components/LoadingSmall.vue";

export default {
  components: {
    Sidebar,
    Header,
    SearchForm,
    FilterSelectPills,
    RefreshIcon,
    Loading,
  },
  setup() {
    let loading = ref(false);
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

    const refresh = () => {
      fetchNbnServices(user.$state.ucn);
    };

    return {
      getFilter,
      sidebarOpen,
      selectFilter,
      filters,
    };
  },
};
</script>
