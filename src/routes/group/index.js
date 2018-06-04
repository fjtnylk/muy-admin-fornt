import React from 'react'
import { Button } from 'antd';
import GroupList from 'components/Groups/GroupList'
import GroupModal from 'components/Groups/GroupModal'
import GroupTransfer from 'components/Groups/GroupTransfer'
import PropTypes from 'prop-types'
import { connect } from 'dva'

function Groups({ location, dispatch, groups }) {

  const { loading, list, total, current, modalVisible, transferVisible, pageSize, transferList, targetKeys, selectedKeys} = groups;

  const groupListProps = {
    total,
    current,
    pageSize,
    loading,
    dataSource: list,
  };

  const groupModalProps = {
    visible: modalVisible,
    title: '创建组织',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `groups/save`,
        payload: data,
      }).then(() => {
        handleRefresh({})
      })
    },
    onCancel () {
      dispatch({
        type: 'groups/hideModal',
      })
    },
  }

  const groupTransferProps = {
    dataSource: transferList,
    titles: ['未属角色', '已属角色'],
    targetKeys: targetKeys,
    selectedKeys: selectedKeys,
    handleChange(nextTargetKeys, direction, moveKeys) {
      dispatch({
        type: `groups/nextTargetKeys`,
        payload: nextTargetKeys
      })
    },
    transferVisible: transferVisible,
    title: `所属角色`,
    wrapClassName: 'vertical-center-modal',
    onOk () {
      dispatch({
        type: `groups/saveGroupRole`,
      })
    },
    onCancel () {
      dispatch({
        type: 'groups/hideTransferModal',
      })
    },
  }

  const handleRefresh = (payload) => {
    dispatch({
      type: `groups/query`,
      payload: payload
    })
  }

  const handlePageChange = (page, pageSize) => {
    handleRefresh({page: page, pageSize: pageSize})
  }

  const handleCellChange = (values) => {
    dispatch({
      type: 'groups/save',
      payload: values
    })
  }

  const handleDelete = (code) => {
    dispatch({
      type: 'groups/remove',
      payload: {code: code}
    })
  }

  const handleBindRole = (code) => {
    dispatch({
      type: 'groups/bindRole',
      payload: {groupCode: code}
    })
  }

  const handleAdd = () => {
    dispatch({
      type: 'groups/showModal',
      payload:{}
    })
  }

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        新增
      </Button>
      <GroupList
        {...groupListProps}
        handleCellChange={handleCellChange}
        handleDeleteItem={handleDelete}
        handlePageChange={handlePageChange}
        handleShowSizeChange={handlePageChange}
        handleBindRole={handleBindRole} />
      {modalVisible && <GroupModal {...groupModalProps} />}
      {transferVisible && <GroupTransfer {...groupTransferProps} />}
    </div>
  );
}

Groups.propTypes = {
  groups: PropTypes.object,
}

export default connect(({groups}) => ({groups}))(Groups)
