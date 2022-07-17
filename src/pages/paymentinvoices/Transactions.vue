<template>
  <div>
    <div class="sm:flex sm:justify-between sm:items-center mb-8"></div>
    <section class="bg-white shadow-lg rounded-sm mb-8 p-6 space-y-6">
      <div class="sm:flex sm:justify-between sm:items-center">
        <div class="flex items-center space-x-4">
          <label for="date" class="text-sm font-semibold text-slate-500">
            Search by date:
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="date"
              @change="startDate = $event.target.value"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
          <span>to</span>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="date"
              @change="endDate = $event.target.value"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </div>
        <div class="flex space-x-2 pr-8">
          <FilterSelectPills
            @selectedFilter="getFilter($event)"
            v-if="user.is_reseller"
          />
        </div>
      </div>
      <!-- Table -->

      <h3 class="text-xl leading-snug text-slate-800 font-bold mb-1">
        Transaction history
      </h3>
      <table class="table-auto w-full">
        <!-- Table header -->
        <thead
          class="text-xs font-semibold uppercase text-slate-500 border-b border-primary-300"
        >
          <tr class="flex flex-wrap md:table-row md:flex-no-wrap">
            <th class="w-full block md:w-auto md:table-cell py-2">
              <div class="font-semibold text-left">Name</div>
            </th>
            <th class="w-full block md:w-auto md:table-cell py-2">
              <div class="font-semibold text-left">Date</div>
            </th>
            <th class="w-full hidden md:w-auto md:table-cell py-2">
              <div class="font-semibold text-left">Number</div>
            </th>
            <th class="w-full hidden md:w-auto md:table-cell py-2">
              <div class="font-semibold text-left">Description</div>
            </th>
            <th class="w-full hidden md:w-auto md:table-cell py-2">
              <div class="font-semibold text-left">Amount</div>
            </th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody class="text-sm">
          <!-- Row -->
          <tr
            v-for="transaction in filteredTransactions"
            :key="transaction.id"
            class="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0"
          >
            <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
              <div class="text-left font-medium text-slate-800">
                {{ transaction.name }}
              </div>
            </td>
            <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
              <div class="text-left font-medium text-slate-800">
                {{ transaction.transactionDate }}
              </div>
            </td>
            <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
              <div class="text-left">{{ transaction.transactionNo }}</div>
            </td>
            <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
              <div class="text-left font-medium">
                {{ transaction.description }}
              </div>
            </td>
            <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
              <div class="text-left font-medium">{{ transaction.amount }}</div>
            </td>
          </tr>
          <!-- <template v-for="transaction in transactions" :key="transaction.id">
            <tr
              v-if="filterDate(transaction.transactionDate)"
              class="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0"
            >
              <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                <div class="text-left font-medium text-slate-800">
                  {{ transaction.transactionDate }}
                </div>
              </td>
              <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                <div class="text-left">{{ transaction.transactionNo }}</div>
              </td>
              <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                <div class="text-left font-medium">
                  {{ transaction.description }}
                </div>
              </td>
              <td class="w-full block md:w-auto md:table-cell py-0.5 md:py-2">
                <div class="text-left font-medium">
                  {{ transaction.amount }}
                </div>
              </td>
            </tr>
          </template> -->
        </tbody>
      </table>
    </section>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import SearchForm from "@/components/SearchForm.vue";
import FilterSelect from "@/components/FilterSelect.vue";
import BillingPanel from "@/partials/settings/BillingPanel.vue";
import FilterSelectPills from "@/components/FilterSelectPills.vue";
import { useUserStore } from "@/stores/user.js";
import moment from "moment";
import numeral from "numeral";
import { useApi } from "@/api/useAPI";
const api = useApi();

export default {
  components: {
    SearchForm,
    FilterSelect,
    BillingPanel,
    FilterSelectPills,
  },
  setup() {
    const user = useUserStore();
    const startDate = ref(null);
    const endDate = ref(null);
    const selectFilter = ref(["all"]);
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

    const transactions = ref([]);

    const setTransactions = (data) => {
      transactions.value = [];
      data.forEach((element) => {
        let transaction = {
          name: element.name,
          transactionDate: moment(element.entry_date).format("DD-MMM-YYYY"),
          transactionNo: element.transaction_number,
          description: element.transaction_type,
          amount: currencyWithCommas(element.amount),
          id: element.id.toString(),
          customer: element.ucn === user.$state.ucn ? false : true,
        };
        transactions.value.push(transaction);
      });
    };

    const filterTransactionsByDate = computed(() => {
      let start = startDate.value,
        end = endDate.value;
      return transactions.value
        .filter((data) => {
          if (start === null && end === null) {
            return true;
          }
          var date = moment(data.transactionDate).format("YYYY-MM-DD");
          return date >= start && date <= end;
        })
        .sort(
          (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
        );
    });

    const fetchTransactions = async (accountUCN) => {
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-transactions", {
          ucn: ucn,
        });
        setTransactions(data.data);
      } catch (e) {
        ed;
        console.log(e);
      }
    };

    fetchTransactions(user.$state.ucn);

    const filteredTransactions = computed(() => {
      let arr = selectFilter.value.map((el) => el.toLowerCase());
      if (search.value) {
        return filterTransactionsByDate.value.filter((item) => {
          return (
            item.cname.toLowerCase().includes(search.value.toLowerCase()) ||
            item.address.toLowerCase().includes(search.value.toLowerCase())
          );
        });
      } else {
        for (let index = 0; index < selectFilter.value.length; index++) {
          if (selectFilter.value.includes("all")) {
            return filterTransactionsByDate.value;
          } else if (selectFilter.value.includes("my services")) {
            return filterTransactionsByDate.value.filter((item) => {
              return !item.customer;
            });
          } else if (selectFilter.value.includes("my customers")) {
            return filterTransactionsByDate.value.filter((item) => {
              return item.customer;
            });
          } else {
            return filterTransactionsByDate.value.filter((item) => {
              return (
                arr.includes(item.service.toLowerCase()) ||
                arr.includes(item.serviceType.toLowerCase())
              );
            });
          }
        }
      }
    });

    const getFilter = (filter) => {
      selectFilter.value = filter;
      let arr = selectFilter.value.map((el) => el.toLowerCase());
    };

    const selectTab = (id) => {
      selectedTab.value = id;
    };

    const currencyWithCommas = (value) => {
      return numeral(value).format("$0,0.00");
    };

    const filterDate = (transactionDate) => {
      return true;
    };

    return {
      selectFilter,
      selectTab,
      filters,
      startDate,
      endDate,
      transactions,
      user,
      currencyWithCommas,
      filterTransactionsByDate,
      filteredTransactions,
      getFilter
    };
  },
};
</script>
