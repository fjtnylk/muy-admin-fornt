import { routerRedux } from 'dva/router'
import { login } from 'services/login'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const { success, message, result } = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (success) {
        const { from } = locationQuery
        yield put({ type: 'app/query', payload: { userId: result.user_id }})
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw message
      }
    },
  },

}
