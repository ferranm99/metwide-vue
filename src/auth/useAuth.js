import axios from "axios";

import { reactive, computed, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

const state = reactive({
  authenticated: false,
  user: {},
});

export default function useAuth() {
  const router = useRouter();
  
  const errors = ref({});

  const getAuthenticated = computed(() => state.authenticated);

  const getUser = computed(() => state.user);

  const setAuthenticated = (authenticated) => {
    state.authenticated = authenticated;
  };

  const setUser = (user) => {
    state.user = user;
  };

  const attempt = async () => {
    try {
      let response = await axios.get("api/v1/user");
      setAuthenticated(true);
      setUser(response.data);
      return response;
    } catch (error) {
      setAuthenticated(false);
      setUser({});
    }
  };

  const login = async (credentials) => {
    await axios.get("api/v1/sanctum/csrf-cookie");

    try {
      await axios.post("/api/v1/login", credentials);
      attempt();
      router.push('/');
    } catch (e) {
        console.log(e);
        if (e.response.status === 422) {
            errors.value = e.response.data.errors
        }
    }
  };

  return {
    login,
    attempt,
    getAuthenticated,
    getUser,
    errors,
  };
}
