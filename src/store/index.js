import Vue from 'vue';
import Vuex from 'vuex';

import {
  getAllList,
  getDealsFromSheet,
  getSigninStatus,
  signIn,
  getProdDeals,
} from '../utils/api';
import { SPRED_SHEETS_ID } from '../utils/constants';
import { createDealsFromSheets } from '../utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isGapiLoaded: false,
    isAuthorized: false,
    allSheets: [],
    devDeals: [],
    prodDeals: [],
  },

  mutations: {
    update(state, data) {
      Object.assign(state, data);
    },
    gapiLoaded(state) {
      state.isGapiLoaded = true;
    },
  },
  actions: {
    async signInAction(state) {
      const isSignIn = await signIn();

      state.commit('update', { isSignIn });

      return isSignIn;
    },
    async getSigninStatus(state) {
      const isAuthorized = await getSigninStatus();
      state.commit('update', { isAuthorized });

      return isAuthorized;
    },

    async getAllSheets(state) {
      const allSheets = await getAllList(SPRED_SHEETS_ID);
      state.commit('update', { allSheets });

      return allSheets;
    },

    async getValuesFromSheet(state, sheetName) {
      const rawData = await getDealsFromSheet(SPRED_SHEETS_ID, sheetName);
      const devDeals = createDealsFromSheets(rawData);
      state.commit('update', { devDeals });

      return devDeals;
    },

    async getProdDeals(state) {
      const prodDeals = await getProdDeals();
      state.commit('update', { prodDeals });

      return prodDeals;
    },
  },
});

export default store;
