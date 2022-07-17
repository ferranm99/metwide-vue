<template>
  <h3 class="mb-2 text-lg font-medium">{{ label }}</h3>
  <div class="mt-4">
    <div :class="[lgWidth]">
      <div class="w-full mb-4">
        <label class="block text-sm font-medium text-gray-700 capitalize"
          >address</label
        >
        <div class="mt-1">
          <Field name="address" v-model="address">
            <input
              ref="addressElement"
              name="address"
              id="address"
              type="text"
              @input="$emit('update:address', $event.target.value)"
              :value="address"
              placeholder="Address"
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </Field>
        </div>
        <ErrorMessage name="address" class="text-red-700 text-xs" />
      </div>
      <div class="sm:grid grid-cols-12 gap-4">
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Unit Number</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:unitNumber', $event.target.value)"
              :value="unitNumber"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Unit number suffix</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:unitNumberSuffix', $event.target.value)"
              :value="unitNumberSuffix"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Street Number</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:streetNumber', $event.target.value)"
              :value="streetNumber"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Street number suffix</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:streetNumberSuffix', $event.target.value)"
              :value="streetNumberSuffix"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Street Number 2nd</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:streetNumber2nd', $event.target.value)"
              :value="streetNumber2nd"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Street number 2nd suffix</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="
                $emit('update:streetNumber2ndSuffix', $event.target.value)
              "
              :value="streetNumber2ndSuffix"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="mb-4 col-span-12">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Street name</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:streetName', $event.target.value)"
              :value="streetName"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="mb-4 col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Street type</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:streetType', $event.target.value)"
              :value="streetType"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="mb-4 col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >Street suffix</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:streetSuffix', $event.target.value)"
              :value="streetSuffix"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-12">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >surburb</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:suburb', $event.target.value)"
              :value="suburb"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >State</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:state', $event.target.value)"
              :value="state"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div class="col-span-6">
          <label class="block text-sm font-medium text-gray-700 capitalize"
            >postcode</label
          >
          <div class="mt-1">
            <input
              type="text"
              @input="$emit('update:postcode', $event.target.value)"
              :value="postcode"
              placeholder=""
              class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    lgWidth: {
      type: String,
      default: "w-1/2",
    },
    address: {
      type: String,
      default: "",
    },
    unitNumber: {
      type: String,
      default: "",
    },
    unitNumberSuffix: {
      type: String,
      default: "",
    },
    streetNumber: {
      type: String,
      default: "",
    },
    streetNumberSuffix: {
      type: String,
      default: "",
    },
    streetNumber2nd: {
      type: String,
      default: "",
    },
    streetNumber2ndSuffix: {
      type: String,
      default: "",
    },
    streetName: {
      type: String,
      default: "",
    },
    streetType: {
      type: String,
      default: "",
    },
    streetSuffix: {
      type: String,
      default: "",
    },
    suburb: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    postcode: {
      type: String,
      default: "",
    },
    addressMetadata: {
      type: Object,
      default: null,
    },
  },

  components: {
    Field,
    ErrorMessage
  },

  setup(props, { emit }) {
    const addressElement = ref(null);

    const fullAddress = ref("");

    const addressMetadata = ref({});

    onMounted(() => {
      initAddressFinder(addressElement.value);
      // setTimeout(() => initAddressFinder(address.value), 200);
    });

    const addressFinderUpdateResult = (metaData, fullAddress) => {
      emit("update:address", fullAddress);
      emit("update:unitNumber", metaData.unit_identifier);
      // emit("update:unitNumberSuffix", metaData.unit_identifier);
      emit("update:streetNumber", metaData.street_number_1);
      //emit("update:streetNumberSuffix", metaData.unit_identifier);
      emit("update:streetNumber2nd", metaData.street_number_2);
      // emit("update:streetNumber2ndSuffix", metaData.unit_identifier);
      emit("update:streetName", metaData.street_name);
      emit("update:streetType", metaData.street_type);
      emit("update:streetSuffix", metaData.street_suffix);
      emit("update:suburb", metaData.locality_name);
      emit("update:state", metaData.state_territory);
      emit("update:postcode", metaData.postcode);
      emit("update:addressMetadata", metaData);
    };

    const initAddressFinder = (addressElement) => {
      let script = document.createElement("script");
      script.setAttribute(
        "src",
        "https://api.addressfinder.io/assets/v3/widget.js"
      );

      script.setAttribute("async", true);

      script.onload = () => {
        let widget = new AddressFinder.Widget(
          addressElement,
          "E4Y7VFGT9NK6XAJUH8CM",
          "AU",
          { address_params: {} }
        );
        widget.on("result:select", (fullAddress, metaData) => {
          addressFinderUpdateResult(metaData, fullAddress);
        });
      };

      document.head.appendChild(script);
    };

    return {
      addressElement,
      fullAddress,
      addressMetadata,
      addressFinderUpdateResult,
    };
  },
};
</script>
