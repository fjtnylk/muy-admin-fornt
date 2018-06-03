import React from 'react'
import RoleList from 'components/Roles/RoleList'
import RoleModal from 'components/Roles/RoleModal'
import { Button } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva'


const Roles = ({
  location, dispatch, roles
}) => {
  const {loading, list, total, current, modalVisible, pageSize} = roles

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

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        新增
      </Button>
      <RoleList {...roleListProps}
                handleCellChange={handleCellChange}
                handleDeleteItem={handleDelete}
                handlePageChange={handlePageChange}
                handleShowSizeChange={handlePageChange}  />
      {modalVisible && <RoleModal {...roleModalProps} />}
    </div>
  )
}

Roles.propTypes = {
  roles: PropTypes.object,
}

export default connect(({roles}) => ({roles}))(Roles)
