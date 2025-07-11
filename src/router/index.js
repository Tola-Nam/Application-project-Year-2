// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/default.vue'
import CategoryDetails from '../views/Category/CategoryDetail.vue'
import NewFashions from '../views/NewFashions/NewFashion.vue'
import Notifications from '../views/Notifications/notification.vue'
import Register from '../views/Register/Register.vue'
import FavoritesView from '../views/FavouritesView.vue'
import ContactPage from '../views/ContactPage.vue'
import Detail from "../views/NewFashions/detail.vue";
const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/CategoryDetails', name: 'Category', component: CategoryDetails },
    { path: '/NewFashions', name: 'NewFashions', component: NewFashions },
    { path: '/Notifications', name: 'Notifications', component: Notifications },
    { path: '/Register', name: 'Register', component: Register },
    { path: '/FavouritesView', name: 'FavouritesView', component: FavoritesView },
    { path: '/ContactPage', name: 'ContactPage', component: ContactPage },
    { path: '/detail', name: 'Detail', component: Detail },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router