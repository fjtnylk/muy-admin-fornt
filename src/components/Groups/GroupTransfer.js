import React from 'react'
import { Transfer, Modal } from 'antd'
import PropTypes from 'prop-types'

const GroupTransfer = ({
  dataSource, titles, targetKeys, selectedKeys, transferVisible, handleChange, handleSelectChange, ...modalProps
}) => {

  const modalOpts = {
    ...modalProps,
    visible: transferVisible,
    okText: '确定',
    cancelText: '取消',
  }

  return (
    <Modal {...modalOpts}>
      <Transfer
        dataSource={dataSource}
        titles={titles}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={item => item.title}
      />
    </Modal>
  )
}

GroupTransfer.propTypes = {
  dataSource: PropTypes.array,
  titles: PropTypes.array,
  targetKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
  transferVisible: PropTypes.bool,
  handleChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
}

export default GroupTransfer

