/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import * as usersService from 'services/users'
import { pageModel } from './common'

const { query, queryCitys, queryPosition, save, remove } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'users',

  state: {
    modalVisible: false,
    city: [],
    position: [],
    loading: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/users') {
          const payload = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      yield put({type: 'showLoading'})

      const { success, result } = yield call(query, payload)

      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: result.list,
            pagination: {
              current: Number(result.current) || 1,
              pageSize: Number(result.size) || 10,
              total: result.total,
            },
          },
        })
      }
    },

    * queryCitys ({ payload = {} }, { call, put }) {
      const { success, result } = yield call(queryCitys, payload)

      if (success) {
        yield put({
          type: 'success',
          payload: {
            city: result,
          },
        })
      }
    },

    * queryPosition ({ payload = {} }, { call, put }) {
      const { success, result } = yield call(queryPosition, payload)

      if (success) {
        yield put({
          type: 'success',
          payload: {
            position: result,
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      yield put({type: 'showLoading'})

      const { success } = yield call(remove, payload)
      if (success) {
        yield put({
          type: 'success',
          payload: {},
        })
      } else {
        throw data
      }
    },

    * save ({ payload }, { call, put }) {
      const { success } = yield call(save, payload)
      if (success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

  },

  reducers: {
    showLoading(state, { payload }) {
      return {...state, loading: true}
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true, loading: false }
    },

    hideModal (state) {
      return { ...state, modalVisible: false, loading: false }
    },

  },
})
