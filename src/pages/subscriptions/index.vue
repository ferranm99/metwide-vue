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
                Subscriptions
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
              <!-- Delete button -->
              <!-- <DeleteButton
                :selectedItems="selectedItems"
                @click="deleteItems()"
              /> -->
              <!-- Dropdown -->
              <SearchForm @input:search="inputChange" v-model:search="search" />
              <!-- Add customer button -->
              <div class="flex items-center">
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
          <!-- Filter -->
          <div class="md:flex justify-between items-center space-x-2">
            <div class="flex space-x-2 capitalize">
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.service"
              />
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.plan"
              />
            </div>
            <FilterSelectPills
              @selectedFilter="getFilter($event)"
              v-if="user.is_reseller"
            />
          </div>
          <!-- Table -->
          <DataTable
            @sortBy="sortByColumn"
            @change-selection="updateSelectedItems($event)"
            class="mt-3"
            :navigate="{
              clickAble: [
                { name: 'usn', page: 'subscriptions' },
                { name: 'username', page: 'nbn' },
              ],
            }"
            :items="filteredsubscriptions"
            :table-header="tableHeader"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import SearchForm from "@/components/SearchForm.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import DataTable from "@/partials/DataTable/index.vue";
import FilterSelectPills from "@/components/FilterSelectPills.vue";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
import { RefreshIcon } from "@heroicons/vue/outline";
import Loading from "@/components/LoadingSmall.vue";

const api = useApi();

export default {
  name: "Subscriptions",
  components: {
    Sidebar,
    Header,
    SearchForm,
    DataTable,
    FilterSelect,
    FilterSelectPills,
    RefreshIcon,
    Loading,
  },
  setup(context) {
    let loading = ref(false);
    const search = ref("");
    const sidebarOpen = ref(false);
    const selectedItems = ref([]);
    const selectedLength = ref(null);
    const sortKey = ref("");
    const reverse = ref(false);
    const selectFilter = ref(["all"]);
    const filters = {
      service: [
        {
          id: 0,
          name: "service status",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "active",
        },
        {
          id: 3,
          name: "closed",
        },
      ],
      plan: [
        {
          id: 0,
          name: "Service Type",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "nbn",
        },
      ],
    };
    const tableHeader = ref([
      {
        title: "username",
        name: "username",
      },
      {
        title: "account name",
        name: "accountName",
      },
      {
        title: "usn",
        name: "usn",
      },
      {
        title: "service status",
        name: "service",
      },
      {
        title: "service type",
        name: "serviceType",
      },
      {
        title: "plan",
        name: "plan",
      },
      {
        title: "description",
        name: "description",
      },
    ]);
    const subscriptions = ref([
    /*  {
        username: "test@test.com",
        usn: "2020201231",
        service: "active",
        serviceType: "provisioned",
        plan: "FTTP",
        description: "Excepteur sint occaecat cupidatat non proident",
      },
      {
        username: "user@example.com",
        usn: "5020201232",
        service: "closed",
        serviceType: "deprovisioned",
        plan: "SMTP",
        description: "Excepteur sint occaecat cupidatat non proident",
      },
      {
        username: "joe@site.com",
        usn: "2020201233",
        service: "active",
        serviceType: "provisioned",
        plan: "FTTP",
        description: "Excepteur sint occaecat cupidatat non proident",
      },
      {
        username: "john@test.com",
        usn: "5020201234",
        service: "closed",
        serviceType: "deprovisioned",
        plan: "FTTP",
        description: "Excepteur sint occaecat cupidatat non proident",
      }, */
    ]);

    const setSubscriptions = (data) => {
      subscriptions.value = [];
      data.forEach((element) => {
        let order = {
          username: element.username,
          customerName: element.account.name,
          usn: element.usn,
          service: element.billing_status ? element.billing_status : "",
          serviceType: element.smile_service_name,
          plan: element.smile_plan ? element.smile_plan.name : "",
          description: element.description,
          id: element.id.toString(),
          customer:
            element.account_ucn === user.$state.ucn
              ? false
              : true,
        };
        subscriptions.value.push(order);
      });
    };

    const fetchSubscriptions = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-subscriptions", {
          ucn: ucn,
        });
        setSubscriptions(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    const user = useUserStore();

    fetchSubscriptions(user.$state.ucn);

    const getFilter = (filter) => {
      selectFilter.value = filter;
    };

    const filteredsubscriptions = computed(() => {
      let arr = selectFilter.value.map((el) => el.toLowerCase());
      if (search.value) {
        return subscriptions.value.filter((item) => {
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
            return subscriptions.value;
          } else if (selectFilter.value.includes("my services")) {
            return subscriptions.value.filter((item) => {
              return !item.customer;
            });
          } else if (selectFilter.value.includes("my customers")) {
            return subscriptions.value.filter((item) => {
              return item.customer;
            });
          } else {
            return subscriptions.value.filter((item) => {
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

      subscriptions.value.sort(function (a, b) {
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
        subscriptions.value.splice(
          selectedItems.value[key],
          selectedLength.value
        );
      }
    };

    const refresh = () => {
      fetchSubscriptions(user.$state.ucn);
    };

    return {
      user,
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      deleteItems,
      inputChange,
      sortByColumn,
      getFilter,
      subscriptions,
      tableHeader,
      search,
      filteredsubscriptions,
      selectFilter,
      filters,
      refresh,
      loading,
    };
  },
};
</script>
