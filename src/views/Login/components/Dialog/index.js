import React, { Component } from 'react';
import { Modal, Form, Select, InputNumber, Switch, Radio,  Slider, Button, Upload, Rate, Checkbox, Row, Col, Space, Input } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
const { Option } = Select;

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};
class DialogCreateEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.dialogVisible,
      type: props.type,
      curRowData: props.curRowData, // 当前数据
      colorList: ['red', 'green', 'blue', 'yelloww'], // 颜色列表
      countryList: ['China', 'USA']
    };
  }
  form = React.createRef();
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
      type: nextProps.type,
      curRowData: nextProps.curRowData
    }, () => {
      console.log('nextProps then:', this.state.curRowData);
      this.onFill(this.state.curRowData);
    });
  }
  setVisible = (value) => {
    this.setState({
      visible: value
    });
    this.onReset();
  };
  showModal = () => {
    this.setVisible(true);
  };
  handleOk = async () => {
    console.log('handleOk');
    const fieldsValue = await this.form.current.validateFields(); 
    //fieldsValue即为表单内的值
    console.log("okHandle -> fieldsValue", fieldsValue)
    this.props.transMsg(fieldsValue);
    this.setVisible(false);
  };
  // 清空
  onReset = () => {
    this.form.current.resetFields();
  };
  // 填写数据
  onFill = (data) => {
    const initialData = {
      ['input-number']: 3,
      ['checkbox-group']: ['A', 'B'],
      rate: 3.5,
      slider: 12,
      'country': 'china',
      'colors': ['red'],
      'radio-button': 'b',
      'name': 'hello'
    };
    const { type } = this.state;
    let value = initialData;
    if (type === 'edit') {
      value = data;
    } 
    this.form.current.setFieldsValue(value);
  }
  // 下拉国家改变
  onChangeCountry = (value) => {
    console.log('onChangeCountry value:', value);
    this.form.current.setFieldsValue({name: `hello ${value}`});
  }
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
    const { visible, type, colorList, countryList } = this.state;
    // 设置label和表单区域占据的宽度
    const labelCol = 8;
    const formItemLayout = {
      labelCol: {
        span: labelCol
      },
      wrapperCol: {
        span: 14,
      },
    };
    const tailLayout = {
      wrapperCol: { offset: labelCol, span: 16 },
    };
    const checkboxStyle = {
      lineHeight: '32px',
    };
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          打开弹窗
        </Button>
        <Modal
          title={`${type === 'create' ? '新增' : '编辑'}数据`}
          visible={visible}
          // 与 <Form />配合使用时， Modal 关闭时销毁表单字段数据，需要设置 <Form preserve={false} /> 但不能设置 destroyOnClose 为 true
          destroyOnClose={false} 
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确定"
        >
          <section className="form-container">
            <Form
              ref={this.form}
              name="validate_other"
              {...formItemLayout}
              onFinish={this.onFinish}
              preserve={false}
              // initialValues={{
              //   ['input-number']: 3,
              //   ['checkbox-group']: ['A', 'B'],
              //   rate: 3.5,
              //   slider: 12,
              //   'country': 'china',
              //   'colors': ['red'],
              //   'radio-button': 'b',
              //   'name': 'hello'
              // }}
            >
              <Form.Item label="Plain Text">
                <span className="ant-form-text">China</span>
              </Form.Item>
              <Form.Item
                name="name"
                label="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
          <Input placeholder="请输入name值" />
        </Form.Item>
              <Form.Item
                name="country"
                label="country"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please select your country!',
                  },
                ]}
              >
                <Select placeholder="Please select a country" onChange={this.onChangeCountry}>
                  {countryList.map((item, idx) => <Option key={idx} value={item}>{item}</Option>)}
                </Select>
              </Form.Item>

              <Form.Item
                name="colors"
                label="Select[multiple]"
                rules={[
                  {
                    required: true,
                    message: 'Please select your favourite colors!',
                    type: 'array',
                  },
                ]}
              >
                <Select mode="multiple" placeholder="Please select favourite colors">
                  {colorList.map((color,idx) => <Option key={idx} value={color}>{color}</Option>)}
                </Select>
              </Form.Item>
              <Form.Item
                noStyle
                shouldUpdate={(prev, cur) => prev['country']!==cur['country']}
              >
                {
                  ({getFieldValue}) => {
                    return getFieldValue('country') === 'China' ? 
                    (
                    <Form.Item label="InputNumber">
                      <Form.Item name="input-number" noStyle>
                        <InputNumber min={1} max={10} />
                      </Form.Item>
                      <span className="ant-form-text"> machines</span>
                    </Form.Item>
                  ):null
                  }
                }
              </Form.Item>

              <Form.Item name="switch" label="Switch" valuePropName="checked">
                <Switch />
              </Form.Item>

              <Form.Item name="slider" label="Slider">
                <Slider
                  marks={{
                    0: 'A',
                    20: 'B',
                    40: 'C',
                    60: 'D',
                    80: 'E',
                    100: 'F',
                  }}
                />
              </Form.Item>

              <Form.Item name="radio-group" label="Radio.Group">
                <Radio.Group>
                  <Radio value="1">item 1</Radio>
                  <Radio value="2">item 2</Radio>
                  <Radio value="3">item 3</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="radio-button"
                label="Radio.Button"
                rules={[
                  {
                    required: true,
                    message: 'Please pick an item!',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio.Button value="a">item 1</Radio.Button>
                  <Radio.Button value="b">item 2</Radio.Button>
                  <Radio.Button value="c">item 3</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="checkbox-group" label="Checkbox.Group">
                <Checkbox.Group>
                  <Row>
                    <Col span={8}>
                      <Checkbox
                        value="A"
                        style={checkboxStyle}
                      >
                        A
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="B"
                        style={checkboxStyle}
                        disabled
                      >
                        B
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="C"
                        style={checkboxStyle}
                      >
                        C
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="D"
                        style={checkboxStyle}
                      >
                        D
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="E"
                        style={checkboxStyle}
                      >
                        E
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox
                        value="F"
                        style={checkboxStyle}
                      >
                        F
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item name="rate" label="Rate">
                <Rate />
              </Form.Item>

              <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="longgggggggggggggggggggggggggggggggggg"
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item label="Dragger">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                  <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>

              <Form.Item
                {...tailLayout}
              >
                <Space>
                  <Button type="primary" onClick={this.onReset}>
                    清空
                  </Button>
                  <Button type="primary" onClick={this.onFill}>
                    填数
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </section>
          
        </Modal>
      </div>
    );
  }
}
export default DialogCreateEdit;