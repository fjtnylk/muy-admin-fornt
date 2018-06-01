import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { EditableCell } from './EditableCell';
import React from 'react';

const EditableTable = ({
  datasource, onCellChange, onDelete, onAdd
}) => {

  const cellProps = {
    editable: true,
    value: "yanglikai",
    onChange() {
    },
    onCheck() {
    },
    onEdit() {
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell
          {...cellProps}
          value={text}
          onChange={onCellChange(record.key, 'name')}
        />
      ),
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        datasource.length > 1 ?
          (
            <Popconfirm title="Sure to delete?" onConfirm={() => onDelete(record.key)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null
      ),
    }
  ];

  return (
    <div>
      <Button onClick={onAdd} type="primary" style={{ marginBottom: 16 }}>
        新增
      </Button>
      <Table bordered dataSource={datasource} columns={columns} />
    </div>
  );
};

EditableTable.propTypes = {
  datasource: PropTypes.array,
  onCellChange: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
}

export default EditableTable;
