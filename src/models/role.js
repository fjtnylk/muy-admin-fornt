import { hashHistory } from 'dva/router';
import {query, save, remove, bind, bindRoleMenu} from "../services/roles";

export default {
  namespace: 'roles',

  state: {
    list: [],
    roleCode: null,
    transferList: [],
    targetKeys: [],
    total: null,
    current: null,
    pageSize: null,
    loading: false,
    modalVisible: false,
    transferVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/roles') {
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
        yield put({
          type: 'querySuccess',
          payload: {
            list: result.list,
            total: result.total,
            current: result.current,
            pageSize: result.size,
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

    * saveRoleMenu({payload}, {select, call, put}) {
      const { targetKeys, roleCode } = yield select(_ => _.roles)

      const params = {
        role_code: roleCode,
        menus: targetKeys,
      }

      const { success } = yield call(bindRoleMenu, params)
      if (success) {
        yield put({type: 'hideTransferModal'})
      }
    },

    * bindMenu({payload}, {select, call, put}) {
      const { success, result } = yield call(bind, payload)

      if (success) {
        const { source, target_keys } = result
        yield put({type: 'showTransferModal', payload: {roleCode: payload.roleCode, transferList: source, targetKeys: target_keys}})
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
    showTransferModal(state, action) {
      return {...state, ...action.payload, transferVisible: true, loading: false}
    },
    hideTransferModal(state, action) {
      return {...state, transferVisible: false, loading: false}
    },
    nextTargetKeys(state, action) {
      return {...state, targetKeys: action.payload}
    },
    querySuccess(state, action) {
      return {...state, ...action.payload, loading: false};
    },
    onCellChange(state, action) {
      return {...state, loading: false};
    },
  },
}
