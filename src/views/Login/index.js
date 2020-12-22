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
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: 1,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: 2,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        }
      ]
    };
    this.handleAdd = this.handleAdd.bind(this);
  }
  handleAdd() {
    console.log('value:');
    this.setState({
      count: this.state.count + 1
    });
  }
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
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
    const { dialogVisible, type, dataSource } = this.state;
    return (
      <div id="login">
        <p className="title">登录页面: { this.state.count}</p>    
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