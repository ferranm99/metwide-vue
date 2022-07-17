<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <div>
        <h2 class="text-2xl text-slate-800 font-bold mb-4 capitalize">
          Order Summary
        </h2>
      </div>

      <!-- Billing Information -->
      <section>
        <h3 class="text-xl leading-snug text-slate-700 font-bold mb-1">
          Information
        </h3>
        <ul>
          <li
            v-for="(item, name, index) in items"
            :key="index"
            class="md:flex md:justify-between md:items-center py-3 border-b border-slate-200"
          >
            <!-- Left -->
            <div class="text-sm text-slate-800 font-medium capitalize">
              {{ name }}
            </div>
            <!-- Right -->
            <div class="text-sm text-slate-800 ml-4">
              <span class="mr-3">{{ item }}</span>
            </div>
          </li>
        </ul>
      </section>

      <!-- credentials -->
      <section>
        <h3 class="text-xl leading-snug text-slate-800 font-bold mb-1">
          Credentials
        </h3>
        <!-- list -->
        <ul>
          <template v-for="(item, name, index) in credentials" :key="index">
            <li
              v-if="name === 'password' || name === 'user name'"
              class="md:flex md:justify-between md:items-center py-3 border-b border-slate-200"
            >
              <!-- Left -->
              <div class="text-sm text-slate-800 font-medium capitalize">
                {{ name }}
              </div>
              <!-- Right -->
              <div class="text-sm text-slate-800 ml-4">
                <span class="mr-3">{{ item }}</span>
              </div>
            </li>
          </template>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "OrderSummary",
  props: {
    order: {
      type: Object,
      default: {},
    },
  },
  setup(props, context) {
    const items = ref({
      "Order reference": props.order.service_order_reference,
      "provision status": props.order.provisioning_status,
      "location ID": props.order.location_id,
      "full address": props.order.full_address,
      "data plan": props.order.data_plan.name,
      "support plan": props.order.support_package_plan,
      "static IP": props.order.require_static_ip ? "YES" : "NO",
      "Order type": props.order.transfer_service
        ? "Transfer"
        : "New Connection",
      "connection type": props.order.connection_type,
      "montly plan fee (inc GST)": props.order.monthly_plan_fee,
    });

    const credentials = ref({
      "user name": props.order.username,
      password: props.order.password,
    });

    return {
      items,
      credentials,
    };
  },
};
</script>
