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
          <div class="text-center">
            <h1 class="text-2xl text-slate-600 font-bold">
              Forgot your password?
            </h1>
            <p class="py-4 text-sm">
              Please enter your account number and email address. We will send
              you a link to reset your password.
            </p>
          </div>
          <div v-if="showSuccessAlert" class="rounded-md bg-green-50 p-4 mt-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">
                  Password reset link was sent to your email.
                </p>
              </div>
              <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    @click="dismissAlert"
                    class="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  >
                    <span class="sr-only">Dismiss</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Form -->
          <form v-on:submit.prevent="sendForgotPassword" class="p-4">
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
                  v-model="form.account_ucn"
                  id="accountNumber"
                  class="form-input w-full"
                  type="text"
                />
              </div>
            </div>
            <div v-if="noMatch" class="mt-2">
              <span class="text-sm text-red-500"
                >These credentials do not match our records.</span
              >
            </div>
            <div class="flex items-center mt-6">
              <button
                class="w-full btn px-8 bg-primary-500 hover:bg-primary-600 text-white"
                type="submit"
              >
                Reset password
              </button>
              <Loading class="pl-2 w-8 h-8" v-if="loading" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Loading from "@/components/LoadingSmall.vue";
import useAuth from "../auth/useAuth";
import { ref, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
import { useApi } from "@/api/useAPI";
const api = useApi();

export default {
  components: {
    Loading,
  },

  setup() {
    let loading = ref(false);
    let noMatch = ref(false);
    let showSuccessAlert = ref(false);

    const router = useRouter();
    const auth = useAuthStore();

    const form = reactive({
      email: "",
      account_ucn: "",
    });

    const sendForgotPassword = async () => {
      loading.value = true;
      noMatch.value = false;
      try {
        await api.get("sanctum/csrf-cookie");
        await api.post("forgot-password", form);
        showSuccessAlert.value = true;
        loading.value = false;
        clearForm();
      } catch (e) {
        console.log(e);
        loading.value = false;
        noMatch.value = true;
        //this.$toasted.error("These credentials do not match our records!");
      }

      loading.value = false;
    };

    const clearForm = async () => {
      form.email = "";
      form.account_ucn = "";
    };

    const dismissAlert = async () => {
      showSuccessAlert.value = false;
    };

    return {
      loading,
      form,
      sendForgotPassword,
      dismissAlert,
      showSuccessAlert,
      noMatch
    };
  },
};
</script>
