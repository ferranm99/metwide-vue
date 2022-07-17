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
        <ModalBlank
          id="error-modal"
          :modalOpen="errorModalOpen"
          @close-modal="errorModalOpen = false"
        >
          <div class="p-5 flex space-x-4">
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100"
            >
              <svg
                class="w-4 h-4 shrink-0 fill-current text-rose-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
                />
              </svg>
            </div>
            <!-- Content -->
            <div>
              <!-- Modal header -->
              <div class="mb-2">
                <div class="text-lg font-semibold text-slate-800">
                  Speed change request
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>
                    {{ errorMessage }}
                  </p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <button
                  @click.stop="errorModalOpen = false"
                  class="btn-sm bg-primary-500 hover:bg-primary-600 text-white px-8"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>
        <ModalBlank
          id="success-modal"
          :modalOpen="successModalOpen"
          @close-modal="successModalOpen = false"
        >
          <div class="p-5 flex space-x-4">
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary-100"
            >
              <svg
                class="w-4 h-4 shrink-0 fill-current text-primary-500"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
                />
              </svg>
            </div>
            <!-- Content -->
            <div>
              <!-- Modal header -->
              <div class="mb-2">
                <div class="text-lg font-semibold text-slate-800">
                  Speed change request
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>
                    Your speed change request has been submitted for processing.
                    We'll update you when completed.
                  </p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <button
                  @click.stop="successModalOpen = false"
                  class="btn-sm bg-primary-500 hover:bg-primary-600 text-white px-8"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>
        <ModalBasic
          id="feedback-modal"
          :modalOpen="modifySpeedModalOpen"
          @close-modal="modifySpeedModalOpen = false"
          title="Modify the speed"
        >
          <form v-on:submit.prevent="submitSpeedChange">
            <!-- Modal content -->
            <div class="px-5 pt-4 pb-1">
              <div class="text-sm">
                <div class="my-4">Upgrade or downgrade the speed:</div>
                <!-- Options -->
                <div class="mb-4">
                  <select
                    v-model="form.newSpeed"
                    id="speed"
                    class="form-select w-full"
                  >
                    <option :value="null" selected disabled>
                      Choose speed
                    </option>
                    <option v-for="speed in speeds" :key="speed">
                      {{ speed.name }} Mbps
                    </option>
                  </select>
                </div>
                <div v-if="form.newSpeed" class="text-xs text-slate-500">
                  You requested to change the speed to {{ form.newSpeed }}
                </div>
              </div>
            </div>
            <!-- Modal footer -->
            <div class="px-5 py-4">
              <div class="flex flex-wrap justify-end space-x-2">
                <button
                  class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                  @click.prevent="cancelModal"
                >
                  Cancel
                </button>
                <div class="flex">
                  <button
                    type="submit"
                    class="btn-sm bg-primary-500 hover:bg-primary-600 text-white"
                  >
                    Submit
                  </button>
                  <Loading class="pl-2 w-8 h-8" v-if="speedChangeLoading" />
                </div>
              </div>
            </div>
          </form>
        </ModalBasic>

        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="sm:flex sm:justify-between sm:items-center mb-8">
            <!-- Left: Title -->
            <div class="mb-4 sm:mb-0">
              <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
                Active NBN Services
              </h1>
            </div>

            <!-- Right: Actions  -->
            <div
              class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2"
            >
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

          <div class="md:flex justify-between items-center space-x-2">
            <div class="flex space-x-2 capitalize">
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.provisioning"
              />
              <FilterSelect
                @selectedFilter="getFilter($event)"
                :filterItems="filters.online"
              />
            </div>
            <div class="flex items-center gap-x-8">
              <!-- Modify Speed button -->
              <ModifySpeedButton
                class="mt-3"
                :actions="actions"
                :selectedItems="selectedItems"
                @trigger="triggerAction($event)"
              />
              <FilterSelectPills @selectedFilter="getFilter($event)" />
            </div>
          </div>
          <!-- Table -->
          <DataTable
            @sortBy="sortByColumn"
            @change-selection="updateSelectedItems($event)"
            class="mt-3"
            :navigate="{ clickAble: ['username'], page: 'nbn' }"
            :items="filterednbn"
            :table-header="tableHeader"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import SearchForm from "@/components/SearchForm.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import FilterSelectPills from "@/components/FilterSelectPills.vue";
import DataTable from "@/partials/DataTable/index.vue";
import PaginationClassic from "@/components/PaginationClassic.vue";
import { RefreshIcon } from "@heroicons/vue/outline";
import Loading from "@/components/LoadingSmall.vue";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
import ModifySpeedButton from "@/partials/actions/ModifySpeedButton.vue";
import ModalBasic from "@/components/ModalBasic.vue";
import ModalBlank from "../../components/ModalBlank.vue";

const api = useApi();

