import { request, config } from 'utils'

const {api} = config;
const {roles, saveRoles, deleteRoles, bindMenu, saveRoleMenu} = api;

export function query(params) {
  return request({
    url: roles,
    method: 'get',
    data: params
  })
}

export function save(params) {
  return request({
    url: saveRoles,
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: deleteRoles,
    method: 'post',
    data: params
  })
}

export function bind(params) {
  return request({
    url: bindMenu,
    method: 'get',
    data: params
  })
}

export function bindRoleMenu(params) {
  return request({
    url: saveRoleMenu,
    method: 'post',
    data: params
  })
}
