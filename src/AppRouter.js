import React from "react";
import Login from "./Login";
import Shopkeeper from "./Shopkeeper";
import Customer from "./Customer";
import Admin from "./Admin";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from "./Layout";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/logout" exact element={<Login/>} />
        <Route
          path="/app/*"
          element={
            <Layout>
            <Routes>
              <Route path="admin/:userId" element={<Admin />} />
              <Route path="shopkeeper/:shopkeeperId" element={<Shopkeeper />} />
              <Route path="customer/:userId" element={<Customer />} />
              <Route index element={<Navigate to="/" />} />
            </Routes>
          </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
