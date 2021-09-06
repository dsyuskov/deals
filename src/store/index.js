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
    merchantsId: [],
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

    async getDevDeals(state) {
      const templateSheetId = 951277191;
      const allSheets = await store.dispatch('getAllSheets');
      let devDeals = [];

      const filtredSheets = allSheets.filter((deal) => deal.sheetId !== templateSheetId);

      const promises = filtredSheets.map(async (sheet) => {
        const rawData = await getDealsFromSheet(SPRED_SHEETS_ID, sheet.title);
        const devDealsMerchant = createDealsFromSheets(rawData);
        devDeals = [...devDeals, ...devDealsMerchant];
      });

      await Promise.all(promises);

      state.commit('update', { devDeals });

      const merchantsId = new Set();
      devDeals.forEach((deal) => merchantsId.add(deal.merchantId));
      state.commit('update', { merchantsId: Array.from(merchantsId) });

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
