import React, { useState, useEffect } from "react";
import { FaCreditCard } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdOutlineDownloadDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [order, setOrder] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State for selected payment method
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const orderData = {
        image: "images/car2.jpg",
        title: "Mercedes-AMG GT 4-Door Coupe",
        orderDate: "22 October 2024",
        price: 600000000,
      };
      const paymentMethodData = ["Mastercard", "Paypal", "Dana", "Bca Mobile", "Gopay", "Brimo"];
      const summaryData = {
        subtotal: 600000000,
        shippingCost: 12000000,
        tax: 66000000,
        applicationCost: 100000,
        total: 688100000,
      };

      setOrder(orderData);
      setPaymentMethods(paymentMethodData);
      setSummary(summaryData);
    };

    fetchData();
  }, []);

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    setIsPaymentSuccessful(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "calc(100vh - 150px)" }}>
      <style>
        {`
         .payment-success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .payment-success-content {
            background: white;
            padding: 20px 40px;
            border-radius: 8px;
            text-align: center;
            animation: fadeIn 0.5s ease;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .selected-method {
            background-color: #d4edda !important;
            border-color: #155724 !important;
            color: #155724 !important;
          }
        `}
      </style>
      <div className="container mt-5" style={{ paddingBottom: "100px" }}>
        {/* Payment Success Overlay */}
        {isPaymentSuccessful && (
          <div className="payment-success-overlay d-flex align-items-center justify-content-center">
            <div className="payment-success-content text-center">
              <h1>Payment Successful!</h1>
              <MdOutlineDownloadDone style={{ fontSize: "100px", color: "black" }} />
              <p>Thank you for trusting Atma Bid.</p>
            </div>
          </div>
        )}

        {/* Order Section */}
        {order ? (
          <div className="row">
            <div className="col-md-12">
              <h2>Your Order</h2>
              <div className="card mb-3 d-flex flex-row">
                <img
                  src={order.image}
                  className="img-fluid"
                  alt="Car Image"
                  style={{ width: "200px", height: "auto", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <strong>{order.title}</strong>
                  </h5>
                  <p className="card-text">
                    <small className="text-muted">Order Date: {order.orderDate}</small>
                  </p>
                  <p className="card-text">
                    <small className="text-muted">Harga: Rp. {order.price.toLocaleString()}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading order...</p>
        )}
        <br />

        {/* Payment Methods */}
        <h2>Payment Method</h2>
        <div className="row mt-3">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <div className="col-md-2" key={method}>
                <button
                  className={`btn custom-button ${selectedPaymentMethod === method ? "selected-method" : ""}`}
                  style={{ width: "100%" }}
                  onClick={() => handleSelectPaymentMethod(method)}
                >
                  <FaCreditCard style={{ fontSize: "30px" }} />
                  <div>{method}</div>
                </button>
              </div>
            ))
          ) : (
            <p>Loading payment methods...</p>
          )}
        </div>

        {/* Payment Summary */}
        {summary ? (
          <>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>Subtotal</h5>
              <h5>Rp. {summary.subtotal.toLocaleString()}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Est. Shipping Cost</h5>
              <h5>Rp. {summary.shippingCost.toLocaleString()}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Tax (11%)</h5>
              <h5>Rp. {summary.tax.toLocaleString()}</h5>
            </div>
            <div className="d-flex justify-content-between">
              <h5>Application Cost</h5>
              <h5>Rp. {summary.applicationCost.toLocaleString()}</h5>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <h5>
                <strong>Total</strong>
              </h5>
              <h5>
                <strong>Rp. {summary.total.toLocaleString()}</strong>
              </h5>
            </div>
          </>
        ) : (
          <p>Loading summary...</p>
        )}

        {/* Pay Now Button */}
        <div className="d-flex justify-content-between mt-4">
          <h5></h5>
          <button onClick={handlePayment} className="btn btn-dark" style={{ padding: "10px 30px" }}>
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
