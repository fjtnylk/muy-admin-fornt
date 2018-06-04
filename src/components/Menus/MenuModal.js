import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const MenuModal = ({
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem
          {...formItemLayout}
          label="编号"
          hasFeedback>
          {getFieldDecorator('id', {
            rules: [{
              required: true,
              message: '编号不允许为空!',
            },
            ],
          })(<InputNumber />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="BPID"
          hasFeedback>

          {getFieldDecorator('BPID', {
            rules: [{
              required: true,
              message: 'BPID不允许为空!',
            },
            ],
          })(<InputNumber />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="MPID"
          hasFeedback>
          {getFieldDecorator('MPID', {
            rules: [{
              required: false,
            },
            ],
          })(<InputNumber />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图标"
          hasFeedback>
          {getFieldDecorator('icon', {
            rules: [{
              required: false,
            },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
          hasFeedback>
          {getFieldDecorator('name', {
            rules: [{
              required: true,
              message: '名称不允许为空!',
            },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="请求URL"
          hasFeedback>
          {getFieldDecorator('route', {
            rules: [{
              required: true,
              message: '请求URL不允许为空!',
            },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

MenuModal.propTypes = {
  onOk: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(MenuModal)
