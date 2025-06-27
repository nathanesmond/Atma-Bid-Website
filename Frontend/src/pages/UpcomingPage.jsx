import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAllUpcoming } from "../clients/apiUpcoming";

const Upcoming = () => {
  const [loading, setLoading] = useState(true);
  const [dataMobil, setDataMobil] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = (auctionDate, startTime) => {
    const targetDate = new Date(`${auctionDate}T${startTime}`);
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff <= 0) return "00d 00h 00m 00s";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GetAllUpcoming();
        setDataMobil(response.data.data || []);
      } catch (error) {
        console.error("Error fetching upcoming cars:", error);
        setDataMobil([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimeLeft = {};
      dataMobil.forEach((car) => {
        updatedTimeLeft[car.id] = calculateTimeLeft(car.auction_date, car.start_time);
      });
      setTimeLeft(updatedTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [dataMobil]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (category) => setSelectedCategory(category);

  const filteredCars = dataMobil.filter((car) => {
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
    const matchesSearch =
      car.car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const DisabledLink = ({ to, disabled, children, ...props }) => {
    return disabled ? (
      <span
        className="btn btn-dark mt-auto w-100 disabled-link"
        style={{ opacity: 0.5, cursor: "not-allowed" }}
      >
        {children}
      </span>
    ) : (
      <Link to={to} className="btn btn-dark mt-auto w-100" {...props}>
        {children}
      </Link>
    );
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Upcoming Auctions</h1>
        <p className="text-muted">
          Discover our upcoming vehicle lineup at Atma AutoBid, featuring the latest and most anticipated
          models ready to be auctioned. Stay ahead and explore the next wave of high-quality vehicles before anyone else.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          {["All", "Standard", "Luxury", "EV"].map((cat) => (
            <button
              key={cat}
              className={`btn btn-outline-dark ${cat === selectedCategory ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search vehicles..."
          style={{ maxWidth: "300px" }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Cards Section */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4" style={{ minHeight: "400px" }}>
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car.id}
                className="col-lg-3 col-md-6 card-item"
                data-category={car.category}
              >
                <div className="card h-100 shadow-sm position-relative">
                  {/* "Coming Soon" Badge */}
                  <div
                    className="coming-soon-badge position-absolute top-0 start-0 p-2 bg-dark text-white fw-bold"
                    style={{ zIndex: 10 }}
                  >
                    Upcoming
                  </div>
                  <img
                    src={car.car.image}
                    alt={`${car.car.brand} ${car.car.model}`}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold mb-3">
                      {`${car.car.brand} ${car.car.model}`}
                    </h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted small">Kilometers:</span>
                        <span className="small">{car.car.odometer} km</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted small">Transmission:</span>
                        <span className="small">{car.car.transmission}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted small">Condition:</span>
                        <span className="small">{car.car.condition}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <span className="text-muted small d-block">Starting Price</span>
                        <span className="fw-bold text-dark">
                          Rp. {parseFloat(car.starting_price).toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="text-end">
                        <span className="text-muted small d-block">Time to Bid</span>
                        <span className="fw-bold text-danger">
                          {timeLeft[car.id] || "Loading..."}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-dark mt-auto w-100"
                      disabled
                      style={{
                        opacity: 0.5,
                        cursor: "not-allowed",
                      }}
                    >
                      Bid Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No upcoming auctions found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Upcoming;
