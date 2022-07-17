<template>
  <div>
    <div class="flex items-center">
      <div v-if="selectedItems.length" class="hidden xl:block text-sm italic mr-2 whitespace-nowrap">
        <span>{{ selectedItems.length }}</span> items selected
      </div>
      <select
        v-model="selectedAction"
        id="actions"
        name="actions"
        class="block capitalize w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
      >
        <option :value="null" selected disabled>Select action</option>
        <option v-for="action in actions" :key="action">
          {{ action }}
        </option>
      </select>
      <button
        @click.stop="$emit('trigger', selectedAction)"
        class="btn bg-primary-500 hover:bg-primary-600 text-white whitespace-nowrap ml-2 capitalize"
        :disabled="!selectedItems.length"
        v-if="selectedAction !== null"
      >
        {{ selectedAction }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ModifySpeedButton",
  props: ["selectedItems", "actions"],
  setup() {
    const selectedAction = ref(null);

    return {
      selectedAction,
    };
  },
};
</script>
