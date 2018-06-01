import {Table, Input, Icon, Button, Popconfirm} from 'antd';
import PropTypes from 'prop-types';
import React from 'react'
import styles from './EditableCell.less';

const EditableCell = ({
  editable, value, onChange, onCheck, onEdit
}) => {
  return (
    <div className={styles.editable - cell}>
      {
        editable ? (
          <Input
            value={value}
            onChange={onChange}
            onPressEnter={onCheck}
            suffix={
              <Icon
                type="check"
                className={styles.editable - cell - icon - check}
                onClick={onCheck}
              />
            }
          />
        ) : (
          <div style={{paddingRight: 24}}>
            {value || ' '}
            <Icon
              type="edit"
              className={styles.editable - cell - icon}
              onClick={onEdit}
            />
          </div>
        )
      }
    </div>
  );
};

EditableCell.propTypes = {
  editable: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onCheck: PropTypes.func,
  onEdit: PropTypes.func,
};

export default EditableCell;
