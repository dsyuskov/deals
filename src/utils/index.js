import {
  API_KEY,
  CLIENT_ID,
  DISCOVERY_DOCS,
  SCOPES,
  DEAL_FIELDS,
  COMPARE_DEAL_FIELDS,
} from './constants';
import store from '../store';

export function initClient() {
  window.gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      async function() {
        store.commit('gapiLoaded');
      },
      function(error) {
        console.log(error);
      }
    );
}

export const urlToSave = (data) => {
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  return url;
};

const isValue = (value) => {
  return value && value !== '-';
};

const formatValue = (key, value) => {
  if (key.toLowerCase().includes('price')) {
    return `£${value}`;
  }

  return value;
};

export const createDealsFromSheets = (values) => {
  const exampleFields = ['name', 'title', 'link', 'price', 'oldPrice'];

  const result = [];
  let dealIndex;

  values.map((row) => {
    if (!row.length) return;

    const [key, value, example] = row;

    if (key.includes('Deal')) {
      dealIndex = result.push({}) - 1;
    }

    if (!DEAL_FIELDS.includes(key)) {
      return;
    }

    if (isValue(value)) {
      result[dealIndex][key] = formatValue(key, value);
    }

    if (key === 'name' && isValue(example)) {
      result[dealIndex].examples = [{}, {}, {}, {}, {}, {}];
    }

    if (exampleFields.includes(key)) {
      for (let i = 0; i < 6; i++) {
        const exampleValue = row[i + 2];

        if (isValue(exampleValue)) {
          result[dealIndex].examples[i][key] = formatValue(key, exampleValue);
        }
      }
    }
  });

  return result;
};

export const compareDeals = (devDeal, prodDeal) => {
  let result = true;
  const array = [];

  COMPARE_DEAL_FIELDS.forEach((key) => {
    if (key === 'examples' && devDeal[key]) {
      const devDealExamples = devDeal[key];
      const prodDealExamples = prodDeal[key];
      for (let i = 0; i < devDealExamples.length; i++) {
        const compareExample = compareDeals(
          devDealExamples[i],
          prodDealExamples[i]
        );
        if (compareExample.length) {
          result = false;
          array.push(key);
        }
      }

      return result;
    }

    if (devDeal[key] !== prodDeal[key]) {
      result = false;
      array.push(key);
    }
  });

  return array;
};

export const findDeal = (deal, deals) => {
  const result = deals.find((item) => item.name === deal.name);

  return result;
};

export const checkDeals = (devDeals, prodDeals) => {
  const result = [...devDeals];
  result.forEach((devDeal) => {
    const matchDeal = findDeal(devDeal, prodDeals);

    if (!matchDeal) {
      devDeal.add = true;
    } else {
      const diff = compareDeals(devDeal, matchDeal);

      devDeal.update = diff;
    }
  });
  return result;
};

export const sortDevDeals = (devDeals, prodDeals) => {
  let _devDeals = [...devDeals];
  const result = [];

  prodDeals.forEach((deal) => {
    const prodDeal = findDeal(deal, _devDeals);

    if (prodDeal) {
      result.push(prodDeal);
      _devDeals = _devDeals.filter((deal) => deal.name !== prodDeal.name);
    }
  });

  return [...result, ..._devDeals];
};
