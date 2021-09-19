import Vue from 'vue';
import Vuex from 'vuex';
import filters from './filters';

import {
  getAllList,
  getDealsFromSheet,
  getSigninStatus,
  signIn,
  getProdDeals,
} from '../utils/api';
import { SPRED_SHEETS_ID } from '../utils/constants';
import {
  createDealsFromSheets,
  checkDeals,
  findDeal,
  sortDevDeals,
} from '../utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    filters,
  },
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
    addDeal(state, deal) {
      const mathProdDeal = findDeal(deal, this.state.prodDeals);
      if (!mathProdDeal) {
        deal.add = false;
        delete deal.add;
        state.prodDeals.unshift(deal);
      }
    },
    removeDeal(state, deal) {
      const result = this.state.prodDeals.filter(
        (item) => item.name != deal.name
      );
      this.state.prodDeals = [...result];
    },
    updateDeal(state, deal) {
      const mathProdDeal = findDeal(deal, this.state.prodDeals);

      if (mathProdDeal) {
        deal.update = false;
        delete deal.add;

        Object.entries(deal).forEach(([key, value]) => {
          if (Array.isArray(mathProdDeal[key])) {
            mathProdDeal[key] = [...value];
          } else {
            mathProdDeal[key] = value;
          }
        });
      }
    },
  },
  actions: {
    async signInAction(state) {
      await signIn();
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
      const excludeSheetId = [951277191, 589431268];

      const allSheets = await store.dispatch('getAllSheets');
      let devDeals = [];

      const filtredSheets = allSheets.filter(
        (deal) => !excludeSheetId.includes(deal.sheetId)
      );

      const promises = filtredSheets.map(async (sheet) => {
        const rawData = await getDealsFromSheet(SPRED_SHEETS_ID, sheet.title);
        const devDealsMerchant = createDealsFromSheets(rawData);
        devDeals = [...devDeals, ...devDealsMerchant];
      });

      await Promise.all(promises);

      devDeals = sortDevDeals(devDeals, this.state.prodDeals);
      const checkedDevDeals = checkDeals(devDeals, this.state.prodDeals);
      state.commit('update', { devDeals: checkedDevDeals });

      const merchantsId = new Set();
      checkedDevDeals.forEach((deal) => merchantsId.add(deal.merchantId));
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
