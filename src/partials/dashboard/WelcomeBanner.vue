<template>
  <div class="relative bg-primary-200 p-4 rounded-sm overflow-hidden mb-8">
    <!-- Background illustration -->
    <div
      class="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block"
      aria-hidden="true"
    ></div>

    <!-- Content -->
    <div class="relative">
      <h1 class="text-xl md:text-2xl text-slate-700 font-semibold mb-1">
        G'day, {{ user.$state.au_first_name }}
      </h1>
      <p>Here's your account status:</p>
    </div>
  </div>
</template>

<script>
import useAuth from "@/auth/useAuth";
import { useUserStore } from "@/stores/user.js";

export default {
  name: "WelcomeBanner",
  setup() {
    const user = useUserStore();

    return {
      user,
    };
  },
};
</script>
