import React, { useState,useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { GetAllAuction,DeleteAuction } from '../clients/apiAuction';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const MyBid = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('januari');
  const [showModal, setShowModal] = useState(false);
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [auctionToDelete, setAuctionToDelete] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await GetAllAuction();
        setAuctions(response.data.data); 
      } catch (error) {
        console.error("Error fetching auctions", error);
        toast.error("Failed to fetch auctions.");
      }
    };
    
    fetchAuctions();
  }, []);

  const indexOfLastAuction = currentPage * itemsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - itemsPerPage;
  const currentAuctions = auctions.slice(indexOfFirstAuction, indexOfLastAuction);

  const totalPages = Math.ceil(auctions.length / itemsPerPage);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDeleteClick = (auctionId) => {
    setAuctionToDelete(auctionId); 
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setAuctionToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (auctionToDelete) {
      try {
        await DeleteAuction(auctionToDelete);
        toast.success("Auction deleted successfully.");
        setAuctions(auctions.filter(auction => auction.id !== auctionToDelete));
      } catch (error) {
        console.error("Error deleting auction", error);
        toast.error("Failed to delete auction.");
      }
    }
    setShowModal(false);
    setAuctionToDelete(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5" style={{ marginBottom: '15rem' }}>
      <div className="dashboard" style={{ height: '40rem', marginTop: '2rem' }}>
        <div className="table-card">
          <div className="header">
            <h2>List Lelang Saya</h2>
            <div style={{ display: 'flex' }}>
              <select
                className="form-select"
                name="months"
                id="months"
                style={{ maxHeight: '40px', maxWidth: '10rem', marginRight: '20px' }}
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((month, index) => (
                  <option key={index} value={month.toLowerCase()}>
                    {month}
                  </option>
                ))}
              </select>
              <Link
                to="/addBid" 
                className="btn btn-primary"
                style={{
                  marginBottom: '20px',
                  backgroundColor: '#00AAB6',
                  border: 'none',
                  borderRadius: '50px',
                  maxHeight: '40px',
                  width: '14rem',
                }}
              >
                Tambah Lelang
              </Link>
            </div>
          </div>

          <table className="table ">
            <thead>
              <tr>
                <th>Id Lelang</th>
                <th>Waktu Mulai</th>
                <th>Waktu Selesai</th>
                <th>Harga Awal</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {currentAuctions.length > 0 ? (
                currentAuctions.map((auction) => (
                  <tr key={auction.id}>
                    <td>{auction.id}</td>
                    <td>{auction.start_time}</td>
                    <td>{auction.end_time}</td>
                    <td>{auction.starting_price}</td>
                    <td>
                      <span className={`status ${auction.status.toLowerCase()}`}>{auction.status}</span>
                    </td>
                    <td className="d-flex justify-content-between align-items-center">
                      <Link
                        to={`/editBid/${auction.id}`} // Navigate to the edit page
                        className="btn btn-primary"
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          padding: '5px',
                          marginRight: '10px',
                        }}
                      >
                        <FaPencilAlt style={{ color: 'blue' }} />
                      </Link>

                      <button
                        className="btn delete d-flex align-items-center"
                        onClick={() => handleDeleteClick(auction.id)}
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          padding: '5px',
                        }}
                      >
                        <FaTrashAlt style={{ color: 'red' }} />
                      </button>

                      {/* Modal for confirmation */}
                      {showModal && (
                        <div
                          className="modal fade show"
                          style={{ display: 'block', zIndex: 1050 }}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header" style={{ position: 'relative' }}>
                                <h5 className="modal-title" id="exampleModalLabel" style={{ color: 'black' }}>
                                  Delete
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                  onClick={handleCancel}
                                  style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '15px',
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '1.5rem',
                                    color: '#000',
                                  }}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">Are you sure you want to delete this item?</div>
                              <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                  Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No auctions available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo; Previous</button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next &raquo;</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MyBid;