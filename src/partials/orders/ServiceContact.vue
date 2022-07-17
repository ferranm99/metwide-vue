<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <div>
        <h2 class="text-2xl text-slate-800 font-bold mb-4 capitalize">
          service contact
        </h2>
      </div>

      <!-- Billing Information -->
      <section>
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
      "first name": props.order.service_contact_first_name,
      "last name": props.order.service_contact_last_name,
      "phone number": props.order.service_contact_phone_number,
      "mobile number": props.order.service_contact_mobile_number,
      "email": props.order.service_contact_email,
    });

    return {
      items,
    };
  },
};
</script>
