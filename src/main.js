import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";


import "./css/style.scss";

import useAuth from "./auth/useAuth";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const { attempt } = useAuth();

const pinia = createPinia()

const app = createApp(App);
app.use(pinia)
app.use(router);
app.mount("#app");
