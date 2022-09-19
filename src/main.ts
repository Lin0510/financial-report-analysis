import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faRotateLeft);

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
