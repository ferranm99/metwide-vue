<template>
  <div
    class="col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200"
  >
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Services</h2>
    </header>
    <div class="p-3">
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead
            class="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm"
          >
            <tr>
              <th class="p-2">
                <div class="font-semibold text-left">TYPE</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">ACTIVE</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-center">CLOSED</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm font-medium divide-y divide-slate-100">
            <!-- Row -->
            <tr v-for="(service, index) in services" :key="index">
              <td class="p-2">
                <div class="flex items-center">
                  <div class="text-slate-800">{{ service.type }}</div>
                </div>
              </td>
              <td class="p-2">
                <div
                  class="text-center text-primary-500 cursor-pointer"
                  @click="goToNbn('active')"
                >
                  {{ service.active }}
                </div>
              </td>
              <td class="p-2">
                <div
                  class="text-center text-primary-500 cursor-pointer"
                  @click="goToNbn('closed')"
                >
                  {{ service.closed }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
const api = useApi();

export default {
  name: "DashboardNbnServicesCard",

  setup() {
    let loading = ref(false);

    const user = useUserStore();

    let services = ref([
      {
        type: "nbn",
        active: 0,
        closed: 0,
      },
    ]);

    let active = ref(0);
    let closed = ref(0);

    // ToDo: Messy, needs to be cleaned up

    const setNbnServicesStatus = (data) => {
      active.value = data.ACTIVE;
      closed.value = data.INACTIVE;

      services.value[0]["active"] = active.value;
      services.value[0]["closed"] = closed.value;
    };

    const fetchNbnServicesStatus = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-nbn-services-status", {
          ucn: ucn,
        });
        setNbnServicesStatus(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    fetchNbnServicesStatus(user.$state.ucn);
    const router = useRouter();
    const goToNbn = (category) => {
      JSON.stringify(window.localStorage.setItem("category", [category]));
      router.push("/nbn");
    };

    return {
      // active,
      // closed,
      goToNbn,
      services,
    };
  },
};
</script>
