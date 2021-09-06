import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../view/main.vue'),
    meta: {
      requireAutorized: true,
    },
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../view/signin.vue'),
    meta: {
      requireAnonimus: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const { requireAutorized } = to.meta;
  const { isAuthorized, requireAnonimus } = store.state;

  if (!isAuthorized) {
    next(requireAutorized ? { name: 'signin' } : undefined);
  } else {
    next(requireAnonimus ? { name: 'main' } : undefined);
  }
});

export default router;
