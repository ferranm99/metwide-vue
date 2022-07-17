import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "./pages/Dashboard.vue";
import MyAccount from "./pages/Account.vue";
import Orders from "./pages/orders/index.vue";
import OrderSlug from "./pages/orders/_slug.vue";
import Customers from "./pages/customers/index.vue";
import CustomerSlug from "./pages/customers/_slug.vue";
import Subscriptions from "./pages/subscriptions/index.vue";
import SubscriptionsSlug from "./pages/subscriptions/_slug.vue";
import nbn from "./pages/nbn/index.vue";
import nbnSlug from "./pages/nbn/_slug.vue";
import LogFault from "./pages/services/LogFault.vue";
import NetworkStatus from "./pages/services/network-status/index.vue";
import NetworkStatusSlug from "./pages/services/network-status/_slug.vue";
import CreateOrder from "./pages/services/create-order/index.vue";
import Invoices from "./pages/paymentinvoices/index.vue";
import Account from "./pages/settings/Account.vue";
import Notifications from "./pages/settings/Notifications.vue";
import Apps from "./pages/settings/Apps.vue";
import Plans from "./pages/settings/Plans.vue";
import Billing from "./pages/settings/Billing.vue";
import Feedback from "./pages/settings/Feedback.vue";
import EmptyState from "./pages/utility/EmptyState.vue";
import PageNotFound from "./pages/utility/PageNotFound.vue";
import Login from "./pages/Login.vue";
import Signup from "./pages/Signup.vue";
import ResetPassword from "./pages/ResetPassword.vue"; 
import ForgotPassword from "./pages/ForgotPassword.vue"; 
import ButtonPage from "./pages/component/ButtonPage.vue";
import FormPage from "./pages/component/FormPage.vue";
import DropdownPage from "./pages/component/DropdownPage.vue";
import AlertPage from "./pages/component/AlertPage.vue";
import ModalPage from "./pages/component/ModalPage.vue";
import PaginationPage from "./pages/component/PaginationPage.vue";
import TabsPage from "./pages/component/TabsPage.vue";
import BreadcrumbPage from "./pages/component/BreadcrumbPage.vue";
import BadgePage from "./pages/component/BadgePage.vue";
import AvatarPage from "./pages/component/AvatarPage.vue";
import TooltipPage from "./pages/component/TooltipPage.vue";
import AccordionPage from "./pages/component/AccordionPage.vue";
import IconsPage from "./pages/component/IconsPage.vue";
import Support from "./pages/Support.vue";
import Shop from "./pages/ecommerce/Shop.vue"

const routerHistory = createWebHistory();

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (JSON.parse(localStorage.getItem("AUTH_STATE"))) isAuthenticated = true;
  else isAuthenticated = false;
  
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next(); // go to '/login';
  }
}

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Dashboard,
      beforeEnter: guardMyroute,
    },
    {
      path: "/account",
      component: MyAccount,
      beforeEnter: guardMyroute,
    },
    {
      path: "/support",
      component: Support,
      beforeEnter: guardMyroute,
    },
    {
      path: "/orders",
      component: Orders,
      beforeEnter: guardMyroute,
    },
    {
      path: "/orders/:slug",
      component: OrderSlug,
      beforeEnter: guardMyroute,
    },
    {
      path: "/customers",
      component: Customers,
      beforeEnter: guardMyroute,
    },
    {
      path: "/customers/:slug",
      component: CustomerSlug,
      beforeEnter: guardMyroute,
    },
    {
      path: "/subscriptions",
      component: Subscriptions,
      beforeEnter: guardMyroute,
    },
    {
      path: "/subscriptions/:slug",
      component: SubscriptionsSlug,
      beforeEnter: guardMyroute,
    },
    {
      path: "/nbn",
      component: nbn,
      beforeEnter: guardMyroute,
    },
    {
      path: "/nbn/:slug",
      component: nbnSlug,
      beforeEnter: guardMyroute,
    },
    {
      path: "/services/log-fault",
      component: LogFault,
      beforeEnter: guardMyroute,
    },
    {
      path: "/services/network-status",
      component: NetworkStatus,
      beforeEnter: guardMyroute,
    },
    {
      path: "/services/network-status/:slug",
      component: NetworkStatusSlug,
      beforeEnter: guardMyroute,
    },
    {
      path: "/services/create-order",
      component: CreateOrder,
      beforeEnter: guardMyroute,
    },
    {
      path: "/invoices",
      component: Invoices,
      beforeEnter: guardMyroute,
    },
    {
      path: "/settings/account",
      component: Account,
      beforeEnter: guardMyroute,
    },
    {
      path: "/settings/notifications",
      component: Notifications,
      beforeEnter: guardMyroute,
    },
    {
      path: "/settings/apps",
      component: Apps,
      beforeEnter: guardMyroute,
    },
    {
      path: "/settings/plans",
      component: Plans,
      beforeEnter: guardMyroute,
    },
    {
      path: "/settings/billing",
      component: Billing,
      beforeEnter: guardMyroute,
    },
    {
      path: "/e-commerce/shop",
      component: Shop,
      beforeEnter: guardMyroute,
    },
    {
      path: "/settings/feedback",
      component: Feedback,
      beforeEnter: guardMyroute,
    },
    {
      path: "/utility/empty-state",
      component: EmptyState,
      beforeEnter: guardMyroute,
    },
    {
      path: "/utility/404",
      component: PageNotFound,
      beforeEnter: guardMyroute,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/login/reset-password",
      component: ResetPassword,
    },
    {
      path: "/forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/component/button",
      component: ButtonPage,
    },
    {
      path: "/component/form",
      component: FormPage,
    },
    {
      path: "/component/dropdown",
      component: DropdownPage,
    },
    {
      path: "/component/alert",
      component: AlertPage,
    },
    {
      path: "/component/modal",
      component: ModalPage,
    },
    {
      path: "/component/pagination",
      component: PaginationPage,
    },
    {
      path: "/component/tabs",
      component: TabsPage,
    },
    {
      path: "/component/breadcrumb",
      component: BreadcrumbPage,
    },
    {
      path: "/component/badge",
      component: BadgePage,
    },
    {
      path: "/component/avatar",
      component: AvatarPage,
    },
    {
      path: "/component/tooltip",
      component: TooltipPage,
    },
    {
      path: "/component/accordion",
      component: AccordionPage,
    },
    {
      path: "/component/icons",
      component: IconsPage,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PageNotFound,
    },
  ],
});

export default router;
