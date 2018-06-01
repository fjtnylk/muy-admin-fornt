import React from 'react';
import PropTypes from 'prop-types';
import {Table, message, Popconfirm} from 'antd';


const GroupList = ({
total, current, loading, dataSource,
}) => {

  const columns = [{
    title: '编码',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
  }, {
    title: '操作',
    key: 'operation',
    render: (text, record) => (
      <p>
        <a onClick={() => {
        }}>编辑</a>
        &nbsp;
        <Popconfirm title="确定要删除吗？" onConfirm={() => {
        }}>
          <a>删除</a>
        </Popconfirm>
      </p>
    ),
  }]

  const pagination = {
    total,
    current,
    pageSize: 5,
    onChange: () => {
    },
  }

  return (
    <div>
      <Table
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
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
}

export default GroupList
