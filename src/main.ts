import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueLatex from "vatex";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRotateLeft,
  faCheck,
  faEnvelope,
  faXmark,
  faDivide,
  faWindowRestore,
  faEraser,
  faMagnifyingGlass,
  faPaste,
  faClipboard,
  faEdit,
  faWarning,
  faFileCsv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import VueNumberFormat from "@coders-tm/vue-number-format";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

library.add(faRotateLeft);
library.add(faCheck);
library.add(faXmark);
library.add(faDivide);
library.add(faWindowRestore);
library.add(faEraser);
library.add(faMagnifyingGlass);
library.add(faPaste);
library.add(faClipboard);
library.add(faEdit);
library.add(faWarning);
library.add(faEnvelope);
library.add(faFileCsv);

createApp(App)
  .use(router)
  .use(VueLatex)
  .use(VueNumberFormat)
  .use(ElementPlus)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
