<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <div>
        <h2 class="text-2xl text-slate-800 font-bold mb-4 capitalize">
          Service Qualification
        </h2>
      </div>

      <!-- Billing Information -->
      <section>
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead
            class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-slate-200"
          >
            <tr class="flex flex-wrap md:table-row md:flex-no-wrap">
              <th
                v-for="(item, index) in header"
                :key="index"
                class="w-full block md:w-auto md:table-cell py-2"
              >
                <div class="font-semibold text-left">{{ item }}</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm">
            <!-- Row -->
            <tr
              v-for="(item, index) in items"
              :key="index"
              class="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0"
            >
              <td
                v-for="(value, index) in item"
                :key="index"
                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
              >
                <div class="text-left font-medium text-slate-800">
                  {{ value }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
    const header = ref([
      "id",
      "location ID",
      "address",
      "result",
      "service type",
      "service class",
      "connection type",
      "dev charge",
    ]);

    const items = ref([
     /* {
        id: 0,
        locationId: "loc0039393",
        address: "140 streen high hil",
        result: "pass",
        serviceType: "FTTP",
        serviceClass: "3",
        connectionType: "Type 1",
        devCharge: "no",
      },
      {
        id: 1,
        locationId: "loc0039393",
        address: "140 streen high hil",
        result: "pass",
        serviceType: "FTTP",
        serviceClass: "3",
        connectionType: "Type 1",
        devCharge: "no",
      },
      {
        id: 2,
        locationId: "loc0039393",
        address: "140 streen high hil",
        result: "pass",
        serviceType: "FTTP",
        serviceClass: "3",
        connectionType: "Type 1",
        devCharge: "no",
      },*/
    ]);

    const setItems = (data) => {
      data.forEach((element, index) => {
        let order = {
          id: index,
          locationId: element.location_id,
          address: element.long_address,
          result: element.result,
          serviceType: element.service_type,
          serviceClass: element.service_class,
          connectionType: element.connection_type,
          devCharge: element.development_charge ? 'YES' : 'NO',
        };
        items.value.push(order);
      });
    };

    setItems(props.order.service_qualifications)

    return {
      header,
      items,
    };
  },
};
</script>
