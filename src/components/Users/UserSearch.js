import React from 'react'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch } from 'antd'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import moment from 'moment'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const UserSearch = ({
  onAdd,
  onSearch,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  }
}) => {

  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime === undefined) {
      return fields;
    }

    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }

    return fields
  }

  const handleSearch = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)

    onSearch(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }

    setFieldsValue(fields)
    handleSearch()
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
        {getFieldDecorator('name')(<Search placeholder="Search Name" />)}
      </Col>
      <Col {...ColProps} xl={{ span: 7 }} md={{ span: 8 }} sm={{ span: 12 }} id="createTimeRangePicker">
        <FilterItem label="创建时间">
          {getFieldDecorator('createTime')(<RangePicker
            style={{ width: '100%' }}
            getCalendarContainer={() => {
              return document.getElementById('createTimeRangePicker')
            }}
          />)}
        </FilterItem>
      </Col>
      <Col {...TwoColProps} xl={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <Button type="primary" className="margin-right" onClick={handleSearch}>检索</Button>
            <Button onClick={handleReset}>重置</Button>
          </div>
          <div className="flex-vertical-center">
            <Button type="primary" onClick={onAdd}>新建</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

UserSearch.propTypes = {
  onAdd: PropTypes.func,
  onSearch: PropTypes.func,
}

export default Form.create()(UserSearch)
