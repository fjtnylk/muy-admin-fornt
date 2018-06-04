import { hashHistory } from 'dva/router'
import { query, save, remove } from '../services/menus'

export default {
  namespace: 'menus',

  state: {
    list: [],
    total: null,
    current: null,
    pageSize: null,
    loading: false,
    modalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/menus') {
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

      const {success, result} = yield call(query, payload);

      if (success) {
        const { list, total ,current, size} = result

        yield put({
          type: 'querySuccess',
          payload: {
            list: list,
            total: total,
            current: current,
            pageSize: size,
          }
        })
      }
    },

    * create({payload}, {select, call, put}) {
      yield put({type: 'showModal'})
    },

    * remove({ payload }, { select, call, put }) {
      const { success } = yield call(remove, payload)

      if (success) {
        yield put({
          type: 'query',
          payload: {}
        })
      }
    },

    * save({payload}, {select, call, put}) {
      const { success } = yield call(save, payload)

      if (success) {
        yield put({type: 'onCellChange', payload: payload})
        yield put({type: 'hideModal'})
      }
    },
  },

  reducers: {
    showLoading(state, action) {
      return {...state, loading: true}
    },
    hideLoading(state, action) {
      return {...state, loading: false}
    },
    showModal(state, action) {
      return {...state, modalVisible: true, loading: false}
    },
    hideModal(state, action) {
      return {...state, modalVisible: false, loading: false}
    },
    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false};
    },
    onCellChange(state, action) {
      return {...state, loading: false};
    },
  },
}
