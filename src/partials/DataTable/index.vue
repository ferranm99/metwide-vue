<template>
  <div class="bg-white shadow-lg rounded-sm border border-slate-200 relative">
    <header class="px-5 py-4">
      <h2 class="font-semibold text-slate-800">
        All records
        <span class="text-slate-400 font-medium">{{
          items ? items.length : 0
        }}</span>
      </h2>
    </header>
    <div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table-auto w-full divide-y divide-slate-200">
          <!-- Table header -->
          <thead
            class="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-slate-200"
          >
            <tr>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                <div class="flex items-center">
                  <label class="inline-flex">
                    <span class="sr-only">Select all</span>
                    <input
                      class="form-checkbox"
                      type="checkbox"
                      v-model="selectAll"
                      @click="checkAll"
                    />
                  </label>
                </div>
              </th>
              <th
                v-for="(header, index) in tableHeader"
                :key="index"
                @click.prevent="$emit('sortBy', header.name)"
                class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap cursor-pointer"
              >
                <div class="">
                  <button
                    class="font-bold text-left text-md uppercase flex items-center w-full"
                  >
                    {{ header.title }}
                    <SelectorIcon class="h-5 w-4 text-slate-600" />
                  </button>
                </div>
              </th>
              <th class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <span class="sr-only">Menu</span>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <TableItem
            v-for="order in items.filter(
              (item, index) => items[index] !== 'id'
            )"
            :key="order.id"
            :navigate="navigate"
            :order="order"
            v-model:selected="selected"
            :value="order.id"
          />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import TableItem from "./TableItem.vue";
import { SelectorIcon } from "@heroicons/vue/outline";

export default {
  name: "DataTable",
  components: {
    TableItem,
    SelectorIcon,
  },
  props: ["selectedItems", "items", "tableHeader", "navigate"],
  setup(props, { emit }) {
    const selectAll = ref(false);
    const selected = ref([]);

    const checkAll = () => {
      selected.value = [];
      if (!selectAll.value) {
        selected.value = props.items.map((order) => order.id);
      }
    };

    watch(selected, () => {
      selectAll.value =
        props.items.length === selected.value.length ? true : false;
      emit("change-selection", {
        selected: selected.value,
        length: selected.value.length,
      });
    });

    return {
      selectAll,
      selected,
      checkAll,
    };
  },
};
</script>
