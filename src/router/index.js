// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/default.vue'
import Electronics from '../views/Electronics/electronic.vue'
import NewFashions from '../views/NewFashions/NewFashion.vue'
import Notifications from '../views/Notifications/notification.vue'
import Register from '../views/Register/Register.vue'
import FavouritesView from '../views/FavouritesView.vue'
import ContactPage from '../views/ContactPage.vue'
import detail from '../views/NewFashions/detail.vue'
import Detail from "../views/NewFashions/detail.vue";
const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/Electronics', name: 'Electronics', component: Electronics },
    { path: '/Newfashions', name: 'NewFashions', component: NewFashions },
    { path: '/Notifications', name: 'Notifications', component: Notifications },
    { path: '/Register', name: 'Register', component: Register },
    { path: '/FavouritesView', name: 'FavouritesView', component: FavouritesView },
    { path: '/ContactPage', name: 'ContactPage', component: ContactPage },
    { path: '/detail', name: 'Detail', component: Detail },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router