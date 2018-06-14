import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import { DropOption } from 'components'
import EditableCell from '../DataTable/EditableCell'

const { confirm } = Modal

const MenuList = ({
  total, current, pageSize, loading, dataSource, handleCellChange, handleDeleteItem, handlePageChange, handleShowSizeChange
}) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      confirm({
        title: '确定删除?',
        onOk () {
          handleDeleteItem(record.id)
        },
      })
    }
  }

  const onCellChange = (item, index) => {
    return (value) => {
      item[index] = value
      handleCellChange(item)
    }
  }

  const columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'BPID',
    dataIndex: 'bpid',
    key: 'bpid',
    render: (text, record) => (
      <EditableCell value={text} onChange={onCellChange(record, 'bpid')} />
    ),
  }, {
    title: 'MPID',
    dataIndex: 'mpid',
    key: 'mpid',
    render: (text, record) => (
      <EditableCell value={text} onChange={onCellChange(record, 'mpid')} />
    ),
  }, {
    title: '图标',
    dataIndex: 'icon',
    key: 'icon',
    render: (text, record) => (
      <EditableCell value={text} onChange={onCellChange(record, 'icon')} />
    ),
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <EditableCell value={text} onChange={onCellChange(record, 'name')} />
    ),
  }, {
    title: '请求URL',
    dataIndex: 'route',
    key: 'route',
    render: (text, record) => (
      <EditableCell value={text} onChange={onCellChange(record, 'route')} />
    ),
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '删除'}]} />
    },
  }]

  const pagination = {
    total,
    current,
    pageSize,
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
        rowKey={record => record.id}
        pagination={pagination}
      />
    </div>
  )
}

MenuList.propTypes = {
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  handleCellChange: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  handlePageChange: PropTypes.func,
  handleShowSizeChange: PropTypes.func,
}

export default MenuList
