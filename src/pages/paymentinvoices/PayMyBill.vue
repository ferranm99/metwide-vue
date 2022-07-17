<template>
  <div>
    <div class="sm:flex sm:justify-between sm:items-center mb-8">
      <!-- Left: Title -->
      <div>
        <!-- <div class="mb-4">
          <h1 class="capitalize text-2xl md:text-3xl text-slate-800 font-bold">
            Payments & Invoices
          </h1>
        </div> -->
        <!-- <div class="flex space-x-2">
          <FilterSelect
            @selectedFilter="getFilter($event)"
            :filterItems="filters.views"
          />
        </div> -->
      </div>
    </div>

    <!-- Content -->
    <div class="bg-white shadow-lg rounded-sm mb-8 p-6">
      <ModalBlank
        id="success-modal"
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
                Pay my Account
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
                Pay my Account
              </div>
            </div>
            <!-- Modal content -->
            <div class="text-sm mb-10">
              <div class="space-y-2">
                <p>
                  Thank you for the payment. Your receipt #
                  {{ paymentReceipt }}.
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
      <div
        class="flex p-2 mb-8 mx-auto max-w-lg bg-primary-50 relative overflow-hidden rounded-md text-center border-8 border-primary-50"
      >
        <div class="relative">
          <h2>
            Amount Due:
            <span class="font-extrabold">{{ accountBalance }}</span>
          </h2>
        </div>
      </div>
      <div class="max-w-lg mx-auto">
        <!-- Card form -->
        <form v-on:submit.prevent="processPayment">
          <div class="p-12 border border-dark border-opacity-125 rounded-lg">
            <div class="space-y-4">
              <!-- Account to pay ($) -->
              <div>
                <label class="block text-sm font-medium mb-1" for="card-nr"
                  >Amount to pay ($) <span class="text-rose-500">*</span></label
                >
                <input
                  v-model="form.amount"
                  id="card-nr"
                  class="form-input w-full"
                  type="text"
                  placeholder=""
                />
              </div>
              <!-- Card Number -->
              <div>
                <label class="block text-sm font-medium mb-1" for="card-nr"
                  >Card Number <span class="text-rose-500">*</span></label
                >
                <input
                  v-model="form.creditCardNumber"
                  id="card-nr"
                  class="form-input w-full"
                  type="text"
                  placeholder=""
                />
              </div>

              <!-- Name on Card -->
              <div>
                <label class="block text-sm font-medium mb-1" for="card-name"
                  >Name on Card <span class="text-rose-500">*</span></label
                >
                <input
                  v-model="form.nameOnCard"
                  id="card-name"
                  class="form-input w-full"
                  type="text"
                  placeholder=""
                />
              </div>
              <!-- Expiry and CVC -->
              <div class="flex space-x-4">
                <div class="flex-1">
                  <label
                    class="block text-sm font-medium mb-1"
                    for="card-expiry"
                    >Expiry Date <span class="text-rose-500">*</span></label
                  >
                  <input
                    v-model="form.expiryDate"
                    id="card-expiry"
                    class="form-input w-full"
                    type="text"
                    placeholder="MM/YY"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-sm font-medium mb-1" for="card-cvc"
                    >CVC <span class="text-rose-500">*</span></label
                  >
                  <input
                    v-model="form.cvc"
                    id="card-cvc"
                    class="form-input w-full"
                    type="text"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <!-- Form footer -->
            <div class="mt-6">
              <div class="mb-4">
                <button
                  class="btn w-44 bg-primary-500 hover:bg-primary-600 text-white"
                  type="submit"
                >
                  Pay Account
                </button>
              </div>
              <div class="text-xs text-slate-500 italic text-center"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import SearchForm from "@/components/SearchForm.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import BillingPanel from "@/partials/settings/BillingPanel.vue";
import Loading from "@/components/LoadingSmall.vue";
import ModalBlank from "../../components/ModalBlank.vue";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
const api = useApi();
import numeral from "numeral";

export default {
  components: {
    SearchForm,
    FilterSelect,
    BillingPanel,
    Loading,
    ModalBlank,
  },
  setup() {
    let loading = ref(false);
    const errorModalOpen = ref(false);
    const successModalOpen = ref(false);
    const errorMessage = ref("");
    const paymentReceipt = ref("");
    const user = useUserStore();
    const selectFilter = ref("all");
    const filters = {
      views: [
        {
          id: 0,
          name: "views",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "my services",
        },
        {
          id: 3,
          name: "my customers",
        },
        {
          id: 4,
          name: "my staff",
        },
      ],
    };

    const form = ref({
      ucn: user.$state.ucn,
      userName: user.$state.contact_given + " " + user.$state.contact_family,
      accountName: user.$state.name,
      amount: null,
      nameOnCard: null,
      expiryDate: null,
      cvc: null,
      creditCardNumber: null,
    });

    const processPayment = async () => {
      loading.value = true;
      try {
        await api.get("sanctum/csrf-cookie");
        const res = await api.post("user/process-payment", form.value);
        if (res.data.status === "processing") {
          resetForm();
          errorMessage.value =
            "There is a transaction being processed for this account. Please contact support to verify.";
          errorModalOpen.value = true;
        } else if (res.data.status === "error processing") {
          resetForm();
          errorMessage.value =
            "There was an error processing the payment. Please check the details and try again.";
          errorModalOpen.value = true;
        } else if (res.data.status === "payment failed") {
          resetForm();
          errorMessage.value =
            "The payment processing has failed. The bank response was " +
            res.data.receipt;
          errorModalOpen.value = true;
        } else if (res.data.status === "success") {
          resetForm();
          paymentReceipt.value = res.data.receipt;
          successModalOpen.value = true;
        } else {
          resetForm();
          errorMessage.value =
            "Unknown status. Please contact support to verify.";
          errorModalOpen.value = true;
        }
      } catch (error) {
        console.log("Error at processPayment: ", error.message);
        throw error;
      }
      loading.value = false;
    };

    const resetForm = () => {
      form.value.nameOnCard = null;
      form.value.creditCardNumber = null;
      form.value.expiryDate = null;
      form.value.cvc = null;
      form.value.amount = null;
    };

    const selectTab = (id) => {
      selectedTab.value = id;
    };

    const currencyWithCommas = (value) => {
      return numeral(value).format("$0,0.00");
    };

    const accountBalance = currencyWithCommas(user.$state.account_balance);

    return {
      selectFilter,
      selectTab,
      filters,
      user,
      accountBalance,
      form,
      loading,
      processPayment,
      errorModalOpen,
      successModalOpen,
      errorMessage,
      paymentReceipt,
    };
  },
};
</script>