export default {
  name: "nbn",
  components: {
    Sidebar,
    Header,
    SearchForm,
    FilterSelect,
    DataTable,
    PaginationClassic,
    RefreshIcon,
    FilterSelectPills,
    Loading,
    ModifySpeedButton,
    ModalBasic,
    ModalBlank,
  },
  setup() {
    let router = useRouter();
    let loading = ref(false);
    let speedChangeLoading = ref(false);
    const modifySpeedModalOpen = ref(false);
    const successModalOpen = ref(false);
    const errorModalOpen = ref(false);
    const search = ref("");
    const sidebarOpen = ref(false);
    const selectedItems = ref([]);
    const selectedLength = ref(null);
    const sortKey = ref("");
    const reverse = ref(false);
    const selectFilter = ref(["all"]);
    let errorMessage = ref("");

    const user = useUserStore();

    const actions = ref(["modify speed", "Modem Request"]);

    const speeds = [
      {
        name: "12/1",
      },
      {
        name: "25/5",
      },
      {
        name: "50/20",
      },
      {
        name: "100/40",
      },
    ];

    const filters = {
      provisioning: [
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
          name: "active",
        },
        {
          id: 3,
          name: "closed",
        },
      ],
      online: [
        {
          id: 0,
          name: "online status",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "online",
        },
        {
          id: 3,
          name: "offline",
        },
      ],
    };
    const tableHeader = ref([
      {
        title: "username",
        name: "username",
      },
      {
        title: "Customer Name",
        name: "customerName",
      },
      {
        title: "address",
        name: "address",
      },
      {
        title: "provisioning status",
        name: "pstatus",
      },
      {
        title: "online status",
        name: "ostatus",
      },
      {
        title: "ip address",
        name: "ipaddress",
      },
      {
        title: "login time",
        name: "ltime",
      },
    ]);

    const form = ref({
      ucn: user.$state.ucn,
      firstName: user.$state.contact_given,
      lastName: user.$state.contact_family,
      phoneNumber: user.$state.work_phone
        ? user.$state.work_phone
        : user.$state.home_phone,
      mobileNumber: user.$state.mobile_phone,
      workNumber: user.$state.work_phone,
      vocusServiceID: null,
      newSpeed: null,
    });

    const nbnServices = ref([
      /*  {
        username: "test@test.com",
        address: "A address",
        pstatus: "active",
        ostatus: "online",
        ipaddress: "provisioned",
        ltime: "01-30-2022 01:00 am",
        id: "1",
      },
      {
        username: "user@example.com",
        address: "B address",
        pstatus: "active",
        ostatus: "online",
        ipaddress: "deprovisioned",
        ltime: "01-20-2022 01:00 pm",
        id: "2",
      },
      {
        username: "joe@site.com",
        address: "A address",
        pstatus: "closed",
        ostatus: "offline",
        ipaddress: "provisioned",
        ltime: "01-30-2022 01:00 am",
        id: "3",
      },
      {
        username: "john@test.com",
        address: "B address",
        pstatus: "closed",
        ostatus: "offline",
        ipaddress: "deprovisioned",
        ltime: "01-30-2022 01:00 am",
        id: "4",
      },*/
    ]);

    const setNbnServices = (data) => {
      nbnServices.value = [];
      data.forEach((element) => {
        let nbnService = {
          username: element.username,
          customerName: element.name,
          address: element.address,
          pstatus: element.status ? element.status : "",
          ostatus: element.assignedaddress ? "Online" : "Offline",
          ipaddress: element.assignedaddress,
          ltime: element.starttime,
          id: element.id.toString(),
          customer: element.ucn === user.$state.ucn ? false : true,
        };
        nbnServices.value.push(nbnService);
      });
    };

    const submitSpeedChange = async () => {
      form.value.vocusServiceID = selectedItems.value[0];
      speedChangeLoading.value = true;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/speed-change-request", form.value);
        if (data.data.status === "InProgress") {
          errorMessage.value =
            "Speed change request has been already submitted and is being processed. Please contact support to confirm. ";
          modifySpeedModalOpen.value = false;
          errorModalOpen.value = true;
        } else if (data.data.status === "success") {
          modifySpeedModalOpen.value = false;
          successModalOpen.value = true;
        } else {
        }
      } catch (e) {
        console.log(e);
      }

      speedChangeLoading.value = false;
    };

    const fetchNbnServices = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-nbn-services", {
          ucn: ucn,
        });
        setNbnServices(data.data);
      } catch (e) {
        console.log(e);
      }

      loading.value = false;
    };

    fetchNbnServices(user.$state.ucn);

    const getFilter = (filter) => {
      selectFilter.value = filter;
    };

    const filterednbn = computed(() => {
      const arr = selectFilter.value.map((el) => el.toLowerCase());
      if (search.value) {
        return nbnServices.value.filter((item) => {
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
            return nbnServices.value;
          } else if (selectFilter.value.includes("my services")) {
            return nbnServices.value.filter((item) => {
              return !item.customer;
            });
          } else if (selectFilter.value.includes("my customers")) {
            return nbnServices.value.filter((item) => {
              return item.customer;
            });
          } else {
            return nbnServices.value.filter((item) => {
              return (
                arr.includes(item.pstatus.toLowerCase()) ||
                arr.includes(item.ostatus.toLowerCase())
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

      nbnServices.value.sort(function (a, b) {
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

    const triggerAction = (action) => {
      let item = action.toLowerCase();
      if (item === "modify speed") {
        modifySpeedModalOpen.value = true;
      } else if (item === "modem request") {
        router.push("/e-commerce/shop");
      }
    };

    const cancelModal = () => {
      modifySpeedModalOpen.value = false;
      form.value.newSpeed = null;
    };

    const refresh = () => {
      fetchNbnServices(user.$state.ucn);
    };

    onMounted(() => {
      selectFilter.value = window.localStorage.getItem("category")
        ? [window.localStorage.getItem("category")]
        : ["all"];
    });
    onUnmounted(() => {
      window.localStorage.removeItem("category");
    });

    return {
      sidebarOpen,
      selectedItems,
      updateSelectedItems,
      triggerAction,
      inputChange,
      sortByColumn,
      getFilter,
      nbnServices,
      tableHeader,
      search,
      filterednbn,
      selectFilter,
      filters,
      refresh,
      loading,
      speedChangeLoading,
      modifySpeedModalOpen,
      successModalOpen,
      errorModalOpen,
      speeds,
      cancelModal,
      actions,
      submitSpeedChange,
      form,
      errorMessage,
    };
  },
};
</script>
