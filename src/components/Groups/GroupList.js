import React from 'react'
import PropTypes from 'prop-types'
import {Table, Modal} from 'antd'
import { DropOption } from 'components'
import EditableCell from '../DataTable/EditableCell'

const { confirm } = Modal

const GroupList = ({
total, current, pageSize, loading, dataSource, handleCellChange, handleDeleteItem, handlePageChange, handleShowSizeChange, handleBindRole
}) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      handleBindRole(record.code)
    } else if (e.key === '2') {
      confirm({
        title: '确定删除?',
        onOk () {
          handleDeleteItem(record.code)
        },
      })
    }
  }

  const onCellChange = (item, index) => {
    return (value) => {
      item[index] = value
      handleCellChange(item)
    };
  }

  const columns = [{
    title: '编码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <EditableCell value={text} onChange={onCellChange(record, 'name')} />
    ),
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    render: (text, record) => (
      <EditableCell value={text} onChange={onCellChange(record, 'remark')} />
    ),
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '所属角色'}, { key: '2', name: '删除'}]} />
    },
  }]

  const pagination = {
    total,
    current,
    pageSize: pageSize,
    showSizeChanger: true,
    onChange: (page, size) => {
      handlePageChange(page, size)
    },
    onShowSizeChange: (current, size) => {
      handleShowSizeChange(current, size)
    },
  }

  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.code}
        pagination={pagination}
      />
    </div>
  )
}

GroupList.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  handleCellChange: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleShowSizeChange: PropTypes.func,
  handleBindRole: PropTypes.func,
}

export default GroupList
