<template>
  <main class="bg-white">
    <div class="w-full">
      <div class="min-h-screen flex flex-col justify-center">
        <div class="mx-auto mb-8">
          <img class="h-16" src="../images/MWC-logo-240.png" alt="" />
        </div>

        <div
          class="w-112 mx-auto px-4 py-8 border border-dark border-opacity-125"
        >
          <div class="mb-6 flex items-center justify-center">
            <h1 class="text-2xl text-slate-600 font-bold">Welcome back!</h1>
          </div>
          <!-- Form -->
          <form v-on:submit.prevent="login" class="p-4">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="email"
                  >Email Address</label
                >
                <input
                  v-model="form.email"
                  id="email"
                  class="form-input w-full"
                  type="email"
                />
              </div>
              <div>
                <label
                  class="block text-sm font-medium mb-1"
                  for="accountNumber"
                  >Account Number</label
                >
                <input
                  v-model="form.accountNumber"
                  id="accountNumber"
                  class="form-input w-full"
                  type="text"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="password"
                  >Password</label
                >
                <input
                  v-model="form.password"
                  id="password"
                  class="form-input w-full"
                  type="password"
                  autoComplete="on"
                />
              </div>
            </div>
            <div class="flex items-center justify-between mt-6">
              <div class="mr-1">
                <router-link
                  class="text-sm underline hover:no-underline"
                  to="/forgot-password"
                  >Forgot Password?</router-link
                >
              </div>
              <div class="flex">
                <button
                  class="btn px-8 bg-primary-500 hover:bg-primary-600 text-white ml-3"
                  type="submit"
                >
                  Login
                </button>
                <Loading class="pl-2 w-8 h-8" v-if="loading" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Loading from "@/components/LoadingSmall.vue";
import useAuth from "../auth/useAuth";
import { ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";

const router = useRouter();
const auth = useAuthStore();
let loading = ref(false);

const form = reactive({
  email: "",
  password: "",
  accountNumber: "",
});

const credentials = reactive({
  email: null,
  password: null,
  accountNumber: null,
});

const login = async () => {
  loading = true
  await auth.login(form);
  loading = false
  await router.push("/");
};
</script>
