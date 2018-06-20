import { request, config } from 'utils'

const { api } = config
const { users, citys, positions, saveUser, deleteUser } = api

export function query (params) {
  return request({
    url: users,
    method: 'get',
    data: params,
  })
}

export function queryPosition(params) {
  return request({
    url: positions,
    method: 'get',
    data: params,
  })
}

export function queryCitys(params) {
  return request({
    url: citys,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: deleteUser,
    method: 'post',
    data: params,
  })
}

export function save (params) {
  return request({
    url: saveUser,
    method: 'post',
    data: params,
  })
}
