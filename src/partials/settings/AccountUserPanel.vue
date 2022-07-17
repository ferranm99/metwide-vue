<template>
  <div class="grow">
    <!-- Panel body -->
    <div class="p-8 space-y-8">
      <ModalBlank
        id="info-modal"
        :modalOpen="infoModalOpen"
        @close-modal="infoModalOpen = false"
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
                d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm1 12H7V7h2v5zM8 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"
              />
            </svg>
          </div>
          <!-- Content -->
          <div>
            <!-- Modal header -->
            <div class="mb-2">
              <div class="text-lg font-semibold text-slate-800">
                Add a new account user
              </div>
            </div>
            <!-- Modal content -->
            <div class="text-sm mb-10">
              <div class="space-y-2">
                <p>A user with the provided email address already exists.</p>
              </div>
            </div>
            <!-- Modal footer -->
            <div class="flex flex-wrap justify-end space-x-2">
              <button
                @click.stop="infoModalOpen = false"
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
        :modalOpen="addUserModalOpen"
        @close-modal="addUserModalOpen = false"
        title="Add User"
      >
        <Form
          ref="form"
          @submit="addAccountUser"
          :validation-schema="schema"
          v-slot="{ errors }"
        >
          <!-- Modal content -->
          <div class="px-8 py-8">
            <div class="md:grid grid-cols-12 gap-4">
              <div class="col-span-6">
                <label
                  class="block text-sm font-medium mb-1 capitalize"
                  for="first-name"
                  >first name <span class="text-rose-500">*</span></label
                >
                <Field
                  name="firstName"
                  id="first-name"
                  class="form-input w-full px-2 py-1"
                  :class="{ 'is-invalid': errors.firstName }"
                  type="text"
                />
                <div class="pt-1 text-xs text-red-500">
                  {{ errors.firstName }}
                </div>
              </div>
              <div class="col-span-6">
                <label
                  class="block text-sm font-medium mb-1 capitalize"
                  for="last-name"
                  >last name <span class="text-rose-500">*</span></label
                >
                <Field
                  name="lastName"
                  type="text"
                  class="form-input w-full px-2 py-1"
                  :class="{ 'is-invalid': errors.lastName }"
                />
                <div class="pt-1 text-xs text-red-500">
                  {{ errors.lastName }}
                </div>
              </div>
              <div class="col-span-12">
                <label
                  class="block text-sm font-medium mb-1 capitalize"
                  for="position"
                  >position <span class="text-rose-500">*</span></label
                >
                <Field
                  name="position"
                  id="position"
                  class="form-input w-full px-2 py-1"
                  type="text"
                />
                <div class="pt-1 text-xs text-red-500">
                  {{ errors.position }}
                </div>
              </div>
              <div class="col-span-12">
                <label
                  class="block text-sm font-medium mb-1 capitalize"
                  for="email"
                  >Email <span class="text-rose-500">*</span></label
                >
                <Field
                  name="email"
                  id="email"
                  class="form-input w-full px-2 py-1"
                  type="email"
                />
                <div class="pt-1 text-xs text-red-500">{{ errors.email }}</div>
              </div>
              <div class="col-span-6">
                <label
                  class="block text-sm font-medium mb-1 capitalize"
                  for="mobileNumber"
                  >mobile number <span class="text-rose-500">*</span></label
                >
                <Field
                  name="mobileNumber"
                  id="mobileNumber"
                  class="form-input w-full px-2 py-1"
                  type="number"
                />
                <div class="pt-1 text-xs text-red-500">
                  {{ errors.mobileNumber }}
                </div>
              </div>
              <div class="col-span-6">
                <label
                  class="block text-sm font-medium mb-1 capitalize"
                  for="phone-number"
                  >phone number
                </label>
                <Field
                  name="phoneNumber"
                  id="phone-number"
                  class="form-input w-full px-2 py-1"
                  type="number"
                />
                <div class="pt-1 text-xs text-red-500">
                  {{ errors.phoneNumber }}
                </div>
              </div>
              <div class="col-span-12">
                <label
                  class="block text-sm font-medium mb-1 capitalize"
                  for="passworx"
                  >password <span class="text-rose-500">*</span></label
                >
                <Field
                  name="password"
                  id="passworx"
                  class="form-input w-full px-2 py-1"
                  type="password"
                />
                <div class="pt-1 text-xs text-red-500">
                  {{ errors.password }}
                </div>
              </div>
            </div>
          </div>
          <!-- Modal footer -->
          <div class="px-5 py-4">
            <div class="flex flex-wrap justify-end space-x-2">
              <button
                class="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                @click.prevent="reset"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn-sm bg-primary-500 hover:bg-primary-600 text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </ModalBasic>
      <div class="flex justify-between">
        <h2 class="text-2xl text-slate-800 font-bold mb-4 capitalize">
          Account Users
        </h2>
        <button
          @click.stop="addUserModalOpen = true"
          class="btn bg-primary-500 hover:bg-primary-600 text-white"
        >
          <svg
            class="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path
              d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"
            />
          </svg>
          <span class="hidden xs:block ml-2">Add user</span>
        </button>
      </div>

      <!-- Billing Information -->
      <section>
        <table class="table-auto w-full">
          <!-- Table header -->
          <thead
            class="text-xs uppercase text-slate-400 border-b border-primary"
          >
            <tr class="flex flex-wrap md:table-row md:flex-no-wrap">
              <th
                v-for="(item, index) in header"
                :key="index"
                class="w-full block md:w-auto md:table-cell py-2"
              >
                <div class="font-semibold text-left">{{ item }}</div>
              </th>
            </tr>
          </thead>
          <!-- Table body -->
          <tbody class="text-sm">
            <!-- Row -->
            <tr
              v-for="(item, index) in accountUsers"
              :key="index"
              class="flex flex-wrap md:table-row md:flex-no-wrap border-b border-slate-200 py-2 md:py-0"
            >
              <td
                v-for="(value, index) in item"
                :key="index"
                class="w-full block md:w-auto md:table-cell py-0.5 md:py-2"
              >
                <div class="text-left font-medium text-slate-800">
                  {{ value }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ModalBasic from "@/components/ModalBasic.vue";
import ModalBlank from "@/components/ModalBlank.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import { useUserStore } from "@/stores/user.js";
import { useApi } from "@/api/useAPI";
const api = useApi();

export default {
  name: "AccountUserPanel",
  components: {
    ModalBasic,
    ModalBlank,
    Form,
    Field,
    ErrorMessage,
  },
  setup(context) {
    const form = ref(null);
    let loading = ref(false);
    const addUserModalOpen = ref(false);
    const infoModalOpen = ref(false);
    const user = useUserStore();
    const header = ref([
      "id",
      "first name",
      "last name",
      "position",
      "account owner",
      "email",
      "phone number",
      "mobile number",
    ]);
    const accountUsers = ref([]);
    const userFields = ref({
      firstName: null,
      lastName: null,
      position: null,
      accountOwner: null,
      email: null,
      phoneNumber: null,
      mobileNumber: null,
      password: null,
      ucn: user.$state.ucn,
    });

    const setAccountUsers = (data) => {
      accountUsers.value = [];
      data.forEach((element, index) => {
        let accountUser = {
          id: index,
          firstName: element.first_name,
          lastName: element.last_name,
          position: element.position,
          accountOwner: element.account_owner ? "Yes" : "No",
          email: element.email,
          phoneNumber: element.phone_number,
          password: element.mobile_number,
        };
        accountUsers.value.push(accountUser);
      });
    };

    const fetchAccountUsers = async (accountUCN) => {
      loading.value = true;
      let ucn = accountUCN;
      await api.get("sanctum/csrf-cookie");
      try {
        const data = await api.post("user/get-account-users", {
          ucn: ucn,
        });
        setAccountUsers(data.data);
      } catch (e) {
        console.log(e);
      }
      loading.value = false;
    };

    const addAccountUser = async (values, { resetForm }) => {
      values["ucn"] = user.$state.ucn;
      loading.value = true;
      console.log('Here');
      try {
        await api.get("sanctum/csrf-cookie");

        const res = await api.post("user/add-account-user", values);
        if (res.data === "Exists") {
          addUserModalOpen.value = false;
          infoModalOpen.value = true;
        } else {
          fetchAccountUsers(user.$state.ucn);
          resetForm();
          addUserModalOpen.value = false;
        }
      } catch (error) {
        console.log("Error at login: ", error.message);
        throw error;
      }
      loading.value = false;
    };

    fetchAccountUsers(user.$state.ucn);

    const schema = Yup.object().shape({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last name is required"),
      position: Yup.string().required("Position is required"),
      mobileNumber: Yup.string().required("Mobile number is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    });

    function onSubmit(values) {
      // display form values on success
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
    }

    function reset() {
      addUserModalOpen.value = false;
      form.value.resetForm();
    }

    return {
      header,
      accountUsers,
      addUserModalOpen,
      infoModalOpen,
      userFields,
      addAccountUser,
      schema,
      onSubmit,
      reset,
      form,
    };
  },
};
</script>
