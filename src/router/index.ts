import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import FinancialReport from "../components/FinancialReport.vue";
import Moat from "../components/Moat.vue";
import Risk from "../components/Risk.vue";
import Instructions from "../components/Instructions.vue";
import Reits from "../components/RealEstateInvestmentTrust.vue";
// import Test from "../components/Test.vue";
import Bank from "../components/Bank.vue";
import Roi from "../components/RoiCalculator.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Instructions,
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   component: Test,
  // },
  {
    path: "/instructions",
    name: "instructions",
    component: Instructions,
  },
  {
    path: "/report",
    name: "report",
    component: FinancialReport,
  },
  {
    path: "/moat",
    name: "moat",
    component: Moat,
  },
  {
    path: "/risk",
    name: "risk",
    component: Risk,
  },
  {
    path: "/reits",
    name: "reits",
    component: Reits,
  },
  {
    path: "/bank",
    name: "bank",
    component: Bank,
  },
  {
    path: "/roi",
    name: "roi",
    component: Roi,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
