import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const GroupModal = ({
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
          label="编码"
          hasFeedback>
          {getFieldDecorator('code', {
            rules: [{
              required: true,
              message: '编码不允许为空!',
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
          label="备注"
          hasFeedback>
          {getFieldDecorator('remark', {
            rules: [{
              required: false,
            },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

GroupModal.propTypes = {
  onOk: PropTypes.func,
  form: PropTypes.object,
}

export default Form.create()(GroupModal)
