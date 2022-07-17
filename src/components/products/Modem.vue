<template>
  <div class="container mx-auto">
    <div class="flex -mx-4">
      <div class="w-full md:w-1/2 p-4">
        <div
          class="c-card block shadow-md hover:shadow-md rounded-lg cursor-pointer relative"
          :class="[
            selectedModemModel === 'vr400'
              ? 'text-white bg-primary border-primary'
              : 'text-gray-600 bg-gray-100 border-gray-200',
          ]"
          @click="setModem('vr400')"
        >
          <div
            class="relative border-b pb-48 overflow-hidden"
            :class="[
              selectedModemModel === 'vr400'
                ? 'border-primary-200'
                : 'border-gray-200',
            ]"
          >
            <img
              class="absolute inset-0 h-full w-full object-contain"
              src="/img/nbn/Archer-VR400.png"
              alt=""
            />
          </div>
          <div class="p-4">
            <span
              class="inline-block py-1 leading-none text-xl font-semibold"
              :class="[
                selectedModemModel === 'vr400' ? 'text-white' : 'text-primary',
              ]"
              >Archer VR400</span
            >
            <h2 class="mt-1 mb-4 font-bold">Wireless VDSL/ADSL Modem Router</h2>
            <div class="mt-4 t:mt-0">
              <h3
                class="mt-8"
                :class="[
                  selectedModemModel === 'vr400'
                    ? 'text-white'
                    : 'text-gray-600',
                ]"
              >
                <span class="text-2xl font-extrabold">$185</span>
                <span class="text-base font-medium">/ upfront</span>
              </h3>
              <p class="text-xs -light">(Free Shipping)</p>
            </div>
          </div>
          <div
            class="p-4 border-t text-xs text-gray-700"
            :class="[
              selectedModemModel === 'vr400'
                ? 'border-primary-200'
                : 'border-gray-200',
            ]"
          >
            <div
              :class="[
                selectedModemModel === 'vr400' ? 'text-white' : 'text-gray-600',
              ]"
            >
              <ul class="text-xs list-disc">
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr400'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm"
                    >Experience superb wireless connections with 867 Mbps (5
                    GHz) + 300 Mbps (2.4 GHz) dual band WiFi</span
                  >
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr400'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Superior Range</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr400'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Versatile Connectivity</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr400'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Whole-Home Coverage with OneMesh™</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr400'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">MU-MIMO Technology</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr400'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Full Gigabit Ports</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr400'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Tether App</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-4">
        <div
          class="c-card block shadow-md hover:shadow-md rounded-lg cursor-pointer relative"
          :class="[
            selectedModemModel === 'vr2100v'
              ? 'text-white bg-primary border-primary'
              : 'text-gray-600  bg-gray-100 border-gray-200',
          ]"
          @click="setModem('vr2100v')"
        >
          <div
            class="relative border-b pb-48 overflow-hidden"
            :class="[
              selectedModemModel === 'vr2100v'
                ? 'border-primary-200'
                : 'border-gray-200',
            ]"
          >
            <img
              class="absolute inset-0 h-full w-full object-contain"
              src="/img/nbn/Archer-VR2100v.png"
              alt=""
            />
          </div>
          <div class="p-4">
            <span
              class="inline-block py-1 leading-none text-xl font-semibold"
              :class="[
                selectedModemModel === 'vr2100v'
                  ? 'text-white'
                  : 'text-primary',
              ]"
              >Archer VR2100v</span
            >
            <h2 class="mt-1 mb-4 font-bold">
              Wireless VDSL/ADSL Telephony Modem Router
            </h2>
            <div class="mt-4 t:mt-0">
              <h3
                class="mt-8"
                :class="[
                  selectedModemModel === 'vr2100v'
                    ? 'text-white'
                    : 'text-gray-600',
                ]"
              >
                <span class="text-2xl font-extrabold">$299</span>
                <span class="text-base font-medium">/ upfront</span>
              </h3>
              <p class="text-xs -light">(Free Shipping)</p>
            </div>
          </div>
          <div
            class="p-4 border-t text-xs text-gray-700"
            :class="[
              selectedModemModel === 'vr2100v'
                ? 'border-primary-200'
                : 'border-gray-200',
            ]"
          >
            <div
              :class="[
                selectedModemModel === 'vr2100v'
                  ? 'text-white'
                  : 'text-gray-600',
              ]"
            >
              <ul class="text-xs list-disc">
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr2100v'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm"
                    >The Latest Super VDSL (VDSL2 Profile 35b) tech delivers
                    internet speeds of up to 350 Mbps</span
                  >
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr2100v'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Ultra-Fast Speed</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr2100v'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">HD Telephony</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr2100v'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Whole-Home Coverage with OneMesh™</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr2100v'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">MU-MIMO Technology</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr2100v'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Lightning-Fast Wired Connection</span>
                </li>
                <li class="flex space-x-2 py-1">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    :class="[
                      selectedModemModel === 'vr2100v'
                        ? 'text-white'
                        : 'text-primary',
                    ]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span class="text-sm">Tether App</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedModemModel"],
  methods: {
    setModem(value) {
      console.log(value);
    },
  },
};
</script>

<style></style>
