
const Mock = require('mockjs')
const config = require('../utils/config')

const { apiPrefix } = config

let database = {
  total: 14,
  current: 1,
  list: [
    {
      code: 'R00',
      name: '管理员',
      remark: '管理员',
    },
    {
      code: 'R90',
      name: '游客',
      remark: '游客',
    },
    {
      code: 'R21',
      name: '行政人员',
      remark: '行政人员',
    },
    {
      code: 'R22',
      name: '董事办',
      remark: '董事办',
    },
    {
      code: 'R31',
      name: '前端开发',
      remark: '前端开发',
    },
    {
      code: 'R32',
      name: '后端开发',
      remark: '后端开发',
    },
    {
      code: 'R33',
      name: '大数据开发',
      remark: '大数据开发',
    },
    {
      code: 'R34',
      name: '产品经理',
      remark: '产品经理',
    },
    {
      code: 'R35',
      name: '架构师',
      remark: '架构师',
    },
    {
      code: 'R41',
      name: '出纳',
      remark: '出纳',
    },
    {
      code: 'R42',
      name: '会计',
      remark: '会计',
    },
    {
      code: 'R51',
      name: '线上运营',
      remark: '线上运营',
    },
    {
      code: 'R52',
      name: '线下运营',
      remark: '线下运营',
    },
    {
      code: 'R53',
      name: '文案',
      remark: '文案',
    },
  ]
}

module.exports = {
  [`GET ${apiPrefix}/roles`] (req, res) {
    res.json({ code: 200, message: 'ok', result: database })
  },
}
