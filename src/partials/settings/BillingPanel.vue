<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <div>
        <!--<h2 class="text-2xl text-slate-800 font-bold mb-4">
          Account Overview
        </h2>-->
      </div>

      <!-- Billing Information -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-bold mb-1">
          Account Overview
        </h3>
        <div class="flex items-center space-x-4 my-4">
          <div
            class="p-2 bg-primary-50 relative overflow-hidden rounded-md text-center border-8 border-primary-50"
          >
            <div class="relative">
              <h2>
                Account #:
                <span class="font-extrabold">{{ user.$state.ucn }}</span>
              </h2>
            </div>
          </div>
          <div
            class="p-2 bg-primary-50 relative overflow-hidden rounded-md text-center border-8 border-primary-50"
          >
            <div class="relative">
              <h2>
                Amount Due:
                <span class="font-extrabold"
                  >{{ accountBalance }}</span
                >
              </h2>
            </div>
          </div>
        </div>
        <ul>
          <li class="md:flex md:items-center py-3 border-b border-slate-200">
            <!-- Left -->
            <div class="text-sm text-slate-800 font-medium w-1/4">
              Payment Method
            </div>
            <!-- Right -->
            <div class="text-sm text-slate-800 ml-4 w-3/4">
              <span class="mr-3"></span>
              <!--<a
                class="font-medium text-primary-500 hover:text-primary-600"
                href="#0"
                >Edit</a
              >-->
            </div>
          </li>
          <li class="md:flex md:items-center py-3 border-b border-slate-200">
            <!-- Left -->
            <div class="text-sm text-slate-800 font-medium w-1/4">
              Invoice Cycle
            </div>
            <!-- Right -->
            <div class="text-sm text-slate-800 ml-4 w-3/4">
              <span class="mr-3"
                >{{ user.$state.invoicing_cycle_type }} (day
                {{ user.$state.invoicing_cycle_day }})</span
              >
            </div>
          </li>
          <li class="md:flex md:items-center py-3 border-b border-slate-200">
            <!-- Left -->
            <div class="text-sm text-slate-800 font-medium w-1/4">
              Account Terms
            </div>
            <!-- Right -->
            <div class="text-sm text-slate-800 ml-4">
              <span class="mr-3">{{ user.$state.account_terms }}</span>
            </div>
          </li>
          <li class="md:flex md:items-center py-3 border-b border-slate-200">
            <!-- Left -->
            <div class="text-sm text-slate-800 font-medium w-1/4">
              Your Address
            </div>
            <!-- Right -->
            <div class="text-sm text-slate-800 ml-4 w-3/4">
              <span class="mr-3">{{ user.$state.full_address }}</span>
            </div>
          </li>
          <li class="md:flex md:items-center py-3 border-b border-slate-200">
            <!-- Left -->
            <div class="text-sm text-slate-800 font-medium w-1/4">
              Billing Address
            </div>
            <!-- Right -->
            <div class="text-sm text-slate-800 ml-4 w-3/4">
              <span class="mr-3">{{ user.$state.bill_full_address }}</span>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <!-- Panel footer -->
    <!--<footer>
      <div class="flex flex-col px-6 py-5 border-t border-slate-200">
        <div class="flex self-end">
          <button
            class="btn border-slate-200 hover:border-slate-300 text-slate-600"
          >
            Cancel
          </button>
          <button class="btn bg-primary-500 hover:bg-primary-600 text-white ml-3">
            Save Changes
          </button>
        </div>
      </div>
    </footer>-->
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user.js";
import numeral from "numeral";

export default {
  name: "BillingPanel",
  setup() {
    const user = useUserStore();

    const currencyWithCommas = (value) => {
      return numeral(value).format("$0,0.00");
    };

    const accountBalance = currencyWithCommas(user.$state.account_balance)

    return {
      user,
      accountBalance
    };
  },
};
</script>
