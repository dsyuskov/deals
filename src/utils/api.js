import { DEALS_PATH } from './constants';

export const getAllList = async (spreadsheetId) => {
  const response = await window.gapi.client.sheets.spreadsheets.get({
    spreadsheetId,
  });

  const { sheets } = response.result;

  if (sheets) {
    const result = sheets.map((item) => {
      const { sheetId, title } = item.properties;
      return { sheetId, title };
    });

    return result;
  }

  return [];
};

export const getDealsFromSheet = async (spreadsheetId, sheetName) => {
  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}`,
  });

  const { values } = response.result;

  if (values) {
    return values;
  }

  return [];
};

export const getSigninStatus = () => {
  return window.gapi.auth2.getAuthInstance().isSignedIn.get();
};

export const signIn = () => {
  return window.gapi.auth2.getAuthInstance().signIn();
};

export const getProdDeals = async () => {
  const response = await fetch(DEALS_PATH);

  if (response.ok) {
    const prodDeals = await response.json();
    return prodDeals;
  }

  return null;
};
