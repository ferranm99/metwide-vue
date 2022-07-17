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
          <div class="mb-8 flex items-center">
            <!-- Title -->
            <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">
              Account Information
            </h1>
          </div>
          <!-- Content -->
          <div class="bg-white shadow-lg rounded-sm mb-8">
            <div class="flex flex-col md:flex-row md:-mr-px">
              <SettingsSidebar
                @activeTab="isActive = $event"
                :tabs="sidebarLinks"
                title="Account Settings"
              />
              <AccountPanel v-if="isActive === 0"/>
              <AccountUserPanel v-if="isActive === 1"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "../partials/Sidebar.vue";
import Header from "../partials/Header.vue";
import SettingsSidebar from "../partials/settings/SettingsSidebar.vue";
import AccountPanel from "../partials/settings/AccountPanel.vue";
import AccountUserPanel from "../partials/settings/AccountUserPanel.vue";
import { useUserStore } from "@/stores/user.js";

export default {
  name: "Account",
  components: {
    Sidebar,
    Header,
    SettingsSidebar,
    AccountPanel,
    AccountUserPanel,
  },
  setup() {
    const isActive = ref(0);
    const sidebarOpen = ref(false);
    const user = useUserStore();
    const sidebarLinks = ref([
      {
        title: "Account Details",
      },
      {
        title: "Users",
      },
    ]);
    return {
      sidebarLinks,
      sidebarOpen,
      user,
      isActive,
    };
  },
};
</script>
