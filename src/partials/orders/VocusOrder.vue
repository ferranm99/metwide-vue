<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-6 space-y-6">
      <div>
        <h2 class="text-2xl text-slate-800 font-bold mb-4 capitalize">
          Vocus Orders
        </h2>
      </div>

      <!-- Billing Information -->
      <section>
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead class="text-xs uppercase text-slate-400">
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
import moment from "moment";

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
      "status",
      "provisioning state",
      "message",
      "appointment date",
      "appointment status",
    ]);
    const items = ref([
      /*  {
        id: 0,
        status: "active",
        provisioningState: "complete",
        message: "order Completed",
        appointmentDate: "13-12-2022",
        appointmentStatus: "",
      },
      {
        id: 1,
        status: "active",
        provisioningState: "in progress",
        message: "order Completed",
        appointmentDate: "13-12-2022",
        appointmentStatus: "",
      },
      {
        id: 2,
        status: "active",
        provisioningState: "in progress",
        message: "order Completed",
        appointmentDate: "13-12-2022",
        appointmentStatus: "",
      },*/
    ]);

    const getMaxIdItem = (arr) => {
      const ids = arr.map((object) => {
        return object.id;
      });

      const max = Math.max(...ids);

      const [result] = arr.filter((x) => x.id === max);

      return result;
    };

    const transactionSubstate = (idx) => {
      const vso = props.order.vocus_service_orders[idx];
      const voc = vso.vocus_order_conversations;
      const latest = getMaxIdItem(voc);
      return latest.transaction_substate;
    };

    const lastConversationMessage = (idx) => {
      const vso = props.order.vocus_service_orders[idx];
      const voc = vso.vocus_order_conversations;
      const latest = getMaxIdItem(voc);
      return latest.message;
    };

    const vocusAppointmentStart = (idx) => {
      const vso = props.order.vocus_service_orders[idx];
      const voa = vso.vocus_appointments;
      const latest = getMaxIdItem(voa);
      const startDateTime = latest
        ? moment(latest.start_date_time).utc().format("MM/DD/YYYY HH:ss A")
        : null;
      return startDateTime;
    };

    const vocusAppointmentStatus = (idx) => {
      const vso = props.order.vocus_service_orders[idx];
      const voa = vso.vocus_appointments;
      const latest = getMaxIdItem(voa);
      return latest ? latest.status : null;
    };

    const setItems = (data) => {
      data.forEach((element, index) => {
        let order = {
          id: index,
          status: element.status,
          provisioningState: transactionSubstate(index),
          message: lastConversationMessage(index),
          appointmentDate: vocusAppointmentStart(index),
          appointmentStatus: vocusAppointmentStatus(index),
        };
        items.value.push(order);
      });
    };

    setItems(props.order.vocus_service_orders);

    return {
      header,
      items,
    };
  },
};
</script>
