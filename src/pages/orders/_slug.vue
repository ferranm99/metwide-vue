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
              ORDER#: {{ $route.params.slug }}
            </h1>
          </div>

          <!-- Content -->
          <div class="bg-white shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <SettingsSidebar
                @activeTab="isActive = $event"
                title="Order panel"
                :tabs="sidebarLinks"
              />
              <Summary v-if="isActive === 0" :order="broadbandOrder" />
              <ServiceContact v-if="isActive === 1" :order="broadbandOrder" />
              <ServiceQualification v-if="isActive === 2" :order="broadbandOrder"/>
              <VocusOrder v-if="isActive === 3" :order="broadbandOrder"/>
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
import SettingsSidebar from "@/partials/settings/SettingsSidebar.vue";
import Summary from "@/partials/orders/Summary.vue";
import ServiceContact from "@/partials/orders/ServiceContact.vue";
import ServiceQualification from "@/partials/orders/ServiceQualification.vue";
import VocusOrder from "@/partials/orders/VocusOrder.vue";
import Header from "@/partials/Header.vue";
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";
import { useRoute } from 'vue-router'
import { useApi } from '@/api/useAPI'
const api = useApi()

export default {
  components: {
    Sidebar,
    Header,
    SettingsSidebar,
    Summary,
    ServiceContact,
    ServiceQualification,
    VocusOrder,
    ArrowNarrowLeftIcon,
  },
  setup() {
    const route = useRoute()
    const sidebarOpen = ref(false);
    const isActive = ref(0);
    const sidebarLinks = ref([
      {
        title: "Summary",
      },
      {
        title: "service contact",
      },
      {
        title: "service qualification",
      },
      {
        title: "metwide orders",
      },
    ]);

    let broadbandOrder = ref({})

     const setBroadbandOrder = (data) => {
       broadbandOrder.value = data
     }

    const fetchOrder = async (accountUCN) => {
      await api.get("sanctum/csrf-cookie");
      try {
         const data = await api.post(
            "user/get-broadband-order",
            { orderReference: route.params }
         );
         setBroadbandOrder(data.data)
      } catch (e) {
         context.error({
            statusCode: 404,
            message: "Oops, something went wrong!",
         });
      }
    };

    fetchOrder()

    return {
      sidebarLinks,
      isActive,
      sidebarOpen,
      broadbandOrder
    };
  },
};
</script>
