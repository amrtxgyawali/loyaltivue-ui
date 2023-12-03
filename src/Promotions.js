import React, { useState, useEffect } from "react";
import axios from "axios";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [showCreatePromotionModal, setShowCreatePromotionModal] =
    useState(false);
  const [newPromotion, setNewPromotion] = useState({
    promoName: "",
    promoPercentage: "",
    startDate: "",
    endDate: "",
  });
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    // Fetch promotions when the component mounts
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/promotions");
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const handleAddPromotion = async () => {
    try {
      // Send the new promotion data to the backend (POST request)
      await axios.post("http://localhost:8080/api/promotions", newPromotion);
      // Fetch the updated list of promotions
      fetchPromotions();
      // Reset the form
      setNewPromotion({
        promoName: "",
        promoPercentage: "",
        startDate: "",
        endDate: "",
      });
      // Close the modal
      setShowCreatePromotionModal(false);
    } catch (error) {
      console.error("Error adding promotion:", error);
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    try {
      // Implement the logic to delete a promotion by ID (DELETE request)
      await axios.delete(`http://localhost:8080/api/promotions/${promotionId}`);
      // Fetch the updated list of promotions
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion:", error);
    }
  };

  const handleUpdatePromotion = async () => {
    try {
      // Implement the logic to update a promotion by ID (PUT request)
      await axios.put(
        `http://localhost:8080/api/promotions/${selectedPromotion.id}`,
        selectedPromotion
      );
      // Fetch the updated list of promotions
      fetchPromotions();
      // Reset the selected promotion
      setSelectedPromotion(null);
    } catch (error) {
      console.error("Error updating promotion:", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-success mb-3"
        onClick={() => setShowCreatePromotionModal(true)}
      >
        Add Promotion
      </button>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Promotions</h3>
        </div>
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Promo Name</th>
                <th>Promo Percentage</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td>{promotion.promoName}</td>
                  <td>{promotion.promoPercentage}</td>
                  <td>{promotion.startDate}</td>
                  <td>{promotion.endDate}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm mx-2"
                      onClick={() => handleDeletePromotion(promotion.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setSelectedPromotion(promotion)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for creating promotions */}
      <div
        className={`modal fade ${showCreatePromotionModal ? "show" : ""}`}
        style={{ display: showCreatePromotionModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-hidden={!showCreatePromotionModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Promotion</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setShowCreatePromotionModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {/* Render form fields for creating promotions here */}
              <form>
                <div className="mb-3">
                  <label htmlFor="promoName" className="form-label">
                    Promo Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="promoName"
                    value={newPromotion.promoName}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        promoName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="promoPercentage" className="form-label">
                    Promo Percentage:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="promoPercentage"
                    value={newPromotion.promoPercentage}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        promoPercentage: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    Start Date:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="startDate"
                    value={newPromotion.startDate}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    End Date:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="endDate"
                    value={newPromotion.endDate}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddPromotion}
                >
                  Add Promotion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
