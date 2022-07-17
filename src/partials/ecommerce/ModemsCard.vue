<template>
  <ModalBlank
    id="success-modal"
    :modalOpen="successModalOpen"
    @close-modal="successModalOpen = false"
  >
    <div class="p-5 flex space-x-4">
      <!-- Icon -->
      <div
        class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-primary-100"
      >
        <svg
          class="w-4 h-4 shrink-0 fill-current text-primary-500"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zM7 11.4L3.6 8 5 6.6l2 2 4-4L12.4 6 7 11.4z"
          />
        </svg>
      </div>
      <!-- Content -->
      <div>
        <!-- Modal header -->
        <div class="mb-2">
          <div class="text-lg font-semibold text-slate-800">
            Modem Order
          </div>
        </div>
        <!-- Modal content -->
        <div class="text-sm mb-10">
          <div class="space-y-2">
            <p>
              Thank you for ordering a modem {{ modemModels[form.selectedModemModel] }}. Your order reference #
              {{ orderReference }}.
            </p>
          </div>
        </div>
        <!-- Modal footer -->
        <div class="flex flex-wrap justify-end space-x-2">
          <button
            @click.stop="successModalOpen = false"
            class="btn-sm bg-primary-500 hover:bg-primary-600 text-white px-8"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </ModalBlank>
  <ModalBasic
    id="add-user-modal"
    :modalOpen="deliveryInfoModalOpen"
    @close-modal="deliveryInfoModalOpen = false"
    title="Delivery details"
  >
    <form v-on:submit.prevent="addAccountUser" class="p-4">
      <!-- Modal content -->
      <div class="px-8 py-8">
        <div class="md:grid grid-cols-12 gap-4">
          <div class="col-span-6">
            <label
              class="block text-sm font-medium mb-1 capitalize"
              for="first-name"
              >first name <span class="text-rose-500">*</span></label
            >
            <input
              v-model="form.deliveryFirstName"
              id="first-name"
              class="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
          <div class="col-span-6">
            <label
              class="block text-sm font-medium mb-1 capitalize"
              for="last-name"
              >last name <span class="text-rose-500">*</span></label
            >
            <input
              v-model="form.deliveryLastName"
              id="last-name"
              class="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
          <div class="col-span-12">
            <label
              class="block text-sm font-medium mb-1 capitalize"
              for="streetAddress"
              >street address <span class="text-rose-500">*</span></label
            >
            <input
              v-model="form.streetAddress"
              id="streetAddress"
              class="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
          <div class="col-span-12">
            <label
              class="block text-sm font-medium mb-1 capitalize"
              for="suburb"
              >suburb <span class="text-rose-500">*</span></label
            >
            <input
              v-model="form.suburb"
              id="suburb"
              class="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
          <div class="col-span-6">
            <label class="block text-sm font-medium mb-1 capitalize" for="state"
              >State <span class="text-rose-500">*</span></label
            >
            <input
              v-model="form.postcode"
              id="state"
              class="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
          <div class="col-span-6">
            <label
              class="block text-sm font-medium mb-1 capitalize"
              for="postcode"
              >postcode
            </label>
            <input
              v-model="form.state"
              id="postcode"
              class="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
        </div>
      </div>
      <!-- Modal footer -->
      <div class="px-5 py-4">
        <div class="flex flex-wrap justify-end space-x-2">
          <button
            class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
            @click.stop="deliveryInfoModalOpen = false"
          >
            Cancel
          </button>
          <button
            @click="submitModemOrder"
            class="btn-sm bg-primary-500 hover:bg-primary-600 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </ModalBasic>
  <!-- Card 1 -->
  <div
    class="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden"
  >
    <div class="flex flex-col h-full">
      <!-- Image -->
      <img
        class="w-60"
        src="@/images/ecommerce/modems/Archer-VR400.png"
        width="auto"
        height="60"
        alt="Archer-VR400"
      />
      <!-- Card Content -->
      <div class="grow flex flex-col p-5">
        <!-- Card body -->
        <div class="grow">
          <!-- Header -->
          <header class="mb-3">
            <h3 class="text-xl text-primary font-semibold">Archer VR400</h3>
            <h3 class="text-sm text-slate-600 font-semibold">
              Wireless VDSL/ADSL Modem Router
            </h3>
          </header>
          <!-- Rating and price -->
          <div class="flex flex-wrap justify-between items-center mb-4">
            <!-- Price -->
            <div>
              <div class="mt-4 t:mt-0">
                <h3 class="mt-8 text-gray-600 text-center">
                  <span class="text-2xl font-extrabold">$185</span>
                  <span class="text-base font-medium">/ upfront</span>
                </h3>
                <p class="text-xs -light">(Free Shipping)</p>
              </div>
            </div>
          </div>
          <!-- Features list -->
          <ul class="text-sm space-y-2 mb-5">
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>
                Experience superb wireless connections with 867 Mbps (5 GHz) +
                300 Mbps (2.4 GHz) dual band WiFi
              </div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Superior Range</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Versatile Connectivity</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Whole-Home Coverage with OneMesh™</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>MU-MIMO Technology</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Full Gigabit Ports</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Tether App</div>
            </li>
          </ul>
        </div>
        <!-- Card footer -->
        <div>
          <button
            class="btn-sm w-full bg-primary-500 hover:bg-primary-600 text-white"
            @click.stop="prepareModemOrder('vr400')"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Card 2 -->
  <div
    class="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden"
  >
    <div class="flex flex-col h-full">
      <!-- Image -->
      <img
        class="w-60"
        src="@/images/ecommerce/modems/Archer-VR2100v.png"
        width="286"
        height="160"
        alt="Application 01"
      />
      <!-- Card Content -->
      <div class="grow flex flex-col p-5">
        <!-- Card body -->
        <div class="grow">
          <!-- Header -->
          <header class="mb-3">
            <h3 class="text-xl text-primary font-semibold">Archer VR2100v</h3>
            <h4 class="text-sm text-slate-600 font-semibold">
              Wireless VDSL/ADSL Telephony Modem Router
            </h4>
          </header>
          <!-- Rating and price -->
          <div class="flex flex-wrap justify-between items-center mb-4">
            <!-- Price -->
            <div>
              <div class="mt-4 t:mt-0">
                <h3 class="mt-8 text-gray-600">
                  <span class="text-2xl font-extrabold">$299</span>
                  <span class="text-base font-medium">/ upfront</span>
                </h3>
                <p class="text-xs -light">(Free Shipping)</p>
              </div>
            </div>
          </div>
          <!-- Features list -->
          <ul class="text-sm space-y-2 mb-5">
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>
                The Latest Super VDSL (VDSL2 Profile 35b) tech delivers internet
                speeds of up to 350 Mbps
              </div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Ultra-Fast Speed</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>HD Telephony</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Whole-Home Coverage with OneMesh™</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>MU-MIMO Technology</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Lightning-Fast Wired Connection</div>
            </li>
            <li class="flex space-x-2">
              <CheckIcon class="w-6 h-6 text-primary flex flex-shrink-0" />
              <div>Tether App</div>
            </li>
          </ul>
        </div>
        <!-- Card footer -->
        <div>
          <button
            class="btn-sm w-full bg-primary-500 hover:bg-primary-600 text-white"
            @click.stop="prepareModemOrder('vr2100v')"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { CheckIcon } from "@heroicons/vue/outline";
