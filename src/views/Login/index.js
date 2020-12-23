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
    console.log('handleDelete:key', key);
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
  handleCreateEdit(type) {
    console.log('handleCreateEdit');
    this.setState({
      dialogVisible: true,
      type: type
    });
  }
  render() {   
    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'country',
        dataIndex: 'country',
        key: 'country',
      },
      {
        title: 'colors',
        dataIndex: 'colors',
        key: 'colors',
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
        render: (text, record) => (
          <Space size="middle">
            <a onClick={() => this.handleCreateEdit('edit')}>edit-{record.name}</a>
            <a onClick={() => this.handleDelete(record.key)}>Delete</a>
          </Space>
        ),
      },
    ];
    const { dialogVisible, type, dataSource, count } = this.state;
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
          <Table dataSource={dataSource} columns={columns}></Table>
        </section>
        <DialogCreateEdit dialogVisible={dialogVisible} type={type}></DialogCreateEdit>
      </div>
    );
  }
}

export default Login;