import React, { Component, PropTypes } from 'react';
import GroupList from 'compoents/Groups/GroupList';
import GroupSearch from 'compoents/Groups/GroupSearch';
import GroupModal from 'compoents/Groups/GroupModal';
import styles from './index.less';

function Groups() {

  const groupSearchProps = {};
  const groupListProps = {};
  const groupModalProps = {};

  return (
    <div>
      {/*<GroupSearch {...groupSearchProps} />*/}
      {/*<GroupList {...groupListProps} />*/}
      {/*<GroupModal {...groupModalProps} />*/}
    </div>
  );
}

export default Groups;
