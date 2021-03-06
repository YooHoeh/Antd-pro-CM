import { historySiteSearch, historyInverterSearch, getSiteListWithPosition, getInverterListWithPosition } from '../services/api';

export default {
  namespace: 'chart',

  state: {
    siteListWithPosition: [],
    inverterListWithPosition: [],
    inverterInfo: {},
    inverterData: [],
    siteInfo: {},
    siteData: [],
  },

  effects: {
    *fetchSiteListWithPosition(_, { call, put }) {
      const response = yield call(getSiteListWithPosition);
      yield put({
        type: 'save',
        payload: {
          siteListWithPosition: response,
        },
      });
    },
    *fetchInverterListWithPosition(_, { call, put }) {
      const response = yield call(getInverterListWithPosition);
      yield put({
        type: 'save',
        payload: {
          inverterListWithPosition: response,
        },
      });
    },
    *fetchHistorySiteSearchData(filter, { call, put }) {
      const response = yield call(historySiteSearch, filter);
      yield put({
        type: 'save',
        payload: {
          siteInfo: response.info[0],
          siteData: response.list,
        },
      });
    },
    *fetchHistoryInverterSearchData(filter, { call, put }) {
      const response = yield call(historyInverterSearch, filter);
      yield put({
        type: 'save',
        payload: {
          inverterInfo: response.info,
          inverterData: response.list,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
