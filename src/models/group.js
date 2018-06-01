import { hashHistory } from 'dva/router';
import { query } from "../services/groups";
import {parse} from "qs";

export default {
  namespace: 'groups',

  state: {
    list: [],
    total: null,
    loading: false,
    current: null,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
  },

  subscriptions: {
    setup({ dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/group') {
          dispatch({
            type: 'query',
            payload: {}
          })
        }
      })
    }
  },

  effects: {
    * query({payload}, {select, call, put}) {
      yield put({type: 'showLoading'})
      const {success, result} = yield call(query, parse(payload));
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: result.list,
            total: result.total,
            current: result.current
          }
        })
      }
    },

    * create() {
    },

    * remove() {
    },

    * update() {
    },
  },

  reducers: {
    showLoading(state, action) {
      return {...state, loading: true}
    },
    showModal() {
    },
    hideModal() {
    },
    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false};
    },
    createSuccess() {
    },
    removeSuccess() {
    },
    updateSuccess() {
    },
  },
}
