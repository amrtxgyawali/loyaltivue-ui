// Shopkeeper.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Shopkeeper = () => {
  const { shopkeeperId } = useParams();
  const [userId, setUserId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [transactionValue, setTransactionValue] = useState("");
  const [showInitiateModal, setShowInitiateModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [shopkeeperTransactions, setShopkeeperTransactions] = useState([]);

  useEffect(() => {
    // Fetch promotions and shopkeeper transactions when the component mounts
    fetchPromotions();
    fetchShopkeeperTransactions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/promotions");
      setPromotions(response.data);

      // Select the promotion with the highest percentage by default
      const highestPercentagePromotion = response.data.reduce(
        (max, promotion) =>
          max.promoPercentage > promotion.promoPercentage ? max : promotion
      );
      setSelectedPromotion(highestPercentagePromotion);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const fetchShopkeeperTransactions = async () => {
    try {
      // Fetch transactions for the shopkeeper
      const response = await axios.get(
        `http://localhost:8080/api/transactions/shopkeeper/${shopkeeperId}`
      );
      setShopkeeperTransactions(response.data);
    } catch (error) {
      console.error("Error fetching shopkeeper transactions:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auth/get-user-info/${userId}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const initiateTransaction = () => {
    setShowInitiateModal(true);
  };

  const handleSubmitTransaction = async () => {
    try {
      // Prepare transaction data
      const transactionData = {
        userPhoneNumber: userDetails.phoneNum,
        transactionAmount: parseFloat(transactionValue),
        offerApplied: selectedPromotion.promoName,
        shopkeeperId: shopkeeperId,
      };

      // Send the transaction data to the backend (POST request)
      await axios.post(
        "http://localhost:8080/api/transactions",
        transactionData
      );

      // Reset state and close the modal
      setUserId("");
      setUserDetails(null);
      setTransactionValue("");
      setShowInitiateModal(false);

      // Show the success modal
      setShowSuccessModal(true);

      // Refresh shopkeeper transactions
      fetchShopkeeperTransactions();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  const handleInitiateModalClose = () => {
    setShowInitiateModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopkeeper Component</h2>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">User Details</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Enter User ID:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              <button className="btn btn-primary" onClick={fetchUserDetails}>
                Load User Details
              </button>

              {userDetails && (
                <div className="mb-4 mt-4">
                  <h3>User Details</h3>
                  <p>
                    <strong>Last Name:</strong> {userDetails.lastName}
                  </p>
                  <p>
                    <strong>First Name:</strong> {userDetails.firstName}
                  </p>
                  <p>
                    <strong>Points Till Date:</strong>{" "}
                    {userDetails.pointsTillDate}
                  </p>
                  <button
                    className="btn btn-success"
                    onClick={initiateTransaction}
                  >
                    Initiate Transaction
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {shopkeeperTransactions.length > 0 && (
        <div className="card mb-4 mt-4">
          <div className="card-header">
            <h3 className="card-title">Shopkeeper Transactions</h3>
          </div>
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Promotion</th>
                  <th>Customer ID</th>
                </tr>
              </thead>
              <tbody>
                {shopkeeperTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.transactionDate}</td>
                    <td>{transaction.transactionAmount}</td>
                    <td>
                      {transaction.offerApplied
                        ? transaction.offerApplied
                        : "N/A"}
                    </td>
                    <td>{transaction.userPhoneNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showInitiateModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Initiate Transaction</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleInitiateModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <label className="form-label">
                  Transaction Value:
                  <input
                    type="text"
                    className="form-control"
                    value={transactionValue}
                    onChange={(e) => setTransactionValue(e.target.value)}
                  />
                </label>
                <label className="form-label">
                  Select Promotion:
                  <select
                    className="form-control"
                    value={selectedPromotion ? selectedPromotion.id : ""}
                    onChange={(e) => {
                      const selectedPromotionId = e.target.value;
                      const promotion = promotions.find(
                        (p) => p.id === selectedPromotionId
                      );
                      setSelectedPromotion(promotion);
                    }}
                  >
                    {promotions.map((promotion) => (
                      <option key={promotion.id} value={promotion.id}>
                        {promotion.promoName}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleInitiateModalClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitTransaction}
                >
                  Submit Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Transaction Successful</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleSuccessModalClose}
                ></button>
              </div>
              <div className="modal-body">
                <p>The transaction has been completed successfully.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSuccessModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopkeeper;
