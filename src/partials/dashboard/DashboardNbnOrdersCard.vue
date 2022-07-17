<template>
  <div
    class="col-span-full xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200"
  >
    <header class="px-5 py-4 border-b border-slate-100">
      <h2 class="font-semibold text-slate-800">Orders</h2>
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
                <div class="font-semibold text-left">OPEN</div>
              </th>
              <th class="p-2">
                <div class="font-semibold text-left">COMPLETE</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm font-medium divide-y divide-slate-100">
            <!-- Row -->
            <tr v-for="(order, index) in orders" :key="index">
              <td class="p-2">
                <div class="flex items-center">
                  <div class="text-slate-800 capitalize">{{ order.type }}</div>
                </div>
              </td>
              <td class="p-2">
                <div class="flex items-center">
                  <div
                    class="text-green-500 cursor-pointer"
                    @click="goToOrders('in progress')"
                  >
                    {{ order.open }}
                  </div>
                </div>
              </td>
              <td class="p-2">
                <div class="flex items-center">
                  <div
                    class="text-green-500 cursor-pointer"
                    @click="goToOrders('complete')"
                  >
                    {{ order.complete }}
                  </div>
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
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
import { useRouter } from "vue-router";
const api = useApi();

export default {
  name: "DashboardNbnOrdersCard",

  setup() {
    let loading = ref(false);

    const user = useUserStore();

    let completed = ref(0);

    let open = ref(0);

    let orders = ref([
      {
        type: "broadband orders",
        open: 0,
        complete: 0,
      },
    ]);

  // ToDo: Messy, needs to be cleaned up
    const setOrdersStatus = (data) => {
      completed.value = data.Complete;
      open.value = 0;
      for (const key in data) {
        if (key.includes("InProgress")) {
          open.value = data[key];
        }
      }

      orders.value[0]['open'] = open.value;
      orders.value[0]['complete'] = completed.value;
    };

    const fetchOrdersStatus = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-broadband-orders-status", {
          ucn: ucn,
        });

        setOrdersStatus(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    const router = useRouter();
    const goToOrders = (category) => {
      JSON.stringify(window.localStorage.setItem("category", [category]));
      router.push("/orders");
    };

    fetchOrdersStatus(user.$state.ucn);

    return {
      //completed,
      //open,
      goToOrders,
      orders,
    };
  },
};
</script>
