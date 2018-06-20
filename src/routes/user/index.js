import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import UserSearch from "components/Users/UserSearch";
import UserList from "components/Users/UserList";
import UserModal from "components/Users/UserModal";

const Users = ({
  dispatch, users
}) => {

  const { loading, modalVisible, list, pagination, city, position } = users

  const userSearchProps = {
    onAdd: () => {
      dispatch({
        type: 'users/showModal',
      })
      dispatch({
        type: 'users/queryCitys',
      })
      dispatch({
        type: 'users/queryPosition',
      })
    },
    onSearch: (fields) => {
      dispatch({
        type: `users/query`,
        payload: {
          userName: fields.name,
          startTime: fields.createTime === undefined ? "" : fields.createTime.length > 0 ? fields.createTime[0] : "",
          endTime: fields.createTime === undefined ? "" : fields.createTime.length > 1 ? fields.createTime[1] : "",
        }
      })
    }
  }

  const userListProps = {
    loading: loading,
    pagination: pagination,
    dataSource: list,
    onDeleteUser: (id) => {
      dispatch({
        type: `users/delete`,
        payload: {
          userId: id,
        }
      }).then(() => {
        handleRefresh()
      })
    },
    onPageChange: (current, size) => {
      dispatch({
        type: `users/query`,
        payload: {
          page: current,
          pageSize: size,
        }
      })
    },
    onShowSizeChange: (page, size) => {
      dispatch({
        type: `users/query`,
        payload: {
          page: page,
          pageSize: size,
        }
      })
    },
  }

  const userModalProps = {
    visible: modalVisible,
    city: city,
    position: position,
    title: `创建用户`,
    wrapClassName: 'vertical-center-modal',
    onOk: (data) => {
      dispatch({
        type: 'users/save',
        payload: data
      }).then(() => {
        handleRefresh()
      })
    },
    onCancel: () => {
      dispatch({
        type: 'users/hideModal',
      })
    }
  }

  const handleRefresh = () => {
    dispatch({
      type: `users/query`,
    })
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
