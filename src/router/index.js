import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../view/main.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../view/signin.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuthorized } = store.state;

  if (!isAuthorized && to.name !== 'signin') {
    next({ name: 'signin' })
  } else {
    next();
  }
});

export default router;
