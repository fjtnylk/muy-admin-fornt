
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let database = {
  total: 4,
  current: 1,
  list: [
    {
      code: 'G10',
      name: '董事局',
      remark: '董事局所属组',
    },
    {
      code: 'G20',
      name: '人事部',
      remark: '人事部所属组',
    },
    {
      code: 'G30',
      name: '技术部',
      remark: '技术部所属组',
    },
    {
      code: 'G40',
      name: '财务部',
      remark: '财务部所属组',
    },
    {
      code: 'G50',
      name: '运营部',
      remark: '运营部所属组',
    },
  ]
}

module.exports = {
  [`GET ${apiPrefix}/groups`] (req, res) {
    res.json({ code: 200, message: 'ok', result: database })
  },
}
