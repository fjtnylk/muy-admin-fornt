import { request, config } from 'utils'

const { api } = config
const { groups } = api

export function query(params) {
  return request({
    url: groups,
    method: 'get',
    data: params
  });
}
