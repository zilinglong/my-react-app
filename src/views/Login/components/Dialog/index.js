import React, { Component } from 'react';
import { Modal, Button, Form, Select, Input } from 'antd';
const { Option } = Select;
class DialogCreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.dialogVisible,
      type: props.type
    };
  }
  // const [visible, setVisible] = React.useState(false);
  // const [confirmLoading, setConfirmLoading] = React.useState(false);
  // const [modalText, setModalText] = React.useState('Content of the modal');
  componentDidMount() {
    console.log('tate.visible:', this.state.visible);
    console.log('props::', this.props);
  }
  // 父组件中元素更新，子组件中元素随之也更新
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.dialogVisible,
      type: nextProps.type
    });
  }
  setVisible = (value) => {
    this.setState({
      visible: value
    });
  };
  showModal = () => {
    this.setVisible(true);
  };
  handleOk = () => {
    console.log('handleOk');
    this.setVisible(false);
  };

  handleCancel = () => {
    console.log('handleCancel');
    this.setVisible(false);
  };
  
  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { visible, type } = this.state;
    // 设置label和表单区域占据的宽度
    const labelCol = 6;
    const layout = {
      labelCol: { span: labelCol },
      wrapperCol: { span: 16 },
    };
    const tailLayout = {
      wrapperCol: { offset: labelCol, span: 16 },
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          打开弹窗
        </Button>
        <Modal
          title={`${type === 'create' ? '新增' : '编辑'}数据`}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <section className="form-container">
            <Form
              {...layout}
              name="basic"
              className="form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="select"
                label="Select"
                hasFeedback
                rules={[{ required: true, message: 'Please select your country!' }]}
              >
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...tailLayout}
              >
                <Button type="primary" htmlType="submit">submit</Button>
              </Form.Item>
            </Form>
          </section>
          
        </Modal>
      </div>
    );
  }
}
export default DialogCreateEdit;