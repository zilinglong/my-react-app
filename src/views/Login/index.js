import React, { Component } from 'react';
import { Table, Button, Tag, Space } from 'antd';
// import { dataSource, columns } from './data';
import DialogCreateEdit from './components/Dialog';
import './index.scss'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      dialogVisible: false,
      type: '',
      curRowData: {}, // 当前行数据
      curIndex: 0, // 当前是第几行数据
      dataSource: [
        {
          key: 0,
          name: 'John Brown',
          country: 32,
          colors: ['nice', 'developer'],
        },
        {
          key: 1,
          name: 'Jim Green',
          country: 42,
          colors: ['loser'],
        },
        {
          key: 2,
          name: 'Joe Black',
          country: 32,
          colors: ['cool', 'teacher'],
        }
      ]
    };
    this.handleAdd = this.handleAdd.bind(this);
  }
  // count + 1
  handleAdd() {
    const { count } = this.state;
    this.setState({
      count: count + 1
    });
  }
  // 删除
  handleDelete(key) {
    this.setState({
      dataSource: [].concat(this.findById(key))
    });
  }
  findById(key) {
    const { dataSource } = this.state;
    dataSource.forEach((item, idx) => {
      if (idx === key) {
        dataSource.splice(idx, 1);
      }
    });
    console.log('find after:', dataSource);
    return dataSource;
  }
  handleParams(value) {
    console.log('value:', value);
  }
  // 新增、编辑弹窗
  handleCreateEdit(type, record, idx) {
    console.log('handleCreateEdit:type, record:', type, record, idx);
    this.setState({
      dialogVisible: true,
      type: type,
      curRowData: type === 'create' ? {} : record, 
      curIndex: idx || 0
    });
  }
  // 子组件点击确定
  transMsg = (data) => {
    console.log('子组件点击确定:', data);
    const { dataSource, type, curIndex } = this.state;
    if (type === 'create') {
      // 新增
      this.setState({
        dataSource: dataSource.concat([Object.assign(data, {key: dataSource.length + 1})])
      });
    } else {
      // 编辑
      dataSource.splice(curIndex, 1, Object.assign(data, {key: curIndex}));
      this.setState({
        dataSource: [...dataSource]
      });
      // console.log('datas:', dataSource);
    }
  };
  render() {   
    const columns = [
      {
        title: 'name', // 表头展示
        dataIndex: 'name' // 查找数据的标准
      },
      {
        title: 'country',
        dataIndex: 'country'
      },
      {
        title: 'colors',
        dataIndex: 'colors',
        render: colors => (
          <>
            {colors.map(tag => {
              // 某个单词的长度大于5，则蓝色，否则绿色；如果是loser，则是红色
              let color = tag.length > 5 ? '#00f' : '#0f0';
              if (tag === 'loser') {
                color = '#f00';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record, idx) => (
          <Space size="middle">
            <a onClick={() => this.handleCreateEdit('edit', record, idx)}>edit-{record.name}</a>
            <a onClick={() => this.handleDelete(record.key)}>Delete</a>
          </Space>
        ),
      },
    ];
    const { dialogVisible, type, dataSource, count, curRowData } = this.state;
    return (
      <div id="login">

        <p className="title">
          登录页面: {count} 
          <Button type="primary" onClick={this.handleAdd} className="btn-add">count+1</Button>
        </p>    

        <section className="btn-group">
          <Button type="primary" onClick={() => this.handleCreateEdit('create')}>新增数据</Button>
        </section>
        
        <section>
          <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.key}></Table>
        </section>
        <DialogCreateEdit dialogVisible={dialogVisible} type={type} curRowData={curRowData} transMsg={this.transMsg}></DialogCreateEdit>
      </div>
    );
  }
}

export default Login;