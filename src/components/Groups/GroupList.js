import React from 'react'
import PropTypes from 'prop-types'
import {Table, Popconfirm} from 'antd'
import EditableCell from '../DataTable/EditableCell'


const GroupList = ({
total, current, pageSize, loading, dataSource, handleCellChange, handleDeleteItem, handlePageChange, handleShowSizeChange, handleBindRole
}) => {

  const onCellChange = (item, index) => {
    return (value) => {
      item[index] = value
      handleCellChange(item)
    };
  }

  const onDeleteItem = (code) => {
    return () => {
      handleDeleteItem(code)
    }
  }

  const onBindRole = (code) => {
    return () => {
      handleBindRole(code)
    }
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
    render: (text, record) => (
      <p>
        <a
          href="javascript:;"
          onClick={onBindRole(record.code)}
          style={{ marginRight: 12 }}
        >
          所属角色
        </a>
        <Popconfirm title="确定要删除吗？" onConfirm={onDeleteItem(record.code)}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
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
