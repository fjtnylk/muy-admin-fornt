import { request, config } from 'utils'

const { api } = config
const { menus, allMenus, saveMenus, deleteMenus } = api

export function query (params) {
  return request({
    url: menus,
    method: 'get',
    data: params,
  })
}

export function queryAll (params) {
  return request({
    url: allMenus,
    method: 'get',
    data: params,
  })
}

export function save (params) {
  return request({
    url: saveMenus,
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: deleteMenus,
    method: 'post',
    data: params,
  })
}
