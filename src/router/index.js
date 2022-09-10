import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/vehicles',
    name: 'vehicles',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/VehiclesView.vue')
  },
  {
    path: '/sellers',
    name: 'sellers',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SellersView.vue')
  },
  {
    path: '/sales',
    name: 'sales',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SalesView.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
