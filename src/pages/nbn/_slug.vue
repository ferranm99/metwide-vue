<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />
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
            <button
              @click="$router.go(-1)"
              class="mb-4 btn bg-primary-500 border-primary-500 hover:border-primary-300 py-1 text-white font-semibold"
            >
              <ArrowNarrowLeftIcon class="h-6 w-8 text-white" />
              Back
            </button>
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
              NBN service: {{ $route.params.slug }}
            </h1>
          </div>

          <!-- Content -->
          <div class="bg-white shadow-lg rounded-sm mb-8 p-6">
            <div class="grow">
              <!-- Panel body -->
              <div class="p-6 space-y-6">
                <!-- Billing Information -->
                <section>
                  <ul>
                    <li
                      v-for="(item, name, index) in items"
                      :key="index"
                      class="md:flex md:justify-start md:items-center py-3 border-b border-slate-200"
                    >
                      <!-- Left -->
                      <div
                        class="text-sm text-slate-800 font-medium capitalize w-1/4"
                      >
                        {{ name }}
                      </div>
                      <!-- Right -->
                      <div class="text-sm text-slate-800 w-3/4 ml-4">
                        <span class="mr-3">{{ item }}</span>
                      </div>
                    </li>
                  </ul>
                </section>
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
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";
import moment from "moment";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
const api = useApi();

export default {
  components: {
    Sidebar,
    Header,
    ArrowNarrowLeftIcon,
  },
  setup() {
    const user = useUserStore();
    const route = useRoute();
    const sidebarOpen = ref(false);
    const header = ref(["usn", "status"]);
    const items = ref([]);

    let broadbandOrder = ref({});

    const setNbnService = (data) => {
      let networkStatus = {
        Username: data.username,
        "Customer Name": user.$state.name,
        "Provisioning Status": data.status,
        "Online Status": data.assignedaddress ? "Online" : "Offline",
        Address: data.address,
        "IP Address": data.assignedaddress,
        "Login Time": data.starttime,
      };
      items.value = networkStatus;
    };

    const fetchNbnService = async (accountUCN) => {
      await api.get("sanctum/csrf-cookie");
      try {
        const [data, data1] = await Promise.all([
          api.post("user/get-nbn-service", {
            username: route.params,
          }),
          /* this.$api.$post("user/get-user-online-status", {
               username: this.username,
               date: '2022-03-11'
            }),*/
        ]);
        setNbnService(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNbnService();

    return {
      sidebarOpen,
      header,
      items,
    };
  },
};
</script>
