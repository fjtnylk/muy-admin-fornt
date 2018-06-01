import React, { PropTypes } from 'react';
import {Table, Button, Popconfirm} from 'antd';
import styles from './GroupSearch.less';

const GroupSearch = ({
  form, field, keyword, onSearch, onAdd
}) => {
  return (
    <div>
      <Button onClick={onAdd} type="primary" style={{ marginBottom: 16 }}>
        新增
      </Button>
    </div>
  )
}

export default GroupSearch
