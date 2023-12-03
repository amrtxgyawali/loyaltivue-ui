// Customer.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Customer = () => {
  const { userId } = useParams();
  //const { login } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [pointsTillDate, setPointsTillDate] = useState(0);

  useEffect(() => {
    // Fetch user information and transactions when the component mounts
    fetchUserInfo();
    fetchUserTransactions();
  }, [userId]);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/get-user-info/${userId}`
      );
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const fetchUserTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/customer/${userId}`
      );
      setTransactions(response.data);

      // Calculate pointsTillDate from the first record in the transactions list
      if (response.data.length > 0) {
        setPointsTillDate(response.data[0].pointsTillDate);
      }
    } catch (error) {
      console.error("Error fetching user transactions:", error);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Customer Information</h3>
        </div>
        <div className="card-body">
          {userInfo && (
            <div>
              <p>
                <strong>First Name:</strong> {userInfo.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {userInfo.lastName}
              </p>
              <p>
                <strong>Points Till Date:</strong> {pointsTillDate}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          <h3 className="card-title">Transactions</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Transaction Amount</th>
                <th>Transaction Date</th>
                <th>Offer Applied</th>
                <th>Points Earned</th>
                <th>Points Redeemed</th>
                <th>Points Available</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.transactionAmount}</td>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.offerApplied}</td>
                  <td>{transaction.pointsEarned}</td>
                  <td>{transaction.redeemPoints}</td>
                  <td>{transaction.pointsTillDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customer;
