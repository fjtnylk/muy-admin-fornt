import React from 'react';
import GroupList from 'components/Groups/GroupList';
import GroupSearch from 'components/Groups/GroupSearch';
import GroupModal from 'components/Groups/GroupModal';
import PropTypes from 'prop-types';
import { connect } from 'dva';

function Groups({ location, dispatch, groups }) {

  const { loading, list, total, current, currentItem, modalVisible, modalType } = groups;



  const groupSearchProps = {
    onAdd() {

    }
  };
  const groupListProps = {
    total,
    current,
    loading,
    dataSource: list,
  };
  const groupModalProps = {};

  return (
    <div>
      <GroupSearch {...groupSearchProps} />
      <GroupList {...groupListProps} />
      <GroupModal {...groupModalProps} />
    </div>
  );
}

Groups.propTypes = {
  groups: PropTypes.object,
}

export default connect(({groups}) => ({groups}))(Groups)
