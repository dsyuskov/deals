export const CLIENT_ID = (() => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.VUE_APP_CLIENT_ID_DEV;
  }

  return process.env.VUE_APP_CLIENT_ID_PROD;
})();

export const API_KEY = process.env.VUE_APP_API_KEY;
export const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
export const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];
export const SPRED_SHEETS_ID = '1WZ_PfFA-fYr36EhDQ9l9_YOoFuIAzi7P0glrWlZPDAo';

export const CDN_ROOT =
  'https://drvdjliq91br5.cloudfront.net/merchant-logo/center-color/';

// export const DEALS_PATH = 'https://d1e0hq1qshgyf7.cloudfront.net/merchant-data/extension/deals.json?cacheblock=true';
export const DEALS_PATH = 'https://drvdjliq91br5.cloudfront.net/merchant-data/extension/deals.json?cacheblock=true';

export const DEAL_FIELDS = [
  'name',
  'merchantId',
  'expireDate',
  'title',
  'link',
  'price',
  'oldPrice',
  'discount',
  'description',
  'enabled',
];
