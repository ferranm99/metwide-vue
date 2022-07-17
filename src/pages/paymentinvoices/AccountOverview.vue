<template>
  <div>
    <div class="sm:flex sm:justify-between sm:items-center mb-8">
      <!-- Left: Title -->
      <div>
        <!-- <div class="mb-4">
          <h1 class="capitalize text-2xl md:text-3xl text-slate-800 font-bold">
            Payments & Invoices
          </h1>
        </div> -->
        <!-- <div class="flex space-x-2">
          <FilterSelect
            @selectedFilter="getFilter($event)"
            :filterItems="filters.views"
          />
        </div> -->
      </div>
    </div>

    <!-- Content -->
    <div class="bg-white shadow-lg rounded-sm mb-8">
      <div class="flex flex-col md:flex-row md:-mr-px">
        <!-- <SettingsSidebar /> -->
        <BillingPanel />
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import SearchForm from "@/components/SearchForm.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import BillingPanel from "@/partials/settings/BillingPanel.vue";
export default {
  components: {
    SearchForm,
    FilterSelect,
    BillingPanel,
  },
  setup() {
    const selectFilter = ref("all");
    const filters = {
      views: [
        {
          id: 0,
          name: "views",
        },
        {
          id: 1,
          name: "all",
        },
        {
          id: 2,
          name: "my services",
        },
        {
          id: 3,
          name: "my customers",
        },
        {
          id: 4,
          name: "my staff",
        },
      ],
    };

    const selectTab = (id) => {
      selectedTab.value = id;
    };

    return {
      selectFilter,
      selectTab,
      filters,
    };
  },
};
</script>
