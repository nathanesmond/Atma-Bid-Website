import React, { useState, useEffect } from 'react';
import { FaEdit, FaUser, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GetProfile, UpdateProfile, ChangePassword } from "../clients/apiUser"; 
import carImage from '../assets/images/car10.png';
import profile from '../assets/images/profile.png';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    full_name: '',
    phone_number: '',
    status: '',
    photo_profile: profile,
    identity_number: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true); 
        const response = await GetProfile();
        setFormData({
          username: response.data.user.username || '',
          password: response.data.user.password || '',
          email: response.data.user.email || '',
          full_name: response.data.user.full_name || '',
          phone_number: response.data.user.phone_number || '',
          identity_number: response.data.user.identity_number || null,
          status: response.data.user.status,
          photo_profile: response.data.user.photo_profile,
          identity_number: response.data.user.identity_number,
        });
      } catch (err) {
        console.error("Error details:", err); 
        setError(`Failed to fetch profile data: ${err.message}`);
      } finally {
        setLoading(false); 
      }
    };

    fetchProfileData();
  }, []); 

  const handleEnableEdit = () => {
    setIsEditing(true);
  };

  const handleDisableEdit = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {  
      const formDataToSend = new FormData();

      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("full_name", formData.full_name);
      formDataToSend.append("phone_number", formData.phone_number);
      formDataToSend.append("identity_number", formData.identity_number);
      formDataToSend.append("status", formData.status);
  
      if (formData.photo_profile && formData.photo_profile instanceof File) {
        formDataToSend.append("photo_profile", formData.photo_profile);
      }

      console.log("Sending FormData:", Object.fromEntries(formDataToSend.entries()));
  
      const response = await UpdateProfile(formDataToSend);
      
      console.log('Profile updated successfully:', response);
      const updatedProfile = await GetProfile();
      setFormData({
        username: updatedProfile.data.user.username || '',
        email: updatedProfile.data.user.email || '',
        full_name: updatedProfile.data.user.full_name || '',
        phone_number: updatedProfile.data.user.phone_number || '',
        identity_number: updatedProfile.data.user.identity_number || '',
        status: updatedProfile.data.user.status || '',
        photo_profile: updatedProfile.data.user.photo_profile || '',
      });
      toast('Profile updated successfully!');
      handleShowAbout();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast('Failed to update profile. Please try again.');
    }
  };  

  const handleChange = (e) => {
    const { id, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleShowAbout = () => {
    setIsPasswordChange(false);
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }

    try {
      setLoading(true); // Set loading state to true while making the API call
      const response = await ChangePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      });

      if (response.data.status === "success") {
        setSuccessMessage(response.data.message);
        setErrorMessage(""); // Clear any previous errors
        // Reset form fields after successful password change
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success('Password updated successfully!');
      } else {
        setErrorMessage(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowChangePassword = () => {
    setIsPasswordChange(true);
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    toast('Password updated successfully!');
    handleShowAbout();
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          photo_profile: reader.result // Simpan file dalam bentuk base64 ke state
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="container mt-4 mb-5" style={{ width: '800px' }}>
      <div className="profile-container shadow p-4 rounded" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '1.5rem', borderRadius: '0.375rem' }}>
        <div className="profile-header">
          <img src={carImage} alt="Car" className="img-fluid" style={{
            width: '100%',  
            height: '200px',            
            objectFit: 'cover',        
            padding: '2px',           
            borderRadius: '8px'        
          }} />
        </div>

        <div className="profile-avatar-container d-flex justify-content-center align-items-center position-relative">
          <div className="profile-avatar mr-3" style={{
            position: 'absolute',
            top: '30px',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            zIndex: '50',
            cursor: isEditing ? 'pointer' : 'default'
          }}onClick={() => isEditing && document.getElementById('fileInput').click()}
          >
            <img src={formData.photo_profile ? formData.photo_profile : profile} alt="Profile" className="rounded-circle" width="150" style={{
              width: '50%',
              height: '50%',
              objectFit: 'cover',
              borderRadius: '50%'
            }}/>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }} // Input file disembunyikan
            onChange={(e) => handleFileChange(e)} // Handle perubahan file
            accept="image/*"
          />
          <div className="position-absolute mt-5" style={{ right: 0, top: '160%', transform: 'translateY(-50%)' }}>
            <button className="btn btn-primary" onClick={handleEnableEdit}>
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-nav text-left mt-4">
          <button
            className={`btn ${!isPasswordChange ? 'btn-secondary active' : 'btn-light'}`}
            onClick={handleShowAbout}
          >
            <FaUser /> About
          </button>
          <button
            className={`btn ${isPasswordChange ? 'btn-secondary active' : 'btn-light'}`}
            onClick={handleShowChangePassword}
          >
            <FaLock /> Change Password
          </button>
        </div>

        <div className="w-100 mt-2 mb-3">
          <hr />
        </div>

        <div className="profile-content mb-5">
          {!isPasswordChange && (
            <div id="about" className="content-section">
              <form className="profile-form">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-bold">Username</label>
                  <input type="text" id="username" value={formData.username} className="form-control" disabled/>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold">Email</label>
                  <input type="email" id="email" value={formData.email} disabled={!isEditing} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="full_name" className="form-label fw-bold">Full Name</label>
                  <input type="text" id="full_name" value={formData.full_name} disabled={!isEditing} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone_number" className="form-label fw-bold">Phone Number</label>
                  <input type="tel" id="phone_number" value={formData.phone_number} disabled={!isEditing} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="ektp" className="form-label fw-bold">E-KTP</label>
                  <p style={{ fontSize: '12px', fontStyle: 'italic', textAlign: 'justify' }}>
                    Based on PERDIRJEND NO 3.KN.2016 concerning PMPJ (Implementation of the Principles of Knowing Your Customer), users are required to submit their KTP (Indonesian National Identity Card)
                  </p>
                  <input type="file" id="image" name="image" value={formData.identity_number} disabled={!isEditing} onChange={handleChange} className="form-control" />
                </div>

                <div className="mb-3 fw-bold">
                  <label style={{ marginBottom: '10px' }}>Status</label>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: formData.status === 'Active' ? '#28a745' : '#dc3545', 
                        color: 'white',
                        padding: '5px 20px',
                        borderRadius: '5px',
                        fontWeight: 'normal',
                      }}
                    >
                      {formData.status}
                    </span>
                  </div>
                </div>

                {isEditing && (
                  <div id="editprofile" className="d-flex justify-content-end align-items-center mt-3">
                    <button
                      className="btn btn-outline-dark"  // Apply custom styling for cancel button
                      onClick={handleDisableEdit}
                      style={{ borderColor: '#333', color: '#333', marginRight: '10px', width: '150px'}}  // Custom color and border for the cancel button
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleSave}
                      style={{ backgroundColor: '#333', color: '#fff', width: '150px'}}
                    >
                      Save
                    </button>
                  </div>
                )}
              </form>
              <ToastContainer />
            </div>
          )}

          {isPasswordChange && (
            <div id="change-password" className="content-section">
              <h3>Change Password</h3>
              <form className="profile-form" onSubmit={handleChangePassword}>
                <label htmlFor="current-password">Current Password</label>
                <input type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="form-control" />

                <label htmlFor="new-password">New Password</label>
                <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="form-control" />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="form-control" />

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <div className="button-group mt-3 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handleShowAbout}
                    style={{ marginRight: '10px' }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark">{loading ? 'Saving...' : 'Save'}</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;