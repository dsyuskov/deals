import {
  API_KEY,
  CLIENT_ID,
  DISCOVERY_DOCS,
  SCOPES,
  DEAL_FIELDS,
} from './constants';
import store from '../store';
import { getPrice } from './api';

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

const isValue = (value) => {
  return value && value !== '-';
};

const formatValue = (key, value) => {
  if (!value) {
    return null;
  }

  const _value = value.trim();

  if (key === 'name') {
    return _value.replaceAll('%', '-percent')
  }

  if (key.toLowerCase().includes('price')) {
    return `£${_value}`;
  }

  if (key === 'discount') {
    return Number.parseFloat(_value);
  }

  if (key === 'enabled') {
    return !!_value;
  }

  return _value;
};

export const examplesDeals = async(row, examples, discount) => {
  const [key, value, ...rest] = row;

  const deals = [...rest]

  if ( !key.includes('selector') && !isValue(deals[0]) ) return examples;

  for (let i = 0; i < 6; i++) {
    const index = i;
    const exampleValue = deals[i];


    if (key === 'name') {
      examples[index] = {
        name: formatValue(key, exampleValue),
      }

      continue;
    }

    if (key.toLowerCase().includes('price')) {
      continue;
    }

    if (key.includes('selector') && examples[index]) {
      const dealUrl = await getUrlToParse(examples[index].link.value);
      const price = await getPrice({ url: dealUrl, selector: value });
      console.log(`int_21h-price:`, price);
      if (price) {
        examples[index] = {
          ...examples[index],
          oldPrice: {
            value: formatValue('price', price.toFixed(2)),
            isChange: false,
          },
        }

        const discount1 = parseFloat(discount.value);

        const newPrice = (price - (price * discount1 / 100)).toFixed(2);

        examples[index] = {
          ...examples[index],
          price: {
            value: formatValue('price', newPrice),
            isChange: false,
          },
        }
      }
    }

    if (!key.includes('selector')) {
      examples[index] = {
        ...examples[index],
        [key]: {
          value: formatValue(key, exampleValue),
          isChange: false,
        },
      }
    }
  }

  return examples;
}

export const createDealFromJSON = (rawData) => {
  const result = [];

  rawData.forEach((item) => {
    const deal = { examples: [] };

    Object.entries(item).forEach(([key, value]) => {
      if (key === 'name') {
        deal.name = value;
        return;
      }

      if (key === 'examples') {
        deal.examples = createDealFromJSON(item[key]);
        return;
      }

      deal[key] = { value, isChange: false };
    });

    result.push(deal)
  });

  return result;
}

export const createDealsFromSheets = async (rawData) => {
  const result = [];
  const isChange = false;

  let deal;

  for (const row of rawData) {
    if (!row.length) {
      continue;
    }

    const [key, value] = row;

    if (key.includes('Deal')) {
      if (deal) {
        result.push(deal);
      }

      deal = { examples: []};
      continue;
    }

    deal.examples = await examplesDeals(row, deal.examples, deal.discount)

    if (key.includes('name')) {
      deal.name = formatValue(key, value);
      continue;
    }

    // if (!DEAL_FIELDS.includes(key)) {
    //   continue;
    // }

    if (!isValue(value)) {
      continue;
    }

    if (key.toLowerCase().includes('price')) {
      continue;
    }

    if (key.includes('selector')) {
      const dealUrl = await getUrlToParse(deal.link.value);
      const price = await getPrice({ url: dealUrl, selector: value });
      console.log(`int_21h-price:`, price);
      if (price) {
        deal.oldPrice = {
          value: formatValue('price', price.toFixed(2)),
          isChange,
        }

        const discount = parseFloat(deal.discount.value);
        const newPrice = (price - (price * discount / 100)).toFixed(2);

        deal.price = {
          value: formatValue('price', newPrice),
          isChange,
        }
      }
    }

    deal[key] = {
      value: formatValue(key, value),
      isChange,
    };
  }

  result.push(deal)
  console.log(`int_21h-result:`, result);
  return result;
}

export const compareDeal = (dealA, dealB) => {
  Object.entries(dealA).forEach(([key]) => {
    if (key === 'name' || key === 'isChange') {
      return;
    }

    if (key === 'examples') {
      compareDeals(dealA[key], dealB[key]);
      return;
    }

    try {
      if (dealA[key].value !== dealB[key].value) {
        dealA[key].isChange = true;
        dealB[key].isChange = true;
      } else {
        dealA[key].isChange = false;
        dealB[key].isChange = false;
      }
    } catch (e) {
      console.error(e);
    }
  });
  dealA.isChange = isChangedDeal(dealA);
  dealB.isChange = isChangedDeal(dealB);

  return [dealA, dealB];
}

export const compareDeals = (dealsA, dealsB) => {
  const result = [];

  dealsA.forEach((dealA) => {
    const dealB = dealsB.find((deal) => dealA.name === deal.name);
    if (dealB) {
      result.push(compareDeal(dealA, dealB))
    } else {
      dealA.isAdd = true;
      result.push([dealA, {}])
    }
  });

  return result;
}

export const urlToSave = (data) => {
  const preparedDeals = exportDeals(data);

  const json = JSON.stringify(preparedDeals);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  return url;
};

const exportDeals = (pairDeals) => {
  const exportDeals = pairDeals.filter(([, exportDeal]) => exportDeal.name);

  const result = exportDeals.map(([,deal]) => prepareExportDeal(deal));

  return result;
}

const prepareExportDeal = (deal) => {
  const result = {}

  DEAL_FIELDS.forEach((key) => {
    if (!deal[key]) {
      return;
    }

    if (key === 'examples') {
      if (deal[key].length > 0) {
        result[key] = prepareDealExamples(deal[key]);
      }

      return;
    }

    result[key] = deal[key]?.value || deal[key];
  });

  return result;
}

const prepareDealExamples = (examples) => {
  return examples.map((deal) => prepareExportDeal(deal));
}

export const isChangedDeal = (deal) => {
  const array = Object.entries(deal);

  for (let i = 0; i < array.length; i++) {
    const [key] = array[i];

    if (deal[key]?.isChange) {
      return true;
    }

    if (key === 'examples') {
      const isChangedExamples = deal[key].map((deal) => isChangedDeal(deal)).some((item) => item === true);

      if (isChangedExamples) {
        return true;
      }
    }
  }

  return false;
}


export const getUrlToParse = (url) => {
  const params = {};
  const hashes = url.slice(url.indexOf('?')+1).split('&');

  hashes.map((hash) => {
    const [key, value] = hash.split('=');
    params[key] = value;
  });

  return decodeURIComponent(params?.ued);
}