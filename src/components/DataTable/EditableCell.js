import { Input, Icon } from 'antd'
import styles from './EditableCell.less'



class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  edit = () => {
    this.setState({ editable: true });
  }

  desc = (e) => {
    if (e.keyCode === 27) {
      this.setState({ editable: false });
    }
  }

  render() {
    const { value, editable } = this.state;

    return (
      <div className={styles.editableCell}>
        {
          editable ? (
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              onKeyDown={this.desc}
              suffix={
                <Icon
                  type="check"
                  className={styles.editableCellIconCheck}
                  onClick={this.check}
                />
              }
            />
          ) : (
            <div style={{ paddingRight: 24 }}>
              {value}
              <Icon
                type="edit"
                className={styles.editableCellIcon}
                onClick={this.edit}
              />
            </div>
          )
        }
      </div>
    );
  }
}

export default EditableCell
