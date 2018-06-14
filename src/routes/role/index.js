import React from 'react'
import RoleList from 'components/Roles/RoleList'
import RoleModal from 'components/Roles/RoleModal'
import RoleTransfer from 'components/Roles/RoleTransfer'
import { Button } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva'


const Roles = ({
  location, dispatch, roles
}) => {
  const {loading, list, total, current, modalVisible, transferVisible, pageSize, transferList, targetKeys, selectedKeys} = roles

  const roleListProps = {
    total,
    current,
    pageSize,
    loading,
    dataSource: list,
  }

  const roleModalProps = {
    visible: modalVisible,
    title: `创建角色`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `roles/save`,
        payload: data,
      }).then(() => {
        handleRefresh({})
      })
    },
    onCancel () {
      dispatch({
        type: 'roles/hideModal',
      })
    },
  }

  const roleTransferProps = {
    dataSource: transferList,
    titles: ['未授权菜单', '已授权菜单'],
    targetKeys: targetKeys,
    selectedKeys: selectedKeys,
    handleChange(nextTargetKeys, direction, moveKeys) {
      dispatch({
        type: `roles/nextTargetKeys`,
        payload: nextTargetKeys
      })
    },
    transferVisible: transferVisible,
    title: `菜单授权`,
    wrapClassName: 'vertical-center-modal',
    onOk () {
      dispatch({
        type: `roles/saveRoleMenu`,
      })
    },
    onCancel () {
      dispatch({
        type: 'roles/hideTransferModal',
      })
    },
  }

  const handleRefresh = (payload) => {
    dispatch({
      type: `roles/query`,
      payload: payload
    })
  }

  const handlePageChange = (page, pageSize) => {
    handleRefresh({page: page, pageSize: pageSize})
  }

  const handleCellChange = (values) => {
    dispatch({
      type: 'roles/save',
      payload: values
    })
  }

  const handleDelete = (code) => {
    dispatch({
      type: 'roles/remove',
      payload: {code: code}
    })
  }

  const handleAdd = () => {
    dispatch({
      type: 'roles/showModal',
      payload:{}
    })
  }

  const handleBindMenu = (code) => {
    dispatch({
      type: 'roles/bindMenu',
      payload: {roleCode: code}
    })
  }

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        新建
      </Button>
      <RoleList {...roleListProps}
                handleCellChange={handleCellChange}
                handleDeleteItem={handleDelete}
                handlePageChange={handlePageChange}
                handleShowSizeChange={handlePageChange}
                handleBindMenu={handleBindMenu}  />
      {modalVisible && <RoleModal {...roleModalProps} />}
      {transferVisible && <RoleTransfer {...roleTransferProps} />}
    </div>
  )
}

Roles.propTypes = {
  roles: PropTypes.object,
}

export default connect(({roles}) => ({roles}))(Roles)
