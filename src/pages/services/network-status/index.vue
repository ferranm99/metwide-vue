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
            <div class="mb-4 sm:mb-0 flex items-center">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                Network Status
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div>
              <div
                class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
              >
                <!-- Delete button -->
                <!-- <DeleteButton
                  :selectedItems="selectedItems"
                  @click="deleteItems()"
                /> -->

                <!-- Search -->
                <SearchForm
                  @input:search="inputChange"
                  v-model:search="search"
                />
                <!-- Refresh button -->
                <div class="flex items-center">
                  <button
                    @click.prevent="refresh"
                    class="btn bg-primary-500 hover:bg-primary-600 text-white"
                  >
                    <RefreshIcon class="h-5 w-5 text-primary-100" />
                    <span class="hidden xs:block ml-2 capitalize">refresh</span>
                  </button>
                  <Loading class="pl-2 w-8 h-8" v-if="loading" />
                </div>
              </div>
            </div>
          </div>
          <!-- Fitler -->
          <div class="md:flex justify-between items-center space-x-2">
            <!--<div class="flex space-x-2 capitalize">
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.provision"
              />
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.smile"
              />
            </div>-->
            <FilterSelectPills @selectedFilter="getFilter($event)"  v-if="user.is_reseller"/>
          </div>
          <!-- Table -->
          <DataTable
            @sortBy="sortByColumn"
            @change-selection="updateSelectedItems($event)"
            :navigate="{
              clickAble: [
                { name: 'eventID', page: 'services/network-status' },
              ],
            }"
            :items="filteredNetworkStatuses"
            :table-header="tableHeader"
            class="mt-3"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import FilterSelectPills from "@/components/FilterSelectPills.vue";
import SearchForm from "@/components/SearchForm.vue";
import DataTable from "@/partials/DataTable/index.vue";
import PaginationClassic from "@/components/PaginationClassic.vue";
import { RefreshIcon } from "@heroicons/vue/outline";
import Loading from "@/components/LoadingSmall.vue";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
import moment from "moment";

const api = useApi();

export default {
  name: "NetworkStatus",
  components: {
    Sidebar,
    Header,
    SearchForm,
    DataTable,
    PaginationClassic,
    RefreshIcon,
    FilterSelect,
    FilterSelectPills,
    Loading,
  },
  setup() {
    let loading = ref(false);
    const search = ref("");
    const sidebarOpen = ref(false);
    const selectedItems = ref([]);
    const selectedLength = ref(null);
    const sortKey = ref("");
    const reverse = ref(false);
    const selectFilter = ref(["all"]);
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
    const tableHeader = ref([
      {
        title: "event id",
        name: "eventID",
      },
      {
        title: "name",
        name: "name",
      },
      {
        title: "username",
        name: "username",
      },
      {
        title: "status",
        name: "status",
      },
      {
        title: "description",
        name: "description",
      },
      {
        title: "start date time",
        name: "startDateTime",
      },
      {
        title: "end date time",
        name: "endDateTime",
      },
      {
        title: "duration",
        name: "duration",
      },
      {
        title: "created at",
        name: "createdAt",
      },
    ]);

    let networkStatuses = ref([]);

    const setStatuses = (data) => {
      networkStatuses.value = [];
      data.forEach((element) => {
        let order = {
          eventID: element.event_id,
          name: element.name,
          username: element.username,
          status: element.status,
          description: (element.description).slice(0, 50) + '...',
          startDateTime: moment(element.start_date_time).format('DD-MMM-YYYY HH:mm:ss'),
          endDateTime: moment(element.end_date_time).format('DD-MMM-YYYY HH:mm:ss'),
          duration: element.duration,
          createdAt: moment(element.created_at).format('DD-MMM-YYYY HH:mm:ss'),
          id: element.id.toString(),
          customer:
            element.ucn === user.$state.ucn
              ? false
              : true,
        };
        networkStatuses.value.push(order);
      });
    };

    const fetchStatuses = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-network-statuses", {
          ucn: ucn,
        });
        setStatuses(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    const user = useUserStore();

    fetchStatuses(user.$state.ucn);

    const getFilter = (filter) => {
      selectFilter.value = filter;
    };

    const filteredNetworkStatuses = computed(() => {
      let arr = selectFilter.value.map((el) => el.toLowerCase());
      if (search.value) {
        return networkStatuses.value.filter((item) => {
          return (
            item.cname.toLowerCase().includes(search.value.toLowerCase()) ||
            item.address.toLowerCase().includes(search.value.toLowerCase())
          );
        });
      } else {
        for (let index = 0; index < selectFilter.value.length; index++) {
          if (
            selectFilter.value.includes("all")
          ) {
            return networkStatuses.value;
          } else if (selectFilter.value.includes("my services")) {
            return networkStatuses.value.filter((item) => {
              return !item.customer;
            });
          } else if (selectFilter.value.includes("my customers")) {
            return networkStatuses.value.filter((item) => {
              return item.customer;
            });
          } else {
            return networkStatuses.value.filter((item) => {
              return (
                arr.includes(item.service.toLowerCase()) ||
                arr.includes(item.serviceType.toLowerCase())
              );
            });
          }
        }
      }
    });

    const sortByColumn = (sort) => {
      if (sortKey.value === sort) {
        reverse.value = !reverse.value;
      } else {
        reverse.value = true;
        sortKey.value = sort;
      }

      const reversee = reverse.value;

      networkStatuses.value.sort(function (a, b) {
        if (a[sort] > b[sort]) {
          return reversee ? 1 : -1;
        } else if (a[sort] < b[sort]) {
          return reversee ? -1 : 1;
        }
        return 0;
      });
    };

    const inputChange = (value) => {
      search.value = value;
    };

    const updateSelectedItems = (obj) => {
      selectedItems.value = obj.selected;
      selectedLength.value = obj.length;
    };

    const deleteItems = () => {
      for (const key in selectedItems.value) {
        networkStatuses.value.splice(selectedItems.value[key], selectedLength.value);
      }
    };

    const refresh = () => {
      fetchStatuses(user.$state.ucn);
    };

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      deleteItems,
      inputChange,
      sortByColumn,
      getFilter,
      networkStatuses,
      tableHeader,
      search,
      filteredNetworkStatuses,
      selectFilter,
      filters,
      user,
      refresh,
      loading,
    };
  },
};
</script>
