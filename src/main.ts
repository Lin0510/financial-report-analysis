import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";

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

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
