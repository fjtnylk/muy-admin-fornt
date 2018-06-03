import { request, config } from 'utils'

const { api } = config
const { groups, saveGroups, deleteGroups } = api

export function query(params) {
  return request({
    url: groups,
    method: 'get',
    data: params
  });
}

export function save(params) {
  return request({
    url: saveGroups,
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: deleteGroups,
    method: 'post',
    data: params
  })
}

