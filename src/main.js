import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import "bootstrap-icons/font/bootstrap-icons.css";
import 'sweetalert2/dist/sweetalert2.min.css'

createApp(App).use(router).mount('#app')

