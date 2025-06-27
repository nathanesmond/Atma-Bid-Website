import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GetAllCatalog, ShowCarCatalog } from "../clients/apiCatalog";
import { ShowAuction } from "../clients/apiAuction";
import { CreateBid } from "../clients/apiBids";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [bid, setBid] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCarDetail = useCallback(async () => {
    try {
      const response = await ShowAuction(id);
      setProductDetail(response.data.data);
      setBid(Math.max(parseFloat(response.data.data.starting_price) + 1000, 100000));
    } catch (error) {
      console.error("Error fetching car detail:", error);
      toast.error("Failed to load auction details");
    }
  }, [id]);

  const fetchRelatedProducts = useCallback(async () => {
    try {
      const relatedData = await GetAllCatalog();
      setRelatedProducts(relatedData.data.data);
    } catch (error) {
      console.error("Error fetching related products:", error);
      toast.error("Failed to load related products");
    }
  }, []);

  useEffect(() => {
    fetchCarDetail();
    fetchRelatedProducts();
  }, [fetchCarDetail, fetchRelatedProducts]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!productDetail?.end_time) return;

      const today = new Date();
      const [hours, minutes, seconds] = productDetail.end_time.split(':').map(Number);

      const auctionEndTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        hours,
        minutes,
        seconds
      );

      if (auctionEndTime <= today) {
        auctionEndTime.setDate(auctionEndTime.getDate() + 1);
      }

      const timeDifference = auctionEndTime - today;

      if (timeDifference > 0) {
        setTimeLeft({
          days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((timeDifference / 1000 / 60) % 60),
          seconds: Math.floor((timeDifference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timerInterval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timerInterval);
  }, [productDetail?.end_time]);

  const handleIncreaseBid = useCallback(() => {
    setBid(prevBid => prevBid + 1000);
  }, []);

  const handleDecreaseBid = useCallback(() => {
    setBid(prevBid => {
      const minBid = parseFloat(productDetail.starting_price) + 1000;
      return Math.max(prevBid - 1000, minBid);
    });
  }, [productDetail.starting_price]);

  const handleBidNowCardClick = useCallback((carId) => {
    setLoading(true);
    navigate(`/detail/${carId}`);
    setLoading(false);
  }, [navigate]);

  const placeBid = async () => {

    const userId = localStorage.getItem('userId');
    if (!id || !bid) {
      toast.error("Invalid bid data!");
      return;
    }

    const currentBid = parseFloat(productDetail.starting_price);
    const minimumBid = currentBid + 1000;

    if (bid < minimumBid) {
      toast.error(`Bid must be at least ${formatCurrency(minimumBid)}!`);
      return;
    }

    setLoading(true);
    try {
      console.log('Sending bid with data:', {
        auction_id: parseInt(id),
        bid_price: parseFloat(bid),
        user_id: parseInt(userId)
      });

      const response = await CreateBid(
        parseInt(id),
        parseFloat(bid),
        parseInt(userId)
      );

      console.log('Bid response:', response);

      if (response.data?.success) {
        toast.success("Bid placed successfully!");
        await fetchCarDetail();
      } else {
        console.error('Unexpected response format:', response);
        throw new Error(response.data?.message || "Failed to place bid");
      }
    } catch (error) {
      console.error("Full error details:", {
        error,
        response: error.response,
        data: error.response?.data
      });

      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("Please login to place a bid");
            navigate('/login');
            break;
          case 403:
            toast.error("You are not authorized to place bids");
            break;
          case 404:
            toast.error("Auction not found");
            break;
          case 422:
            const errorMessage = error.response.data?.message || "Invalid bid data";
            toast.error(errorMessage);
            break;
          case 500:
            toast.error("Server error. Please try again later.");
            // Log server error details
            console.error("Server Error Details:", {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers
            });
            break;
          default:
            toast.error("Failed to place bid. Please try again.");
        }

        // Refresh data jika perlu
        if (error.response.status !== 401) {
          await fetchCarDetail();
        }
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.message || "Failed to place bid");
      }
    } finally {
      setLoading(false);
    }
  };

  // Render time box component
  const TimeBox = ({ unit, value }) => (
    <div
      key={unit}
      className="time-box text-center p-2 rounded"
      style={{
        width: '100px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6'
      }}
    >
      <strong className="d-block" style={{ fontSize: '1.5rem' }}>
        {value}
      </strong>
      <small className="text-muted text-uppercase">{unit}</small>
    </div>
  );

  // Format currency
  const formatCurrency = (amount) => {
    return parseFloat(amount).toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (


    <div className="container mt-5">
      <div className="row align-items-stretch">
        {/* Car Image Section */}
        <div className="col-md-8 d-flex flex-column">
          <div className="mb-3 flex-grow-1">
            <img
              src={productDetail.car?.image}
              className="img-fluid large-car"
              alt={`${productDetail.car?.brand} ${productDetail.car?.model}`}
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Car Details Section */}
        <div className="col-md-4 d-flex flex-column">
          <h1 className="mb-3">
            <strong>{productDetail.car?.brand} {productDetail.car?.model}</strong>
          </h1>

          {/* Car Specifications */}
          <div className="row">
            <div className="col-6">
              <p><strong>Brand</strong></p>
              <p>{productDetail.car?.brand || 'Unknown'}</p>
              <p><strong>Category</strong></p>
              <p>{productDetail.car?.category}</p>
              <p><strong>Engine Capacity</strong></p>
              <p>{productDetail.car?.capacity}</p>
            </div>
            <div className="col-6">
              <p><strong>Kilometers</strong></p>
              <p>{productDetail.car?.odometer?.toLocaleString()} km</p>
              <p><strong>Transmission</strong></p>
              <p>{productDetail.car?.transmission}</p>
              <p><strong>Condition</strong></p>
              <p>{productDetail.car?.condition}</p>
            </div>
          </div>

          {/* Bid Information */}
          <p><strong>Current Bid</strong></p>
          <p style={{ fontSize: "32px" }}>{formatCurrency(productDetail.starting_price)}</p>
          <p><strong>Auction Date</strong></p>
          <p>{productDetail.auction_date}</p>

          {/* Timer */}
          <div className="mb-3">
            <p><strong>Time Left</strong></p>
            <div className="d-flex justify-content-between">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <TimeBox key={unit} unit={unit} value={value} />
              ))}
            </div>
          </div>

          {/* Bid Controls */}
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleDecreaseBid}
              disabled={loading || bid <= (parseFloat(productDetail.starting_price) + 1000)}
            >
              -
            </button>
            <input
              type="number"
              className="form-control text-center mx-2"
              value={bid}
              min={parseFloat(productDetail.starting_price) + 1000}
              step="1000"
              readOnly
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleIncreaseBid}
              disabled={loading}
            >
              +
            </button>
          </div>
          <br />
          <button
            className="btn btn-dark w-100"
            onClick={placeBid}
            disabled={loading || timeLeft.days === 0 && timeLeft.hours === 0 &&
              timeLeft.minutes === 0 && timeLeft.seconds === 0}
          >
            {loading ? "Placing Bid..." : "Place Bid Now"}
          </button>
        </div>
      </div>

      <div className="content mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>You May Also Like</h1>
          <p className="mb-0">
            <Link
              to="/catalog"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              See more <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </p>
        </div>
        <div className="row g-4">
          {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
              <div className="col-lg-3 col-md-6" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.auction?.car?.image || 'default-image.jpg'}
                    alt={product.auction?.car?.brand}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mb-3">{product.auction?.car?.brand} {product.auction?.car?.model}</h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted small">Kilometers:</span>
                        <span className="small">{product.auction?.car?.odometer}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted small">Transmission:</span>
                        <span className="small">{product.auction?.car?.transmission}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted small">Listed on:</span>
                        <span className="small">{product.auction?.auction_date}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="text-muted small d-block">Starting Price</span>
                        <span className="fw-bold text-dark">
                          Rp. {parseFloat(product.auction?.starting_price).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="text-muted small d-block">Status</span>
                        <span className="fw-bold text-dark">{product.auction?.status}</span>
                      </div>
                    </div>
                    <button
                      className="btn btn-dark mt-auto w-100"
                      disabled={product.auction?.status === "Ongoing" || loading}
                      onClick={() => handleBidNowCardClick(product.auction?.car?.id)}
                    >
                      {loading ? "Loading..." : "Bid Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No related products available.</p>
          )}
        </div>
        <br />
      </div>
    </div>
  );
};

export default Detail;
