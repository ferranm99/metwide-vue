<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :sidebarOpen="sidebarOpen" @close-sidebar="sidebarOpen = false" />

    <!-- Content area -->
    <div
      class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden"
    >
      <!-- Site header -->
      <Header
        :sidebarOpen="sidebarOpen"
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
      />

      <main>
        <ModalBlank
          id="error-modal"
          :modalOpen="errorModalOpen"
          @close-modal="errorModalOpen = false"
        >
          <div class="p-5 flex space-x-4">
            <!-- Icon -->
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100"
            >
              <svg
                class="w-4 h-4 shrink-0 fill-current text-rose-500"
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
                  Speed change request
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>
                    {{ errorMessage }}
                  </p>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <button
                  @click.stop="errorModalOpen = false"
                  class="btn-sm bg-primary-500 hover:bg-primary-600 text-white px-8"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>
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
                  New service order - {{ form.orderType }}
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>
                    Your new {{ form.orderType }} service order has been
                    submitted for processing. Order refernece #
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
        <ModalBlankXl
          id="success-modal"
          :modalOpen="directoriesModalOpen"
          @close-modal="directoriesModalOpen = false"
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
                  Select available directory
                </div>
              </div>
              <!-- Modal content -->
              <div class="text-sm mb-10">
                <div class="space-y-2">
                  <p>There is more than one address at the location entered.</p>
                  <p class="pt-2">
                    Please select your address from the list or use a structured
                    search to refine this list. Contact support if your address
                    isn’t in this list.
                  </p>
                </div>
                <div
                  class="mt-4"
                  v-for="(directory, index) in nbnLocDirectories"
                  :key="index"
                >
                  <h3
                    class="py-2 font-semibold btn btn-secondary btn-small cursor-pointer"
                    @click.prevent="selectDirectory(index)"
                  >
                    {{ directory.AddressLong }}
                  </h3>
                </div>
              </div>
              <!-- Modal footer -->
              <div class="flex flex-wrap justify-end space-x-2">
                <button
                  @click.stop="directoriesModalOpen = false"
                  class="btn-sm bg-primary-500 hover:bg-primary-600 text-white px-8"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </ModalBlankXl>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <!-- Page header -->
          <div class="mb-8">
            <h1
              class="capitalize text-2xl md:text-3xl text-slate-800 font-bold"
            >
              Create Order
            </h1>
          </div>

          <!-- Filter -->
          <div class="sm:flex sm:justify-between sm:items-center">
            <!-- Left: Title -->

            <!-- <div>
              <div class="flex space-x-2">
                <FilterSelectPills
                  @selectedFilter="getFilter($event)"
                  v-if="user.is_reseller"
                />
              </div>
            </div>-->

            <!-- Right: Actions  -->
          </div>
          <div class="py-12 bg-white p-6 mt-10 w-full">
            <Form
              @submit="submitOrder"
              :validation-schema="schema"
              v-slot="{ errors }"
            >
              <!-- Account -->
              <div>
                <div class="flex">
                  <div class="w-56 mb-8">
                    <label class="block text-sm font-medium mb-1" for="country"
                      >Account <span class="text-rose-500">*</span></label
                    >
                    <Field
                      as="select"
                      name="title"
                      v-model="form.ucn"
                      class="form-select shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option selected>{{ user.$state.ucn }}</option>
                    </Field>
                    <div class="invalid-feedback">{{ errors.title }}</div>
                  </div>
                  <div
                    class="col-span-2 mb-8 ml-4 mt-6 bg-primary-50 rounded-md pl-2 pr-4 py-3"
                  >
                    <label class="flex items-center">
                      <input
                        @change="metwideToBilChange"
                        v-model="form.metwideToBill"
                        type="checkbox"
                        class="form-checkbox"
                      />
                      <span class="text-sm ml-2 font-medium">
                        Metwide to Bill Customer
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Customer details -->
              <div class="grid grid-cols-12 gap-x-8">
                <div class="lg:col-span-6">
                  <div
                    class="col-span-6 bg-white pb-6 my-2 rounded"
                    v-if="form.metwideToBill"
                  >
                    <label
                      for="order"
                      class="pb-6 text-sm font-semibold text-primary-500"
                      >Customer Business Details</label
                    >
                    <!-- Company name -->
                    <div class="w-full mb-4 mt-4">
                      <label
                        for="customer-company-name"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >Company name</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.customerCompanyName"
                          type="text"
                          name="customer-company-name"
                          id="customer-company-name"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <!-- Trading name -->
                    <div class="w-full mb-4 mt-4">
                      <label
                        for="trading-name"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >Trading name</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.customerTradingName"
                          type="text"
                          name="trading-name"
                          id="trading-name"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <!-- ABN -->
                    <div class="w-full mb-4 mt-4">
                      <label
                        for="customer-abn"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >ABN</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.customerABN"
                          type="text"
                          name="customer-abn"
                          id="customer-abn"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-span-6 bg-white mb-2 mt-8 rounded"
                    v-if="form.metwideToBill"
                  >
                    <label
                      for="order"
                      class="pb-6 text-sm font-semibold text-primary-500"
                      >Customer Contact Details</label
                    >
                    <div class="md:flex w-full space-x-4 mb-4 mt-4">
                      <div class="w-full">
                        <label
                          for="customer-contact-first-name"
                          class="block text-sm font-medium text-gray-700 capitalize"
                          >First name</label
                        >
                        <div class="mt-1">
                          <input
                            v-model="form.customerContactFirstName"
                            type="text"
                            name="customer-contact-first-name"
                            id="customer-contact-first-name"
                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div class="w-full">
                        <label
                          for="customer-contact-last-name"
                          class="block text-sm font-medium text-gray-700 capitalize"
                          >last name</label
                        >
                        <div class="mt-1">
                          <input
                            v-model="form.customerContactLastName"
                            type="text"
                            name="customer-contact-last-name"
                            id="customer-contact-last-name"
                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="mb-4">
                      <div class="w-full">
                        <label
                          for="customer-contact-email"
                          class="block text-sm font-medium text-gray-700 capitalize"
                          >email</label
                        >
                        <div class="mt-1">
                          <input
                            v-model="form.customerContactEmail"
                            type="email"
                            name="customer-contact-email"
                            id="customer-contact-email"
                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="md:flex w-full space-x-4 mb-4">
                      <div class="w-full">
                        <label
                          for="customer-contact-mobile-number"
                          class="block text-sm font-medium text-gray-700 capitalize"
                          >mobile number</label
                        >
                        <div class="mt-1">
                          <input
                            v-model="form.customerContactMobileNumber"
                            type="text"
                            name="customer-contact-mobile-number"
                            id="customer-contact-mobile-number"
                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div class="w-full">
                        <label
                          for="customer-contact-phone-number"
                          class="block text-sm font-medium text-gray-700 capitalize"
                          >phone number</label
                        >
                        <div class="mt-1">
                          <input
                            v-model="form.customerContactPhoneNumber"
                            type="text"
                            name="customer-contact-phone-number"
                            id="customer-contact-phone-number"
                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lg:col-span-6">
                  <div
                    class="bg-white pb-6 my-2 rounded"
                    v-if="form.metwideToBill"
                  >
                    <label
                      for="order"
                      class="pb-6 text-sm font-semibold text-primary-500"
                      >Customer Billing Address</label
                    >
                    <div>
                      <AddressFieldGroup
                        label=""
                        lgWidth="lg:w-full"
                        v-model:address="form.customerBillingAddress.address"
                        v-model:unitNumber="
                          form.customerBillingAddress.unitNumber
                        "
                        v-model:unitNumberSuffix="
                          form.customerBillingAddress.unitNumberSuffix
                        "
                        v-model:streetNumber="
                          form.customerBillingAddress.streetNumber
                        "
                        v-model:streetNumberSuffix="
                          form.customerBillingAddress.streetNumberSuffix
                        "
                        v-model:streetNumber2nd="
                          form.customerBillingAddress.streetNumber2nd
                        "
                        v-model:streetNumber2ndSuffix="
                          form.customerBillingAddress.streetNumber2ndSuffix
                        "
                        v-model:streetName="
                          form.customerBillingAddress.streetName
                        "
                        v-model:streetType="
                          form.customerBillingAddress.streetType
                        "
                        v-model:streetSuffix="
                          form.customerBillingAddress.streetSuffix
                        "
                        v-model:suburb="form.customerBillingAddress.suburb"
                        v-model:state="form.customerBillingAddress.state"
                        v-model:postcode="form.customerBillingAddress.postcode"
                        v-model:addressMetadata="
                          form.customerBillingAddress.addressMetadata
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Site and Order contact details -->
              <div class="grid grid-cols-12">
                <div class="col-span-12">
                  <div class="flex md:w-1/3 gap-x-4">
                    <div
                      class="my-3 border border-gray-100 w-full py-3 px-3 bg-primary-50 rounded-md"
                      v-for="edit in options"
                      :key="edit"
                    >
                      <!-- Start -->
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          class="form-checkbox"
                          :value="edit"
                          v-model="selectedOption"
                        />
                        <span class="text-sm ml-2 font-medium capitalize"
                          >{{ edit }} contact details</span
                        >
                      </label>
                      <!-- End -->
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-6 bg-white py-6 my-2 rounded"
                  v-if="isSite.length"
                >
                  <label
                    for="order"
                    class="pb-6 text-sm font-medium text-primary-500"
                    >Site contact details</label
                  >
                  <div class="md:flex w-full space-x-4 mb-4 mt-6">
                    <div class="w-full">
                      <label
                        for="site-contact-first-name"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >First name</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.siteContactFirstName"
                          type="text"
                          name="site-contact-first-name"
                          id="site-contact-first-name"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="w-full">
                      <label
                        for="site-contact-last-name"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >last name</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.siteContactLastName"
                          type="text"
                          name="site-contact-last-name"
                          id="site-contact-last-name"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <div class="w-full">
                      <label
                        for="site-contact-email"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >email</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.siteContactEmail"
                          type="email"
                          name="site-contact-email"
                          id="site-contact-email"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="md:flex w-full space-x-4 mb-4">
                    <div class="w-full">
                      <label
                        for="site-contact-mobile-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >mobile number</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.siteContactMobileNumber"
                          type="text"
                          name="site-contact-mobile-number"
                          id="site-contact-mobile-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="w-full">
                      <label
                        for="site-contact-phone-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >phone number</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.siteContactPhoneNumber"
                          type="text"
                          name="site-contact-phone-number"
                          id="site-contact-phone-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-6 bg-white py-6 my-2 rounded"
                  :class="{ 'ml-6': isSite.length }"
                  v-if="isOrder.length"
                >
                  <label
                    for="order"
                    class="pb-6 text-sm font-medium text-primary-500"
                    >Order contact details</label
                  >
                  <div class="md:flex w-full space-x-4 mb-4 mt-6">
                    <div class="w-full">
                      <label
                        for="order-contact-first-name"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >First name</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.orderContactFirstName"
                          type="text"
                          name="order-contact-first-name"
                          id="order-contact-first-name"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="w-full">
                      <label
                        for="order-contact-last-name"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >last name</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.orderContactLastName"
                          type="text"
                          name="order-contact-last-name"
                          id="order-contact-last-name"
                          class="shadow-sm ocus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mb-4">
                    <div class="w-full">
                      <label
                        for="order-contact-email"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >email</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.orderContactEmail"
                          type="email"
                          name="order-contact-email"
                          id="order-contact-email"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="md:flex w-full space-x-4 mb-4">
                    <div class="w-full">
                      <label
                        for="order-contact-mobile-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >mobile number</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.orderContactMobileNumber"
                          type="text"
                          name="order-contact-mobile-number"
                          id="order-contact-mobile-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="w-full">
                      <label
                        for="order-contact-phone-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >phone number</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.orderContactPhoneNumber"
                          type="text"
                          name="order-contact-phone-number"
                          id="order-contact-phone-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order type -->
              <div class="grid grid-cols-12 mt-8">
                <div class="col-span-4">
                  <label class="block text-sm font-medium mb-1" for="country"
                    >Order Type <span class="text-rose-500">*</span></label
                  >
                  <select
                    id="country"
                    class="form-select w-full"
                    v-model="form.orderType"
                  >
                    <option disabled selected>Choose an option</option>
                    <option
                      v-for="plan in [
                        'nbn',
                        'VoIP',
                        'Mobile Phone',
                        'Mobile Broadband',
                      ]"
                      :key="plan"
                    >
                      {{ plan }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- nbn order details -->
              <div
                class="col-span-12 grid grid-cols-12 mb-8 bg-white pr-6 my-6 rounded"
                v-if="form.orderType === 'nbn'"
              >
                <div class="col-span-12">
                  <div class="mb-4 w-1/4">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-1"
                      for="nbn-data-plan"
                      >Data Plan <span class="text-rose-500">*</span></label
                    >
                    <select
                      name="dataPlan"
                      as="select"
                      id="nbn-data-plan"
                      class="form-select w-full"
                      v-model="form.nbnDataPlan"
                      :class="{ 'is-invalid': errors.dataPlan }"
                    >
                      <option disabled selected>choose plan</option>
                      <option v-for="plan in nbnDataPlans" :key="plan">
                        {{ plan.name }}
                      </option>
                    </select>
                    <div class="invalid-feedback text-xs text-red-500">{{ errors.dataPlan }}</div>
                  </div>
                  <div class="flex space-x-6 my-6">
                    <div class="">
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          class="form-checkbox"
                          v-model="form.requireModem"
                        />
                        <span class="text-sm ml-2 font-medium">
                          Require Modem?
                        </span>
                      </label>
                    </div>
                    <div class="">
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          class="form-checkbox"
                          v-model="form.requireStaticIP"
                        />
                        <span class="text-sm ml-2 font-medium"
                          >Require Static IP?</span
                        >
                      </label>
                    </div>
                  </div>
                  <hr class="w-full my-3" />
                  <div class="">
                    <div class="my-4">
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          class="form-checkbox"
                          v-model="form.sqUsingAddress"
                        />
                        <span class="text-sm ml-2 font-medium">
                          SQ using address
                        </span>
                      </label>
                    </div>
                    <div v-if="form.sqUsingAddress" class="mt-6">
                      <div class="lg:w-1/2">
                        <AddressFieldGroup
                          label=""
                          lgWidth="lg:w-full"
                          v-model:address="form.nbnServiceAddress.address"
                          v-model:unitNumber="form.nbnServiceAddress.unitNumber"
                          v-model:unitNumberSuffix="
                            form.nbnServiceAddress.unitNumberSuffix
                          "
                          v-model:streetNumber="
                            form.nbnServiceAddress.streetNumber
                          "
                          v-model:streetNumberSuffix="
                            form.nbnServiceAddress.streetNumberSuffix
                          "
                          v-model:streetNumber2nd="
                            form.nbnServiceAddress.streetNumber2nd
                          "
                          v-model:streetNumber2ndSuffix="
                            form.nbnServiceAddress.streetNumber2ndSuffix
                          "
                          v-model:streetName="form.nbnServiceAddress.streetName"
                          v-model:streetType="form.nbnServiceAddress.streetType"
                          v-model:streetSuffix="
                            form.nbnServiceAddress.streetSuffix
                          "
                          v-model:suburb="form.nbnServiceAddress.suburb"
                          v-model:state="form.nbnServiceAddress.state"
                          v-model:postcode="form.nbnServiceAddress.postcode"
                          v-model:addressMetadata="
                            form.nbnServiceAddress.addressMetadata
                          "
                        />
                        <div class="mb-8">
                          <div class="mt-8 w-full flex">
                            <button
                              @click.prevent="getLocationID"
                              class="bg-primary-500 text-white rounded px-6 py-2 font-medium"
                            >
                              Get location ID
                            </button>
                            <Loading
                              class="pl-2 w-8 h-8"
                              v-if="getLocationIDLoading"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="w-full my-3" />
                  <div class="w-full flex items-end space-x-6 mt-6">
                    <div class="w-1/2">
                      <label
                        for="nbn-location"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >nbn Location ID</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.locationID"
                          type="text"
                          name="nbn-location"
                          id="nbn-location"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="w-1/2">
                      <label
                        for="fnn"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >FNN</label
                      >
                      <div class="mt-1">
                        <input
                          v-model="form.fnn"
                          type="text"
                          name="fnn"
                          id="fnn"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="w-full flex">
                      <button
                        @click.prevent="qualifyLocationID"
                        class="py-2 px-6 bg-primary-500 text-white capitalize font-medium rounded"
                      >
                        qualify
                      </button>
                      <Loading class="pl-2 w-8 h-8" v-if="qualifyLoading" />
                    </div>
                  </div>
                  <div>
                    <div v-if="nbnQualification.result" class="w-full text-sm">
                      <!-- <h1 class="pt-8 px-8 text-90 font-normal text-xl">New {{ serviceType }} NBN</h1>-->

                      <div class="py-6">
                        <div class="flex py-2 w-full">
                          <span class="w-1/3 flex-shrink-0">Result</span
                          ><span>{{ nbnQualification.result }}</span>
                        </div>
                        <div class="flex py-2 w-full">
                          <span class="w-1/3 flex-shrink-0">Service type</span
                          ><span>{{ nbnQualification.serviceType }}</span>
                        </div>
                        <div class="flex py-2 w-full">
                          <span class="w-1/3 flex-shrink-0">Service class</span
                          ><span>{{ nbnQualification.serviceClass }}</span>
                        </div>
                        <!--
            <div class="flex py-2 w-full">
                <span class="w-1/3 flex-shrink-0 ">Min ThroughPut</span><span>{{ nbnQualification.minThroughPut }}</span>
            </div>
            <div class="flex py-2 w-full">
                <span class="w-1/3 ">Max AvailableSpeed</span><span>{{ nbnQualification.maxAvailableSpeed }}</span>
            </div>
-->

                        <div class="flex py-2 w-full">
                          <span class="w-1/3 flex-shrink-0">Address</span
                          ><span>{{ nbnQualification.address }}</span>
                        </div>

                        <div class="flex py-2 w-full">
                          <span class="w-1/3 flex-shrink-0"
                            >New Development Charges</span
                          ><span>{{ nbnQualification.developmentCharge }}</span>
                        </div>

                        <table
                          v-if="nbnQualification.copperPairRecord"
                          class="table-auto w-full mt-8"
                        >
                          <!-- Table header -->
                          <thead
                            class="text-xs uppercase text-slate-700 text-semibold border-b border-primary-300"
                          >
                            <tr
                              class="flex flex-wrap md:table-row md:flex-no-wrap"
                            >
                              <th
                                class="w-full block md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">
                                  CPI ID
                                </div>
                              </th>
                              <th
                                class="w-full block md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">
                                  POTS MATCH
                                </div>
                              </th>
                              <th
                                class="w-full hidden md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">
                                  C/P Status
                                </div>
                              </th>
                              <th
                                class="w-full hidden md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">
                                  Status
                                </div>
                              </th>
                              <th
                                class="w-full hidden md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">Order</div>
                              </th>
                            </tr>
                          </thead>
                          <!-- Table body -->
                          <tbody class="text-sm">
                            <!-- Row -->
                            <tr
                              v-for="(
                                record, index
                              ) in nbnQualification.copperPairRecord"
                              :key="index"
                              class="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0"
                            >
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left">
                                  {{ record.copperPairID }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left">
                                  {{ record.potsMatch }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left">
                                  {{ record.copperPairStatus }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left font-medium">
                                  {{ record.nbnServiceStatus }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left font-medium">
                                  <input
                                    type="radio"
                                    class="form-radio"
                                    :checked="
                                      form.selectedCopperPairRecord === index
                                        ? 'checked'
                                        : false
                                    "
                                    @change="
                                      changeSelectedCopperPairRecord(index)
                                    "
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!-- nbnPortRecord -->
                        <table
                          v-if="nbnQualification.nbnPortRecord"
                          class="table-auto w-full mt-8"
                        >
                          <!-- Table header -->
                          <thead
                            class="text-xs uppercase text-slate-700 text-semibold border-b border-primary-300"
                          >
                            <tr
                              class="flex flex-wrap md:table-row md:flex-no-wrap"
                            >
                              <th
                                class="w-full block md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">NTDID</div>
                              </th>
                              <th
                                class="w-full block md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">
                                  PORT NAME
                                </div>
                              </th>
                              <th
                                class="w-full hidden md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">
                                  PORT TYPE
                                </div>
                              </th>
                              <th
                                class="w-full hidden md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">
                                  AVAILABLE
                                </div>
                              </th>
                              <th
                                class="w-full hidden md:w-auto md:table-cell py-2"
                              >
                                <div class="font-semibold text-left">Order</div>
                              </th>
                            </tr>
                          </thead>
                          <!-- Table body -->
                          <tbody class="text-sm">
                            <!-- Row -->
                            <tr
                              v-for="(
                                record, index
                              ) in nbnQualification.nbnPortRecord"
                              :key="index"
                              class="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0"
                            >
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left">
                                  {{ record.ntdid }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left">
                                  {{ record.portName }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left">
                                  {{ record.portType }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left font-medium">
                                  {{ record.available }}
                                </div>
                              </td>
                              <td
                                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
                              >
                                <div class="text-left font-medium">
                                  <input
                                    type="radio"
                                    class="form-radio"
                                    :checked="
                                      form.selectedNbnPortRecord === index
                                        ? 'checked'
                                        : false
                                    "
                                    @change="changeSelectedNbnPortRecord(index)"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- VoIP order details -->
              <div
                class="col-span-12 grid grid-cols-12 bg-white py-6 rounded"
                v-if="form.orderType === 'VoIP'"
              >
                <div class="col-span-12">
                  <div class="mb-8 w-1/4">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-1"
                      for="country"
                      >Voice Plan <span class="text-rose-500">*</span></label
                    >
                    <select
                      id="country"
                      class="form-select w-full"
                      v-model="form.voicePlan"
                    >
                      <option disabled selected>choose plan</option>
                      <option v-for="plan in voicePlans" :key="plan">
                        {{ plan.name }}
                      </option>
                    </select>
                  </div>
                  <!-- Radio -->
                  <div>
                    <div class="flex flex-wrap items-center -m-3 my-6">
                      <div class="m-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input
                            v-model="form.voipNewOrTransfer"
                            type="radio"
                            name="radio-buttons"
                            class="form-radio"
                            value="newPhoneNumber"
                          />
                          <span class="text-sm ml-2">New Number</span>
                        </label>
                        <!-- End -->
                      </div>

                      <div class="m-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input
                            v-model="form.voipNewOrTransfer"
                            type="radio"
                            name="radio-buttons"
                            class="form-radio"
                            value="portPhoneNumber"
                          />
                          <span class="text-sm ml-2">Port in a number</span>
                        </label>
                        <!-- End -->
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex flex-col my-6"
                    v-if="form.voipNewOrTransfer === 'portPhoneNumber'"
                  >
                    <div
                      class="mb-4 sm:w-1/3"
                      v-for="(phoneNumber, index) in form.phoneNumbers"
                      :key="index"
                    >
                      <label
                        for="phone-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >phone number</label
                      >
                      <div class="mt-1 flex space-x-2">
                        <input
                          v-model="phoneNumber.number"
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                        <button
                          v-show="index == form.phoneNumbers.length - 1"
                          class="text-primary-500"
                          @click.prevent="addNumber(index)"
                        >
                          <div class="flex gap-x-2">
                            <PlusCircleIcon class="w-5 h-5 text-primary" />
                          </div>
                        </button>
                        <button
                          v-show="
                            index || (!index && form.phoneNumbers.length > 1)
                          "
                          class="text-red-500"
                          @click.prevent="removeNumber(index)"
                        >
                          <div class="flex gap-x-2">
                            <MinusCircleIcon class="w-5 h-5" />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <hr class="w-full my-3" />
                  <div class="mt-8">
                    <div class="flex">
                      <div v-if="!form.knowTelstraID" class="sm:w-1/3">
                        <label
                          for="location-id"
                          class="block text-sm font-medium text-gray-700 capitalize"
                          >Telstra Location ID</label
                        >
                        <div class="mt-1">
                          <input
                            v-model="form.telstraID"
                            type="text"
                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div
                        class="col-span-2 mb-8 mt-6 bg-primary-50 rounded-md pl-4 pr-4 py-3"
                        :class="!form.knowTelstraID && 'ml-4'"
                      >
                        <label class="flex items-center">
                          <input
                            @change="knowTelstraIDChange"
                            v-model="form.knowTelstraID"
                            type="checkbox"
                            class="form-checkbox"
                          />
                          <span class="text-sm ml-2 font-medium">
                            Don't know Telstra Location ID
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div v-if="form.knowTelstraID">
                    <AddressFieldGroup
                      label="VoIP Service Address"
                      lgWidth="lg:w-full"
                      v-model:address="form.voipServiceAddress.address"
                      v-model:unitNumber="form.voipServiceAddress.unitNumber"
                      v-model:unitNumberSuffix="
                        form.voipServiceAddress.unitNumberSuffix
                      "
                      v-model:streetNumber="
                        form.voipServiceAddress.streetNumber
                      "
                      v-model:streetNumberSuffix="
                        form.voipServiceAddress.streetNumberSuffix
                      "
                      v-model:streetNumber2nd="
                        form.voipServiceAddress.streetNumber2nd
                      "
                      v-model:streetNumber2ndSuffix="
                        form.voipServiceAddress.streetNumber2ndSuffix
                      "
                      v-model:streetName="form.voipServiceAddress.streetName"
                      v-model:streetType="form.voipServiceAddress.streetType"
                      v-model:streetSuffix="
                        form.voipServiceAddress.streetSuffix
                      "
                      v-model:suburb="form.voipServiceAddress.suburb"
                      v-model:state="form.voipServiceAddress.state"
                      v-model:postcode="form.voipServiceAddress.postcode"
                    />
                  </div>
                </div>
              </div>

              <!-- Mobile phone order details -->
              <div
                class="col-span-12 grid grid-cols-12 bg-white py-6 rounded"
                v-if="form.orderType === 'Mobile Phone'"
              >
                <div class="col-span-12">
                  <div class="mb-4 w-1/4">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-1"
                      for="country"
                      >Mobile Phone Plan
                      <span class="text-rose-500">*</span></label
                    >
                    <select
                      id="country"
                      class="form-select w-full"
                      v-model="form.mobilePhonePlan"
                    >
                      <option disabled selected>choose plan</option>
                      <option v-for="plan in mobilePhonePlans" :key="plan">
                        {{ plan.name }}
                      </option>
                    </select>
                  </div>
                  <!-- Radio -->
                  <div>
                    <div class="flex flex-wrap items-center -m-3 my-6">
                      <div class="m-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input
                            v-model="form.mbpNewOrTransfer"
                            type="radio"
                            name="radio-buttons"
                            class="form-radio"
                            value="newMobileNumber"
                          />
                          <span class="text-sm ml-2">New Number</span>
                        </label>
                        <!-- End -->
                      </div>

                      <div class="m-3">
                        <!-- Start -->
                        <label class="flex items-center">
                          <input
                            v-model="form.mbpNewOrTransfer"
                            type="radio"
                            name="radio-buttons"
                            class="form-radio"
                            value="portMobileNumber"
                          />
                          <span class="text-sm ml-2">Port in a number</span>
                        </label>
                        <!-- End -->
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="form.mbpNewOrTransfer === 'portMobileNumber'"
                    class="sm:w-1/3 mt-4"
                  >
                    <div class="mb-4">
                      <label
                        for="phone-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >Current Mobile Number
                        <span class="text-red-500"> * </span>
                      </label>
                      <div class="mt-1 flex space-x-2">
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="mb-4">
                      <label
                        for="phone-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >Current Service provider
                      </label>
                      <div class="mt-1 flex space-x-2">
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div class="mb-4">
                      <label
                        for="phone-number"
                        class="block text-sm font-medium text-gray-700 capitalize"
                        >Current Account Number
                      </label>
                      <div class="mt-1 flex space-x-2">
                        <input
                          type="text"
                          name="phone-number"
                          id="phone-number"
                          class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Mobile Broadband order details -->
              <div
                class="col-span-12 grid grid-cols-12 bg-white py-6 rounded"
                v-if="form.orderType === 'Mobile Broadband'"
              >
                <div class="col-span-12">
                  <div class="mb-4 w-1/4">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-1"
                      for="country"
                      >Mobile Broadband Plan
                      <span class="text-rose-500">*</span></label
                    >
                    <select
                      id="country"
                      class="form-select w-full"
                      v-model="form.mobileBroadbandPlan"
                    >
                      <option disabled selected>choose plan</option>
                      <option v-for="plan in mobileBroadbandPlans" :key="plan">
                        {{ plan.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Submit -->
              <div class="border-t border-primary mt-8">
                <div class="w-full mt-8 flex">
                  <button
                    type="submit"
                    class="py-2 px-6 bg-primary-500 text-white capitalize font-medium rounded"
                  >
                    submit order
                  </button>
                  <Loading class="pl-2 w-8 h-8" v-if="loading" />
                </div>
              </div>
            </Form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import Sidebar from "@/partials/Sidebar.vue";
import Header from "@/partials/Header.vue";
import SearchForm from "@/components/SearchForm.vue";
import Loading from "@/components/LoadingSmall.vue";
import FilterSelectPills from "@/components/FilterSelectPills.vue";
import AddressFieldGroup from "@/components/AddressFieldGroup.vue";
import {
  TrashIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/vue/outline";
import ModalBlank from "@/components/ModalBlank.vue";
import ModalBlankXl from "@/components/ModalBlankXl.vue";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
const api = useApi();

export default {
  components: {
    Sidebar,
    Header,
    SearchForm,
    FilterSelectPills,
    TrashIcon,
    PlusCircleIcon,
    MinusCircleIcon,
    AddressFieldGroup,
    ModalBlank,
    ModalBlankXl,
    Loading,
    Form,
    Field,
    Yup,
  },

  setup() {
    const schema = Yup.object().shape({
      title: Yup.string().required("Title is required"),
      dataPlan: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last name is required"),
      dob: Yup.string()
        .required("Date of Birth is required")
        .matches(
          /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
          "Date of Birth must be a valid date in the format YYYY-MM-DD"
        ),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      acceptTerms: Yup.string().required("Accept Ts & Cs is required"),
    });

    let loading = ref(false);
    let qualifyLoading = ref(false);
    let getLocationIDLoading = ref(false);
    const user = useUserStore();
    const sidebarOpen = ref(false);
    const selectFilter = ref("all");
    const options = ref(["site", "order"]);
    const selectedOption = ref([]);
    const optionsNumber = ref(["New number", "Port in a number"]);
    const selectedNumber = ref([]);
    const sqUsingAddress = ref(false);
    const countInputs = ref([0]);
    const counter = ref(1);
    const addressMetadata = ref({});
    const successModalOpen = ref(false);
    const errorModalOpen = ref(false);
    const directoriesModalOpen = ref(false);
    let errorMessage = ref("");
    let orderReference = ref("");
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

    const nbnDataPlans = [
      {
        code: "nbn12-business",
        name: "12/1 Unlimited",
      },
      {
        code: "nbn25-business",
        name: "25/5 Unlimited",
      },
      {
        code: "nbn50-business",
        name: "50/20 Unlimited",
      },
      {
        code: "nbn100-business",
        name: "100/40 Unlimited",
      },
    ];

    const voicePlans = [
      {
        code: "Pay as You Go",
        name: "Pay as You Go",
      },
      {
        code: "Business Unlimited Call Pack",
        name: "Business Unlimited Call Pack",
      },
    ];

    const mobilePhonePlans = [];

    const mobileBroadbandPlans = [];

    const countUp = () => {
      countInputs.value.push(counter.value++);
    };
    const getFilter = (filter) => {
      selectFilter.value = filter;
    };

    const isOrder = computed(() => {
      return selectedOption.value.filter((item) => {
        return item.toLowerCase() === "order";
      });
    });
    const isSite = computed(() => {
      return selectedOption.value.filter((item) => {
        return item.toLowerCase() === "site";
      });
    });

    const form = ref({
      ucn: user.$state.ucn,
      metwideToBill: false,

      firstName: user.$state.contact_given,
      lastName: user.$state.contact_family,
      email: user.$state.email,
      phoneNumber: user.$state.work_phone
        ? user.$state.work_phone
        : user.$state.home_phone,
      mobileNumber: user.$state.mobile_phone,

      customerCompanyName: "",
      customerTradingName: "",
      customerABN: "",
      customerContactFirstName: "",
      customerContactLastName: "",
      customerContactEmail: "",
      customerContactPhoneNumber: "",
      customerContactMobileNumber: "",
      customerBillingAddress: {
        address: "",
        unitNumber: "",
        unitNumberSuffix: "",
        streetNumber: "",
        streetNumberSuffix: "",
        streetNumber2nd: "",
        streetNumber2ndSuffix: "",
        streetAddress: "",
        streetName: "",
        streetType: "",
        streetSuffix: "",
        suburb: "",
        state: "",
        postcode: "",
        addressMetadata: null,
      },

      siteContactFirstName: user.$state.contact_given,
      siteContactLastName: user.$state.contact_family,
      siteContactEmail: user.$state.email,
      siteContactPhoneNumber: user.$state.work_phone
        ? user.$state.work_phone
        : user.$state.home_phone,
      siteContactMobileNumber: user.$state.mobile_phone,

      orderContactFirstName: user.$state.contact_given,
      orderContactLastName: user.$state.contact_family,
      orderContactEmail: user.$state.email,
      orderContactPhoneNumber: user.$state.work_phone
        ? user.$state.work_phone
        : user.$state.home_phone,
      orderContactMobileNumber: user.$state.mobile_phone,

      orderType: "",
      nbnDataPlan: "",
      voicePlan: "",
      mobilePhonePlan: "",
      mobileBroadbandPlan: "",

      requireModem: "",
      requireStaticIP: "",

      nbnServiceAddress: {
        address: "",
        unitNumber: "",
        unitNumberSuffix: "",
        streetNumber: "",
        streetNumberSuffix: "",
        streetNumber2nd: "",
        streetNumber2ndSuffix: "",
        streetAddress: "",
        streetName: "",
        streetType: "",
        streetSuffix: "",
        suburb: "",
        state: "",
        postcode: "",
        addressMetadata: null,
      },

      fnn: "",
      locationID: "",
      qualifyLocation: {},

      mbpNewOrTransfer: "",
      voipNewOrTransfer: "",

      phoneNumbers: [
        {
          number: "",
        },
      ],

      telstraID: "",
      voipServiceAddress: {
        address: "",
        unitNumber: "",
        unitNumberSuffix: "",
        streetNumber: "",
        streetNumberSuffix: "",
        streetNumber2nd: "",
        streetNumber2ndSuffix: "",
        streetAddress: "",
        streetName: "",
        streetType: "",
        streetSuffix: "",
        suburb: "",
        state: "",
        postcode: "",
        addressMetadata: null,
      },

      selectedNbnPortRecord: -1,
      selectedCopperPairRecord: -1,

      knowTelstraID: false,
    });

    let nbnLocDirectories = ref(null);

    let selectedNbnDirectory = ref(null);

    const nbnQualification = ref({
      result: null,
      serviceType: "",
      serviceClass: "",
      address: "",
      developmentCharge: "",
      copperPairRecord: null,
      nbnPortRecord: null,
    });

    const changeSelectedCopperPairRecord = (value) => {
      debugger;
      if (value === form.value.selectedCopperPairRecord) {
        form.value.selectedCopperPairRecord = null;
      } else {
        form.value.selectedCopperPairRecord = value;
      }
    };

    const changeSelectedNbnPortRecord = (value) => {
      if (value === form.value.selectedNbnPortRecord) {
        form.value.selectedNbnPortRecord = null;
      } else {
        form.value.selectedNbnPortRecord = value;
      }
    };

    const setQualificationResult = (sqResult, address) => {
      form.value.qualifyLocation = sqResult;
      nbnQualification.value.result = sqResult.result;
      nbnQualification.value.serviceType = sqResult.serviceType;
      nbnQualification.value.serviceClass = sqResult.serviceClass;
      nbnQualification.value.address = address;
      nbnQualification.value.developmentCharge =
        sqResult.serviceType === "TRUE" ? "YES" : "NO";
      nbnQualification.value.nbnPortRecord = sqResult.nbnPortRecord;
      nbnQualification.value.copperPairRecord = sqResult.copperPairRecord;
    };

    const qualifyLocationID = async () => {
      qualifyLoading.value = true;
      nbnQualification.value.result = null;
      const locationID = form.value.locationID;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("nbn/ma-get-qualify-location-id", {
          locationID: locationID,
        });
        setQualificationResult(data.data.sqResult, data.data.address);
      } catch (e) {
        console.log(e);
      }
      qualifyLoading.value = false;
    };

    const getLocationID = async () => {
      getLocationIDLoading.value = true;
      nbnQualification.value.result = null;
      const locationID = form.value.locationID;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("nbn/ma-get-nbn-location-id", {
          address: form.value.nbnServiceAddress.address,
          addressMetadata: form.value.nbnServiceAddress.addressMetadata,
        });
        if (data.data.status === "success") {
          const directories = data.data.directories;
          if (directories.length === 1) {
            form.value.locationID = directories[0].DirectoryID;
          } else {
            nbnLocDirectories.value = data.data.directories;
            directoriesModalOpen.value = true;
          }
        }
      } catch (e) {
        console.log(e);
      }
      getLocationIDLoading.value = false;
    };

    const selectDirectory = (index) => {
      selectedNbnDirectory.value = nbnLocDirectories.value[index];
      form.value.locationID = selectedNbnDirectory.value.DirectoryID;
      directoriesModalOpen.value = false;
    };

    const metwideToBilChange = () => {
      form.value.metwideToBill = !form.value.metwideToBill;
      if (form.value.metwideToBill) {
        form.value.metwideToBill = false;
      } else {
        form.value.metwideToBill = true;
      }
    };

    const knowTelstraIDChange = () => {
      form.value.knowTelstraID = !form.value.knowTelstraID;
      if (form.value.knowTelstraID) {
        form.value.knowTelstraID = false;
      } else {
        form.value.knowTelstraID = true;
      }
    };

    const addNumber = (index) => {
      form.value.phoneNumbers.push({ number: "" });
    };

    const removeNumber = (index) => {
      form.value.phoneNumbers.splice(index, 1);
    };

    const submitOrder = async () => {
      loading.value = true;

      try {
        await api.get("sanctum/csrf-cookie");

        let param = Object.assign({}, form.value, nbnQualification.value);

        const res = await api.post("user/submit-new-order", param);

        if (res.data.status === "success") {
          orderReference.value = res.data.orderReference;
          resetForm();
          successModalOpen.value = true;
        } else {
          errorModalOpen.value = true;
        }
      } catch (error) {
        console.log("Error at submit-new-order: ", error.message);
        throw error;
      }
      loading.value = false;
    };

    const resetForm = () => {
      form.value.metwideToBill = false;

      form.value.customerCompanyName = "";
      form.value.customerTradingName = "";
      form.value.customerABN = "";
      form.value.customerContactFirstName = "";
      form.value.customerContactLastName = "";
      form.value.customerContactEmail = "";
      form.value.customerContactPhoneNumber = "";
      form.value.customerContactMobileNumber = "";

      for (let key in form.value.customerBillingAddress) {
        form.value.nbnServiceAddress[key] = "";
      }

      form.value.siteContactFirstName = user.$state.contact_given;
      form.value.siteContactLastName = user.$state.contact_family;
      form.value.siteContactEmail = user.$state.email;
      form.value.siteContactPhoneNumber = user.$state.work_phone
        ? user.$state.work_phone
        : user.$state.home_phone;
      form.value.siteContactMobileNumber = user.$state.mobile_phone;

      form.value.orderContactFirstName = user.$state.contact_given;
      form.value.orderContactLastName = user.$state.contact_family;
      form.value.orderContactEmail = user.$state.email;
      form.value.orderContactPhoneNumber = user.$state.work_phone
        ? user.$state.work_phone
        : user.$state.home_phone;
      form.value.orderContactMobileNumber = user.$state.mobile_phone;

      form.value.orderType = "";
      form.value.nbnDataPlan = "";
      form.value.voicePlan = "";
      form.value.mobilePhonePlan = "";
      form.value.mobileBroadbandPlan = "";

      form.value.requireModem = "";
      form.value.requireStaticIP = "";

      for (let key in form.value.nbnServiceAddress) {
        form.value.nbnServiceAddress[key] = "";
      }

      form.value.fnn = "";
      form.value.locationID = "";

      form.value.mbpNewOrTransfer = "";
      form.value.voipNewOrTransfer = "";

      form.value.phoneNumbers = [];

      form.value.telstraID = "";

      for (let key in form.value.voipServiceAddress) {
        form.value.nbnServiceAddress[key] = "";
      }

      form.value.selectedNbnPortRecord = -1;
      form.value.selectedCopperPairRecord = -1;

      form.value.knowTelstraID = false;
    };

    return {
      loading,
      qualifyLoading,
      getLocationIDLoading,
      getFilter,
      countUp,
      countInputs,
      sidebarOpen,
      selectFilter,
      filters,
      options,
      selectedOption,
      isOrder,
      isSite,
      sqUsingAddress,
      optionsNumber,
      selectedNumber,
      user,
      form,
      nbnDataPlans,
      voicePlans,
      mobilePhonePlans,
      mobileBroadbandPlans,
      qualifyLocationID,
      addressMetadata,
      //address,
      submitOrder,
      removeNumber,
      addNumber,
      successModalOpen,
      errorModalOpen,
      directoriesModalOpen,
      errorMessage,
      orderReference,
      nbnQualification,
      metwideToBilChange,
      knowTelstraIDChange,
      changeSelectedNbnPortRecord,
      changeSelectedCopperPairRecord,
      getLocationID,
      nbnLocDirectories,
      selectDirectory,
      selectedNbnDirectory,
      schema
    };
  },
};
</script>
