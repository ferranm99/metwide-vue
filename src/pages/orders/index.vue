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
                Broadband Orders
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div>
              <div
                class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
              >
                <!-- Delete button -->
                <!--<DeleteButton
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
            <div class="flex space-x-2 capitalize">
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.provision"
              />
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.smile"
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
            :navigate="{
              clickAble: [{ name: 'order', page: 'orders' }],
            }"
            :items="filteredOrders"
            :table-header="tableHeader"
            class="mt-3"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import FilterSelectPills from "@/components/FilterSelectPills.vue";
import SearchForm from "@/components/SearchForm.vue";
import DataTable from "@/partials/DataTable/index.vue";
import PaginationClassic from "@/components/PaginationClassic.vue";
import { RefreshIcon } from "@heroicons/vue/outline";
import Loading from "@/components/LoadingSmall.vue";
import DeleteButton from "../../partials/actions/DeleteButton.vue";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
const api = useApi();

export default {
  name: "Orders",
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
    DeleteButton,
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
      provision: [
        {
          id: 0,
          name: "provisioning status",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "Complete",
        },
        {
          id: 3,
          name: "In Progress",
        },
        {
          id: 4,
          name: "New Order",
        },
        {
          id: 5,
          name: "Widthdrawn",
        },
      ],
      smile: [
        {
          id: 0,
          name: "Smile Status",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "provisioned",
        },
        {
          id: 3,
          name: "deprovisioned",
        },
      ],
      data: [
        {
          id: 0,
          name: "data plan",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "unlimited",
        },
        {
          id: 3,
          name: "business",
        },
      ],
    };
    const tableHeader = ref([
      {
        title: "order #",
        name: "order",
      },
      {
        title: "ucn",
        name: "ucn",
      },
      {
        title: "address",
        name: "address",
      },
      {
        title: "provisioning status",
        name: "status",
      },
      {
        title: "smile status",
        name: "sstatus",
      },
      {
        title: "usn",
        name: "usn",
      },
      {
        title: "data plan",
        name: "plan",
      },
      {
        title: "connection type",
        name: "ctype",
      },
      {
        title: "location id",
        name: "id",
      },
      {
        title: "contact name",
        name: "cname",
      },
    ]);

    let orders = ref([
      /*  {
        order: "223567",
        address: "aaa",
        status: "complete",
        sstatus: "provisioned",
        usn: "2020201231",
        plan: "unlimited",
        ctype: "FTTP",
        id: "loc39281001",
        cname: "Brad king",
      },
      {
        order: "202367",
        address: "bbbb",
        status: "in progress",
        sstatus: "deprovisioned",
        usn: "2020201231",
        plan: "business",
        ctype: "FTTP",
        id: "loc39281002",
        cname: "Michael",
      },
      {
        order: "20067",
        address: "cccc",
        status: "complete",
        sstatus: "deprovisioned",
        usn: "2020201231",
        plan: "business",
        ctype: "FTTP",
        id: "loc39281003",
        cname: "David",
      },
      {
        order: "56007",
        address: "dddd",
        status: "complete",
        sstatus: "provisioned",
        usn: "2020201231",
        plan: "business",
        ctype: "FTTP",
        id: "loc39281004",
        cname: "Richard",
      },*/
    ]);

    const setOrders = (data) => {
      orders.value = [];
      data.forEach((element) => {
        let order = {
          order: element.service_order_reference,
          ucn: element.service_order.account_ucn,
          address: element.full_address,
          status: element.provisioning_status
            ? element.provisioning_status
            : "",
          sstatus: element.billing_status ? element.billing_status : "",
          usn: element.subscription_usn,
          plan: element.data_plan.name ? element.data_plan.name : "",
          ctype: element.connection_type,
          id: element.location_id,
          cname:
            element.service_contact_first_name +
            " " +
            element.service_contact_last_name,
          id: element.id.toString(),
          customer:
            element.service_order.account_ucn === user.$state.ucn
              ? false
              : true,
        };
        orders.value.push(order);
      });

    };

    const fetchOrders = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-broadband-orders", {
          ucn: ucn,
        });
        setOrders(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    const user = useUserStore();

    fetchOrders(user.$state.ucn);

    const getFilter = (filter) => {
      selectFilter.value = filter;
    };

    const filteredOrders = computed(() => {
      const arr = selectFilter.value.map((el) => el.toLowerCase());
      if (search.value) {
        return orders.value.filter((item) => {
          return (
            item.cname.toLowerCase().includes(search.value.toLowerCase()) ||
            item.address.toLowerCase().includes(search.value.toLowerCase())
          );
        });
      } else {
        for (let index = 0; index < selectFilter.value.length; index++) {
          if (selectFilter.value.includes("all")) {
            return orders.value;
          } else if (selectFilter.value.includes("my services")) {
            return orders.value.filter((item) => {
              return !item.customer;
            });
          } else if (selectFilter.value.includes("my customers")) {
            return orders.value.filter((item) => {
              return item.customer;
            });
          } else {
            return orders.value.filter((item) => {
              return (
                arr.includes(item.status.toLowerCase()) ||
                arr.includes(item.sstatus.toLowerCase()) ||
                arr.includes(item.plan.toLowerCase())
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

      orders.value.sort(function (a, b) {
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
        orders.value.splice(selectedItems.value[key], selectedLength.value);
      }
    };

    const refresh = () => {
      fetchOrders(user.$state.ucn);
    };

    onMounted(() => {
      selectFilter.value = window.localStorage.getItem("category")
        ? [window.localStorage.getItem("category")]
        : ["all"];
    });
    onUnmounted(() => {
      window.localStorage.getItem("category");
    });

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      deleteItems,
      inputChange,
      sortByColumn,
      getFilter,
      orders,
      tableHeader,
      search,
      filteredOrders,
      selectFilter,
      filters,
      user,
      refresh,
      loading,
    };
  },
};
</script>
