import {
  API_KEY,
  CLIENT_ID,
  DISCOVERY_DOCS,
  SCOPES,
  DEAL_FIELDS,
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

const examplesDeals = (row, examples) => {
  const [key, , ...rest] = row;

  rest.forEach((exampleDeal, index) => {
    if (!isValue(exampleDeal)) {
      return;
    }

    if (key === 'name') {
      examples[index] = {
        name: formatValue(key, exampleDeal),
      }

      return;
    }

    examples[index] = {
      ...examples[index],
      [key]: {
        value: formatValue(key, exampleDeal),
        isChange: false,
      },
    }
  });

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

export const createDealsFromSheets = (rawData) => {
  const result = [];
  const isChange = false;

  let deal;

  rawData.forEach((row) => {
    if (!row.length) {
      return;
    }

    const [key, value] = row;

    if (key.includes('Deal')) {
      if (deal) {
        result.push(deal);
      }

      deal = { examples: []};
      return;
    }

    deal.examples = examplesDeals(row, deal.examples)

    if (key.includes('name')) {
      deal.name = formatValue(key, value);
      return;
    }

    if (!DEAL_FIELDS.includes(key)) {
      return;
    }

    if (!isValue(value)) {
      return;
    }

    deal[key] = {
      value: formatValue(key, value),
      isChange,
    };

  });

  result.push(deal)

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

