import Vue from 'vue';
import Vuex from 'vuex';
import filters from './filters';
import { compareDeal } from '../utils';

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
  createDealFromJSON,
  compareDeals,
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
    allDeals: []
  },

  mutations: {
    update(state, data) {
      Object.assign(state, data);
    },
    gapiLoaded(state) {
      state.isGapiLoaded = true;
    },
    addDeal(state, deal) {
      const index = state.allDeals.findIndex((pairDeals) => deal.name === pairDeals[0].name);
      const [devDeal] = state.allDeals[index];

      delete devDeal.isAdd;

      const newPairDeals = JSON.parse(JSON.stringify([devDeal, devDeal]))

      Vue.set(state.allDeals, index, newPairDeals);
    },
    removeDeal(state, deal) {
      const index = state.allDeals.findIndex((pairDeals) => deal.name === pairDeals[0].name);

      const [devDeal] = state.allDeals[index];

      const [newDevDeal] = JSON.parse(JSON.stringify([devDeal, devDeal]))
      compareDeal(newDevDeal, newDevDeal);
      newDevDeal.isAdd = true;

      Vue.set(state.allDeals, index, [newDevDeal, {}]);
    },
    updateDeal(state, deal) {
      const index = state.allDeals.findIndex((pairDeals) => deal.name === pairDeals[0].name);
      const [devDeal] = state.allDeals[index];

      const [newDevDeal, newProdDeal] = JSON.parse(JSON.stringify([devDeal, devDeal]))
      const newPairDeals = compareDeal(newDevDeal, newProdDeal);

      Vue.set(state.allDeals, index, newPairDeals);
    }
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
        const devDealsMerchant = await createDealsFromSheets(rawData);

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
      const rawData = await getProdDeals();
      const prodDeals = createDealFromJSON(rawData)

      state.commit('update', { prodDeals });

      return prodDeals;
    },

    async getAllDeals(state) {
      const prodDeals = await state.dispatch('getProdDeals');
      const devDeals = await state.dispatch('getDevDeals');

      const allDeals = compareDeals(devDeals, prodDeals);
      state.commit('update', { allDeals });

      return allDeals;
    }
  },
});

export default store;
