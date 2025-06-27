import React, { useState, useEffect } from "react";
import { FaUsers, FaGavel } from "react-icons/fa";
import {
  GetAllAuction,
  GetAllUser,
  UpdateUserAuction,
} from "../../../clients/apiAdmin";
import { toast, ToastContainer } from "react-toastify";
import { CreateAuction, DeleteAuction } from "../../../clients/apiAuction";
import { GetAllCars } from "../../../clients/apiCar";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ManageBids = () => {
  const currentMonth = new Date().getMonth();
  const monthNames = [
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
  ];
  const navigate = useNavigate();

  const [month, setMonth] = useState(monthNames[currentMonth]);
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [auctionsPerPage] = useState(5);

  const formatDateTime = (date, time) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    const formattedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}`);
    const dayName = days[formattedDate.getDay()];
    const monthName = months[formattedDate.getMonth()];

    return `${dayName}, ${day} ${monthName} ${year} pukul ${hour}:${minute}`;
  };

  const fetchCars = async () => {
    try {
      const response = await GetAllCars();
      setCars(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Gagal memuat data mobil.");
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await GetAllUser();
      setUsers(response.data.users || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Gagal memuat data pengguna.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      const response = await GetAllAuction();
      const auctionData = response.data.users || [];
      setAuctions(auctionData);
      filterAuctionsByMonth(auctionData, monthNames[currentMonth]);
    } catch (err) {
      console.error("Error fetching auctions:", err);
      setError("Gagal memuat data lelang.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAuctions();
  }, []);

  useEffect(() => {
    filterAuctionsByMonth(auctions, month);
  }, [month, auctions]);

  const filterAuctionsByMonth = (data, selectedMonth) => {
    const filtered = data.filter((auction) => {
      const auctionMonth = new Date(auction.auction_date).getMonth();
      return monthNames[auctionMonth] === selectedMonth;
    });
    setFilteredAuctions(filtered);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await UpdateUserAuction(id, { status: newStatus });
      const updatedAuctions = auctions.map((auction) =>
        auction.id === id ? { ...auction, status: newStatus } : auction
      );
      setAuctions(updatedAuctions);
      toast.success("Berhasil mengupdate status auction");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Gagal memperbarui status.");
    }
  };

  const handleDeleteButton = async (id) => {
    try {
      console.log(id);
      await DeleteAuction(id);
      fetchUsers();
      toast.success("Auction berhasil dihapus");
    } catch (err) {
      console.error("Error delete auction:", err);
      toast.error("Auction gagal dihapus");
    }
  };

  const indexOfLastAuction = currentPage * auctionsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
  const currentAuctions = auctions.slice(
    indexOfFirstAuction,
    indexOfLastAuction
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard" style={{ padding: "1rem" }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Dashboard</h1>

      {/* Statistics */}
      <div
        className="statistics"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <StatCard
          title="Total Pengguna"
          value={users.length}
          icon={<FaUsers size={50} color="#00AAB6" />}
        />
        <StatCard
          title="Total Lelang"
          value={auctions.length}
          icon={<FaGavel size={50} color="#00AAB6" />}
        />
      </div>

      {/* Table Section */}
      <div
        className="table-card"
        style={{ overflowX: "auto", marginTop: "20px" }}
      >
        <div
          className="header"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h4>List Lelang</h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              width: "25rem",
            }}
          >
            <select
              className="form-select"
              name="months"
              id="months"
              style={{
                maxHeight: "40px",
                maxWidth: "10rem",
                marginBottom: "1rem",
              }}
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {monthNames.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary"
              style={{
                backgroundColor: "#00AAB6",
                border: "none",
                borderRadius: "50px",
                maxHeight: "40px",
                width: "14rem",
              }}
              onClick={() => navigate("/addBid")}
            >
              Tambah Lelang
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              className="table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr>
                  <th>Id Lelang</th>
                  <th>Id Pengguna</th>
                  <th>Waktu Mulai</th>
                  <th>Waktu Selesai</th>
                  <th>Harga Awal</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentAuctions.map((auction) => (
                  <tr key={auction.id}>
                    <td>{auction.id}</td>
                    <td>{auction.user_id}</td>
                    <td>
                      {formatDateTime(auction.auction_date, auction.start_time)}
                    </td>
                    <td>
                      {formatDateTime(auction.auction_date, auction.end_time)}
                    </td>
                    <td>{`Rp${auction.starting_price}`}</td>
                    <td>
                      <select
                        value={auction.status}
                        onChange={(e) =>
                          handleStatusChange(auction.id, e.target.value)
                        }
                        style={{
                          backgroundColor:
                            auction.status === "Ongoing"
                              ? "#d4edda"
                              : auction.status === "Upcoming"
                              ? "#fff3cd"
                              : "#cce5ff",
                          color:
                            auction.status === "Ongoing"
                              ? "green"
                              : auction.status === "Upcoming"
                              ? "orange"
                              : "blue",
                          fontWeight: "bold",
                          padding: "5px",
                          borderRadius: "5px",
                          border: "none",
                        }}
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Finished">Finished</option>
                      </select>
                    </td>
                    <td>
                      <button
                        style={{
                          border: "none",
                          background: "none",
                          color: "red",
                          marginLeft: "0.8rem",
                        }}
                        onClick={() => handleDeleteButton(auction.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              {Array.from({
                length: Math.ceil(auctions.length / auctionsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  style={{
                    margin: "0 5px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    backgroundColor:
                      currentPage === index + 1 ? "#00AAB6" : "#f0f0f0",
                    color: currentPage === index + 1 ? "white" : "black",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div
      className="stat-item"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        minWidth: "150px",
      }}
    >
      <div>
        <p>{title}</p>
        <h1>{value}</h1>
      </div>
      {icon}
    </div>
  );
};

export default ManageBids;
