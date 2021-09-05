import Vue from 'vue';
import Vuex from 'vuex';

import {
  getAllList,
  getDealsFromSheet,
  getSigninStatus,
  signIn,
} from '../utils/api';
import { SPRED_SHEETS_ID } from '..//utils/constants';
import { createDealsFromSheets } from '../utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isGapiLoaded: false,
    isAuthorized: false,
    allSheets: [],
    merchantDeals: [],
  },

  mutations: {
    gapiLoaded(state) {
      state.isGapiLoaded = true;
    },
    setAllSheets(state, allSheets) {
      state.allSheets = allSheets;
    },
    setMerchantDeals(state, merchantDeals) {
      state.merchantDeals = merchantDeals;
    },
    setIsAuthorized(state, isAuthorized) {
      state.isAuthorized = isAuthorized;
    },
  },
  actions: {
    async signInAction(state) {
      const isSignIn = await signIn();

      console.log(`int_21h-isSignIn:`, isSignIn);
      state.commit('setIsAuthorized', isSignIn);

      return isSignIn;
    },
    async getSigninStatus(state) {
      const isAuthorized = await getSigninStatus();
      state.commit('setIsAuthorized', isAuthorized);

      return isAuthorized;
    },

    async getAllSheets(state) {
      const allSheets = await getAllList(SPRED_SHEETS_ID);
      state.commit('setAllSheets', allSheets);

      return allSheets;
    },

    async getValuesFromSheet(state, sheetName) {
      const rawData = await getDealsFromSheet(SPRED_SHEETS_ID, sheetName);
      const merchantDeals = createDealsFromSheets(rawData);
      state.commit('setMerchantDeals', merchantDeals);

      return merchantDeals;
    },
  },
});

export default store;
