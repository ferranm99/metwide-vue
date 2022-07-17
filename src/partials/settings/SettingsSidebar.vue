<template>
  <div
    class="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-slate-200 min-w-60 md:space-y-3"
  >
    <!-- Group 1 -->
    <div>
      <div class="text-xs font-semibold text-slate-400 uppercase mb-3">
        {{ title }}
      </div>
      <ul class="flex flex-nowrap md:block mr-3 md:mr-0">
        <li
          v-for="(link, index) in tabs"
          :key="index"
          class="mr-0.5 md:mr-0 md:mb-0.5"
        >
          <button
            @click="setActive(index)"
            class="flex items-center px-2.5 py-2 rounded whitespace-nowrap w-full capitalize"
            :class="isActive === index && 'bg-primary-50'"
          >
            <span
              class="text-sm font-medium text-slate-600"
              :class="
                isActive === index ? 'text-primary-500' : 'hover:text-slate-700'
              "
              >{{ link.title }}</span
            >
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SettingsSidebar",
  props: {
    title: {
      type: String,
      default: null,
    },
    tabs: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const isActive = ref(0);

    const setActive = (id) => {
      isActive.value = id;
      emit("activeTab", id);
    };

    return {
      setActive,
      isActive,
    };
  },
};
</script>
