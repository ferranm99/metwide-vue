<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <!--<h2 class="text-2xl text-slate-800 font-bold mb-5">My Account</h2>-->
      <!-- Picture -->
      <section>
        <div class="flex items-center">
          <div class="mr-4">
            <img
              class="w-12 rounded-full"
              src="@/images/logo-mini.png"
              alt="User upload"
            />
          </div>
          <button class="btn-sm bg-primary-500 hover:bg-primary-600 text-white">
            Change
          </button>
        </div>
      </section>
      <!-- Business Profile -->
      <section class="pt-4">
        <h3 class="text-xl leading-snug text-slate-800 font-semibold mb-1">
          Company Details
        </h3>
        <div class="text-xs"></div>
        <div
          class="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5"
        >
          <div class="sm:w-1/3">
            <label class="block text-xs mb-1" for="name">Company name</label>
            <input
              id="card-name"
              class="form-input w-full"
              :class="{ 'bg-gray-50': !isEdit }"
              :disabled="!isEdit"
              type="text"
              :value="user.$state.company_name"
            />
            <!-- <p class="form-input">{{ user.$state.company_name }}</p> -->
          </div>
          <div class="sm:w-1/6">
            <label class="block text-xs font-medium mb-1" for="business-id"
              >ABN</label
            >
            <input
              id="card-name"
              class="form-input w-full"
              :class="{ 'bg-gray-50': !isEdit }"
              :disabled="!isEdit"
              type="text"
              :value="user.$state.abn"
            />
            <!-- <p class="form-input">{{ user.$state.abn }}</p> -->
          </div>
          <div class="sm:w-3/6">
            <label class="block text-xs font-medium mb-1" for="location"
              >Billing Address</label
            >
            <input
              id="card-name"
              class="form-input w-full"
              :class="{ 'bg-gray-50': !isEdit }"
              :disabled="!isEdit"
              type="text"
              :value="user.$state.bill_full_address"
            />
            <!-- <p class="form-input">{{ user.$state.bill_full_address }}</p> -->
          </div>
        </div>
      </section>
      <!-- Contact -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-semibold mb-1">
          Contact Details
        </h3>
        <div class="text-xs"></div>
        <div class="flex flex-wrap mt-5">
          <div class="mr-2 sm:w-1/4">
            <label class="block text-xs font-medium mb-1" for="phone">
              Contact Person</label
            >
            <input
              id="contact-person"
              class="form-input w-full"
              :class="{ 'bg-gray-50': !isEdit }"
              :disabled="!isEdit"
              :value="
                user.$state.contact_given + ' ' + user.$state.contact_family
              "
            />
          </div>
          <div class="mr-2 sm:w-1/4">
            <label class="block text-xs font-medium mb-1" for="phone"
              >Phone Number</label
            >
            <input
              id="contact-person"
              class="form-input w-full"
              :class="{ 'bg-gray-50': !isEdit }"
              :disabled="!isEdit"
              :value="user.$state.work_phone"
            />
            <!-- <p class="form-input">{{ user.$state.work_phone }}</p> -->
          </div>
          <div class="mr-2 sm:w-1/4">
            <label class="block text-xs font-medium mb-1" for="mobile"
              >Mobile Number</label
            >
            <input
              id="contact-person"
              class="form-input w-full"
              :class="{ 'bg-gray-50': !isEdit }"
              :disabled="!isEdit"
              :value="user.$state.mobile_phone"
            />
            <!-- <p class="form-input">{{ user.$state.mobile_phone }}</p> -->
          </div>
        </div>
      </section>

      <!-- Balance -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-semibold mb-1">
          Account Balance
        </h3>
        <div class="text-xs"></div>
        <div class="flex flex-wrap mt-5">
          <div class="mr-2 sm:w-1/4">
            <label class="block text-xs font-medium mb-1" for="account"
              >Account Number</label
            >
            <input
              id="contact-person"
              class="form-input w-full bg-gray-50"
              disabled
              :value="user.$state.ucn"
            />
            <!-- <p class="form-input">{{ user.$state.ucn }}</p> -->
          </div>
          <div class="mr-2 sm:w-1/4">
            <label class="block text-xs font-medium mb-1" for="balance"
              >Current Account Balance</label
            >
            <input
              id="contact-person"
              class="form-input w-full bg-gray-50"
              disabled
              :value="currentBalance"
            />
            <!-- <p class="form-input">${{ user.$state.current_balance }}</p> -->
          </div>
          <div class="mr-2 sm:w-1/4">
            <label class="block text-xs font-medium mb-1" for="o-balance"
              >Overdue Balance</label
            >
            <input
              id="contact-person"
              class="form-input w-full bg-gray-50"
              disabled
              :value="overdueBalance"
            />
            <!-- <p class="form-input">
              ${{ user.$state.account_balance - user.$state.current_balance }}
            </p> -->
          </div>
        </div>
      </section>
    </div>
    <!-- Panel footer -->
    <footer>
      <div class="flex flex-col px-6 py-5 border-t border-slate-200">
        <div class="flex self-end">
          <button
            @click="isEdit = !isEdit"
            v-if="isEdit"
            class="btn border-slate-200 hover:border-slate-300 text-slate-600"
          >
            Cancel
          </button>
          <button
            @click="isEdit = !isEdit"
            class="btn bg-primary-500 hover:bg-primary-600 text-white ml-3 capitalize w-32"
          >
            {{ !isEdit ? "edit" : "Save changes" }}
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { reactive } from "vue";
import numeral from "numeral";

export default {
  name: "AccountPanel",
  setup() {
    const sync = ref("Off");
    const user = useUserStore();
    const isEdit = ref(false);

    // currentBalance = user.current_balance

    const form = reactive({
      email: "",
      password: "",
      accountNumber: "",
    });

    const currencyWithCommas = (value) => {
      return numeral(value).format("$0,0.00");
    };

    const currentBalance = currencyWithCommas(user.$state.current_balance);

    const overdueBalance = currencyWithCommas(
      user.$state.account_balance - user.$state.current_balance
    );

    return {
      sync,
      user,
      isEdit,
      currentBalance,
      overdueBalance,
    };
  },
};
</script>
