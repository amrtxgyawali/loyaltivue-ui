// Admin.js
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import CreateUser from './CreateUser';
import Promotions from './Promotions';

const Admin = () => {
  const [key, setKey] = useState('userList');

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      <Tabs
        id="admin-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="userList" title="Users List">
          <CreateUser />
        </Tab>
        <Tab eventKey="promotions" title="Promotions">
          <Promotions />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin;
