import React from 'react'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import PropTypes from 'prop-types'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const UserModal = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const { city, position } = modalProps

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }

      const data = getFieldsValue()
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    okText: '确定',
    cancelText: '取消',
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '用户名不允许为空!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="昵称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="性别" hasFeedback {...formItemLayout}>
          {getFieldDecorator('sex', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Radio.Group>
            <Radio value={'M'}>男</Radio>
            <Radio value={'F'}>女</Radio>
          </Radio.Group>)}
        </FormItem>
        <FormItem label="年龄" hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={18} max={100} />)}
        </FormItem>
        <FormItem label="联系手机" hasFeedback {...formItemLayout}>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '无效的手机号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '无效的邮箱',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            style={{ width: '100%' }}
            options={city}
            placeholder="Pick an address"
          />)}
        </FormItem>
        <FormItem label="部门/岗位" hasFeedback {...formItemLayout}>
          {getFieldDecorator('position', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            style={{ width: '100%' }}
            options={position}
            placeholder="Pick an address"
          />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

UserModal.propTypes = {
  onOk: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(UserModal)
