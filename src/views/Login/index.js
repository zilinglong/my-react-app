import React, { Component } from 'react';
import { Table } from 'antd';
import { dataSource, columns } from './data';

class Login extends Component {
  render() {
    return (
      <div>
        <p>登录页面</p>
        <section>
          <Table dataSource={dataSource} columns={columns}></Table>
        </section>
      </div>
    );
  }
}

export default Login;