import Loading from "@/components/LoadingSmall.vue";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
import ButtonPage from "../../pages/component/ButtonPage.vue";
import ModalBasic from "../../components/ModalBasic.vue";
import ModalBlank from "../../components/ModalBlank.vue";

const api = useApi();

export default {
  name: "ModemsCard",
  components: {
    CheckIcon,
    ButtonPage,
    ModalBasic,
    ModalBlank,
  },
  setup() {
    let loading = ref(false);
    const successModalOpen = ref(false);
    const user = useUserStore();
    const deliveryInfoModalOpen = ref(false);
    const orderReference = ref("");

    const modemModels = ref({
      vr400: "Archer VR400",
      vr2100v: "Archer VR2100v",
    });

    const form = ref({
      deliveryFirstName: null,
      deliveryLastName: null,
      streetAddress: null,
      suburb: null,
      state: null,
      postcode: null,
      selectedModemModel: null,
      orderType: "Modem",
      firstName: user.$state.contact_given,
      lastName: user.$state.contact_family,
      email: user.$state.email,
      phoneNumber: null,
      mobileNumber: null,
      site: "My Account",
      ucn: user.$state.ucn,
    });

    const submitModemOrder = async () => {
      loading.value = true;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/submit-modem-order", form.value);
        if (data.data.status === 'success') {
          orderReference.value = data.data.orderReference
          deliveryInfoModalOpen.value = false;
          successModalOpen.value = true
        }
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    const prepareModemOrder = (modem) => {
      form.value.selectedModemModel = modem;
      deliveryInfoModalOpen.value = true;
    };

    return {
      prepareModemOrder,
      submitModemOrder,
      deliveryInfoModalOpen,
      form,
      successModalOpen,
      modemModels,
      orderReference
    };
  },
};
</script>
