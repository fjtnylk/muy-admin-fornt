import React from 'react'
import MenuList from 'components/Menus/MenuList'
import MenuModal from 'components/Menus/MenuModal'
import { Button } from 'antd';
import PropTypes from 'prop-types'
import { connect } from 'dva'

const Menus = ({
  dispatch, menus
}) => {

  const { loading, list, total, current, modalVisible, pageSize } = menus

  const menuListProps = {
    total,
    current,
    pageSize,
    loading,
    dataSource: list,
  }

  const menuModalProps = {
    visible: modalVisible,
    title: `创建菜单`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `menus/save`,
        payload: data,
      }).then(() => {
        handleRefresh({})
      })
    },
    onCancel () {
      dispatch({
        type: 'menus/hideModal',
      })
    },
  }

  const handleRefresh = (payload) => {
    dispatch({
      type: `menus/query`,
      payload: payload
    })
  }

  const handlePageChange = (page, pageSize) => {
    handleRefresh({page: page, pageSize: pageSize})
  }

  const handleCellChange = (values) => {
    dispatch({
      type: 'menus/save',
      payload: values
    })
  }

  const handleDelete = (menuId) => {
    dispatch({
      type: 'menus/remove',
      payload: {id: menuId}
    })
  }

  const handleAdd = () => {
    dispatch({
      type: 'menus/showModal',
      payload:{}
    })
  }

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        新建
      </Button>
      <MenuList {...menuListProps}
                handleCellChange={handleCellChange}
                handleDeleteItem={handleDelete}
                handlePageChange={handlePageChange}
                handleShowSizeChange={handlePageChange}  />
      {modalVisible && <MenuModal {...menuModalProps} />}
    </div>
  )
}

Menus.propTypes = {
  menus: PropTypes.object,
}

export default connect(({menus}) => ({menus}))(Menus)
