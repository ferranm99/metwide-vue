<template>
  <div>
    <div class="rounded bg-gray-100 mb-16 relative cursor-pointer">
      <div
        class="w-8 h-8 rounded-full absolute top-0 left-0 mt-6 -ml-4 border-white border-2 flex justify-center items-center"
        :class="[
          selectedModemModel === 'vr2100v' ? 'bg-primary' : 'bg-gray-300',
        ]"
      >
        <svg
          width="20"
          height="16"
          viewBox="0 0 26 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.46973 10.4111L10.8 17.992L23.7263 2.24707"
            stroke="white"
            stroke-width="3"
          />
        </svg>
      </div>

      <h4 class="pl-8 pt-7 text-primary leading-none text-xl font-semibold">
        Archer VR2100v
        <span class="text-gray-600">Wireless VDSL/ADSL Modem Router</span>
      </h4>
      <div class="rounded p-8 bg-gray-100 mb-16">
        <div class="flex items-center">
          <div class="w-1/3 mr-4">
            <img
              class="w-48 mb-8 mb-0"
              src="/img/nbn/Archer-VR2100v.png"
              alt="Modem Archer-VR2100v"
            />
          </div>

          <div class="w-1/3 text-secondary">
            <ul class="text-secondary text-xs list-disc">
              <li class="flex space-x-2 py-1">
                <svg
                  class="flex-shrink-0 h-5 w-5 text-primary"
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
                <span class="text-sm text-gray-600"
                  >The Latest Super VDSL (VDSL2 Profile 35b) tech delivers
                  internet speeds of up to 350 Mbps</span
                >
              </li>
              <li class="flex space-x-2 py-1">
                <svg
                  class="flex-shrink-0 h-5 w-5 text-primary"
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
                <span class="text-sm text-gray-600">Ultra-Fast Speed</span>
              </li>
              <li class="flex space-x-2 py-1">
                <svg
                  class="flex-shrink-0 h-5 w-5 text-primary"
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
                <span class="text-sm text-gray-600">HD Telephony</span>
              </li>
              <li class="flex space-x-2 py-1">
                <svg
                  class="flex-shrink-0 h-5 w-5 text-primary"
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
                <span class="text-sm text-gray-600"
                  >Whole-Home Coverage with OneMesh™</span
                >
              </li>
              <li class="flex space-x-2 py-1">
                <svg
                  class="flex-shrink-0 h-5 w-5 text-primary"
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
                <span class="text-sm text-gray-600">MU-MIMO Technology</span>
              </li>
              <li class="flex space-x-2 py-1">
                <svg
                  class="flex-shrink-0 h-5 w-5 text-primary"
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
                <span class="text-sm text-gray-600"
                  >Lightning-Fast Wired Connection</span
                >
              </li>
              <li class="flex space-x-2 py-1">
                <svg
                  class="flex-shrink-0 h-5 w-5 text-primary"
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
                <span class="text-sm text-gray-600">Tether App</span>
              </li>
            </ul>
          </div>

          <div class="w-1/3 text-right">
            <h3 class="text-gray-600">
              <span class="text-2xl font-extrabold">$299</span>
              <span class="text-base font-medium">/ upfront</span>
            </h3>
            <p class="text-xs -light">(Free Shipping)</p>
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
  created() {},
};
</script>
