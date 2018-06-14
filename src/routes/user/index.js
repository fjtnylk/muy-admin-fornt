import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import UserSearch from "components/Users/UserSearch";
import UserList from "components/Users/UserList";
import UserModal from "components/Users/UserModal";

const Users = ({
  dispatch, users
}) => {

  const { modalVisible, list, pagination } = users

  const userSearchProps = {
    onAdd: () => {
      dispatch({
        type: 'users/showModal',
      })
    },
    onSearch: () => {

    },
    searchValues: {
      name: "",
      createTime: ["", ""],
    }
  }

  const userListProps = {
    pagination: pagination,
    dataSource: list,
    onDeleteUser: () => {
    },
    onPageChange: (current, size) => {
      console.log(current, size)
    },
    onShowSizeChange: (page, size) => {
      console.log(page, size)
    },
  }

  const userModalProps = {
    visible: modalVisible,
    title: `创建用户`,
    wrapClassName: 'vertical-center-modal',
    onOk: (data) => {
      console.log(data)
    },
    onCancel: () => {
      dispatch({
        type: 'users/hideModal',
      })
    }
  }

  return (
    <div>
      <UserSearch {...userSearchProps} />
      <UserList {...userListProps} />
      <UserModal {...userModalProps} />
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.object,
}

export default connect(({users}) => ({users}))(Users)
