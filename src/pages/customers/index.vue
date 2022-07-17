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
                Customers
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
          <!-- Table -->
          <DataTable
            @sortBy="sortByColumn"
            :navigate="{
              clickAble: [{ name: 'accountUCN', page: 'customers' }],
            }"
            :items="customers"
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
const api = useApi();

export default {
  name: "Customers",
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
    const user = useUserStore();

    const tableHeader = ref([
      {
        title: "account UCN",
        name: "accountUCN",
      },
      {
        title: "account name",
        name: "accountName",
      },
      {
        title: "contact name",
        name: "contactName",
      },
      {
        title: "email",
        name: "email",
      },
      {
        title: "phone number",
        name: "phoneNUmber",
      },
      {
        title: "mobile number",
        name: "mobileNumber",
      },
    ]);

    let customers = ref([]);

    const setCustomers = (data) => {
      customers.value = [];
      data.forEach((element) => {
        let customer = {
          accountUCN: element.ucn,
          accountName: element.name,
          contactName: element.contact_given + " " + element.contact_family,
          email: element.email,
          phoneNUmber: element.home_phone,
          mobileNumber: element.mobile_phone,
        };
        customers.value.push(customer);
      });
    };

    const fetchCustomers = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-account-customers", {
          ucn: ucn,
        });

        setCustomers(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    fetchCustomers(user.$state.ucn);

    const sortByColumn = (sort) => {
      if (sortKey.value === sort) {
        reverse.value = !reverse.value;
      } else {
        reverse.value = true;
        sortKey.value = sort;
      }

      const reversee = reverse.value;

      customers.value.sort(function (a, b) {
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

    const deleteItems = () => {
      for (const key in selectedItems.value) {
        customers.value.splice(selectedItems.value[key], selectedLength.value);
      }
    };

    const refresh = () => {
      fetchCustomers(user.$state.ucn);
    };

    return {
      sidebarOpen,
      deleteItems,
      inputChange,
      sortByColumn,
      customers,
      tableHeader,
      search,
      customers,
      user,
      refresh,
      loading,
    };
  },
};
</script>
