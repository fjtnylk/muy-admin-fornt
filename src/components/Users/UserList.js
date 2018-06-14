import React from 'react'
import { Table,Modal} from 'antd'
import { Link } from 'react-router-dom'
import { DropOption } from 'components'
import PropTypes from 'prop-types'

const { confirm } = Modal

const UserList = ({
  onDeleteUser, onPageChange, onShowSizeChange, ...tableProps
}) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      confirm({
        title: '确定删除用户?',
        onOk () {
          onDeleteUser(record.id)
        },
      })
    }
  }

  const columns = [{
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => <Link to={`users/${record.id}`}>{text}</Link>,
  }, {
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName',
  }, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    render: text => (<span>{'M' === text ? '男' : '女'}</span>),
  }, {
    title: '联系电话',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '联系邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  }, {
    title: '操作',
    key: 'operation',
    width: 100,
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '删除' }]} />
    },
  }]

  const pagination = {
    ...tableProps.pagination,
    onChange: (page, size) => {
      onPageChange(page, size)
    },
    onShowSizeChange: (current, size) => {
      onShowSizeChange(current, size)
    },
  }

  return (
    <Table
      {...tableProps}
      bordered
      columns={columns}
      simple
      rowKey={record => record.id}
      pagination={pagination}
    />
  )
}

UserList.propTypes = {
  onDeleteUser: PropTypes.func,
  onPageChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
}

export default UserList
