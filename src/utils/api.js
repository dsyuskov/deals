import axios from 'axios';
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
  try {
    const { data } = await axios.get(DEALS_PATH);
    return data;
  } catch (error) {
    return null;
  }
};

export const getPrice = async (payload) => {
  try {
    const { data } = await axios.post('http://127.0.0.1:3000/api/parse', payload);
    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}
