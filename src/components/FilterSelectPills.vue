<template>
  <div class="md:flex space-x-12">
    <div class="mb-4 sm:mb-0">
      <ul class="flex flex-wrap -m-1 mt-2">
        <li
          class="m-1"
          v-for="(item, index) in [
            'all',
            'my services',
            'my customers',
            'my staff',
          ]"
          :key="index"
          @click="action(item, index)"
        >
          <button
            :class="
              selectFilter[0] === item
                ? 'bg-primary-500 text-white '
                : 'bg-white text-slate-500'
            "
            class="capitalize inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 border border-transparent shadow-sm ease-in-out"
          >
            {{ item }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup(props, { emit }) {
    const selectFilter = ref(["all"]);

    const action = (item, index) => {
      selectFilter.value[0] = item;
      emit("selectedFilter", selectFilter.value);
    };
    return {
      selectFilter,
      action,
    };
  },
};
</script>
