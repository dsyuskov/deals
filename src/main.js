import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './router';

Vue.config.productionTip = false;

import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES } from './utils/constants';

function initClient() {
  window.gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      async function() {
        await store.commit('gapiLoaded');
      },
      function(error) {
        console.log(error);
      }
    );
}

const getGAPI = () => {
  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/api.js';
  script.onload = () => {
    window.gapi.load('client:auth2', initClient);
  };
  document.head.appendChild(script);
};

getGAPI();

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
