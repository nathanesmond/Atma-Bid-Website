import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { CreateAuction } from "../clients/apiAuction";
import { GetAllCars } from "../clients/apiCar";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AddBid = () => {
  const [startingPrice, setStartingPrice] = useState('');
  const [auctionDate, setAuctionDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [auctionTitle, setAuctionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [address, setAddress] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [cars, setCars] = useState([]); // Menyimpan data mobil dari API
  const [selectedCarId, setSelectedCarId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    GetAllCars()
      .then((response) => {
        console.log(response.data.data); 
        if (response.data && Array.isArray(response.data.data)) {
          setCars(response.data.data);
        } else {
          console.error('Expected data to be an array but got:', response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCarId) {
        console.error('Please select a car');
        return;
    }

    const formData = new FormData();
    formData.append('car_id', selectedCarId);
    formData.append('starting_price', startingPrice);
    formData.append('auction_date', auctionDate);
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);
    formData.append('status', 'Upcoming');
    formData.append('title', auctionTitle);
    formData.append('description', description);
    formData.append('address', address);

    if (image) {
        formData.append('image', image);
        console.log('Image file:', image.name); // Log image name
    }

    console.log('Form data to be sent:', {
        car_id: selectedCarId,
        starting_price: startingPrice,
        auction_date: auctionDate,
        start_time: startTime,
        end_time: endTime,
        status: 'Upcoming',
        title: auctionTitle,
        description: description,
        address: address,
        image: image ? image.name : 'No image'
    });

    try {
      const response = await CreateAuction(formData);
      console.log('Auction created successfully:', response);
      toast.success("Auction created successfully")
      navigate('/add');
    } catch (error) {
      console.error('Error creating auction:', error);
      
      // Jika ada response dari server
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else {
        console.error('Error message:', error.message);
      }
    }
};

  return (
    <div className="container-main" style={{ marginBottom: '25rem' }}>
      <div className="content">
        <div className="container text-center pt-5">
          <h1 className="title pt-2">Sell Your Vehicle</h1>
          <p>
            Welcome to the Atma AutoBid platform, where you can effortlessly sell your vehicle and reach a wider
            audience. Whether you're looking to list a car for auction or sell it outright, our user-friendly interface
            makes the process simple and efficient. Join us today and unlock the potential of your vehicle!
          </p>
        </div>

        <div className="container mt-2 mb-3">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="carModel" className="form-label">Car Model</label>
                <select
                  className="form-control"
                  id="carModel"
                  name="carModel"
                  value={selectedCarId} // The selected car's ID will be stored here
                  onChange={(e) => setSelectedCarId(e.target.value)} // Updates the selected car ID
                  required
                >
                  <option value="">Select Car</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}> 
                      {car.model} - {car.brand} {/* Display model and brand in the dropdown */}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="startingPrice" className="form-label">Starting Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="startingPrice"
                  name="startingPrice"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="auctionDate" className="form-label">Auction Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="auctionDate"
                  name="auctionDate"
                  value={auctionDate}
                  onChange={(e) => setAuctionDate(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="startTime" className="form-label">Start Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="startTime"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endTime" className="form-label">End Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="endTime"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="auctionTitle" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="auctionTitle"
                  name="auctionTitle"
                  value={auctionTitle}
                  onChange={(e) => setAuctionTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="carpicture">Car Pictures</label>
                <input
                  required
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="nav-icon fas fa-check"></i>
                <span> Submit</span>
              </button>
            </form>
          </div>
        </div>

        {isToastVisible && (
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" className="toast text-bg-primary" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
              <div className="toast-body">
                <i className="fa-solid fa-check me-3" style={{ color: '#ffffff' }}></i>
                Congratulations! You have successfully added your auction. Please wait for confirmation from the admin.
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        body {
            font-family: 'Roboto', sans-serif;
        }

        .form-container {
            max-width: 1500px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 10px;
            background-color: #f9f9f9;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-top: 50px;
        }
      `}</style>
    </div>
  );
};

export default AddBid;