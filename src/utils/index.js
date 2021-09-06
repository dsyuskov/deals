import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES } from './constants';
import store from '../store';

export function initClient() {
  console.log(`int_21h: initClient`);
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

  if (key === 'name') {
    return value.replaceAll('%', '-percent');
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
