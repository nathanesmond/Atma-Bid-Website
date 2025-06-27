import React from "react";
import { FaUserCircle, FaIdBadge, FaCar, FaGavel, FaExternalLinkAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import './Information.css';
import Video2 from '../assets/videos/vid2.mp4';
import Image4 from '../assets/images/car3.jpg';
import { GoLinkExternal } from "react-icons/go";

const Information = () => {
  const scrollHowToBid = () => {
    document.getElementById("howtobid").scrollIntoView({ behavior: "smooth" });
  };

  const styles = {
    timelineHeader: {
      textAlign: "center",
      margin: "30px 0px",
      color: "#343a40",
    },
    timeline: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    containerHowToBid: {
      display: "flex",
      justifyContent: "space-between",
      margin: "20px 0",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#ffffff",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      width: "80%",
    },
    numberContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#000000",
      color: "white",
      fontSize: "24px",
      fontWeight: "bold",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
    textBox: {
      marginLeft: "20px",
      flex: 1,
    },
    aboutContainer: {
      position: "relative",
      marginTop: "50px",
      textAlign: "center",
      backgroundColor: "#f8f9fa",
      padding: "50px 0",
    },
    aboutContent: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "800px",
      margin: "0 auto",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    teamContainer: {
      backgroundColor: "#ffffff",
      padding: "50px 0",
      textAlign: "center",
    },
    teamContent: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "0 20px",
    },
    teamGrid: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      marginTop: "30px",
    },
    teamMember: {
      width: "200px",
      backgroundColor: "#f8f9fa",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
      marginTop: "20px",
    },
  };

  const teamMembers = [
    { 
      name: "Kevin Philips Tanamas", 
      role: "220711789", 
      description: "Automotive industry veteran with 15 years of experience in online marketplaces." 
    },
    { 
      name: "Nathanael Esmond Hartono", 
      role: "220711888", 
      description: "Expert in building scalable web platforms and passionate about automotive technology." 
    },
    { 
      name: "Stanyslaus Hary Muntoro", 
      role: "220712140", 
      description: "Dedicated to creating seamless and trustworthy auction experiences for our users." 
    },
    { 
      name: "Marsella Adinda", 
      role: "220712081", 
      description: "Creative mind behind our platform's intuitive and user-friendly interface." 
    }
  ];

  return (
    <div>
      <div style={styles.timelineHeader}>
        <h1><strong>How to Bid</strong></h1>
        <p>Follow these easy steps to start your bidding journey!</p>
      </div>

      <div style={styles.timeline}>
        {[
          { number: 1, title: "Register an Account", description: "Before you can start bidding on your dream vehicle, the first step is to register an account with us. Registration is easy and quick! By signing up, you gain full access to our platform, allowing you to participate in all auctions and keep track of your bids.", icon: <FaUserCircle size={24} /> },
          { number: 2, title: "Verify your Identity", description: "Before you can start bidding on vehicles, we need to make sure that you are a legitimate buyer. Identity verification is an essential step in the process to maintain the integrity of our marketplace and ensure the security of both buyers and sellers.", icon: <FaIdBadge size={24} /> },
          { number: 3, title: "Search for your Dream Vehicle", description: "Once your account is verified, it’s time to search for the vehicle you’ve been dreaming about. Whether you’re looking for a sports car, an everyday commuter vehicle, or something unique, we have a wide range of options available. Finding your perfect match is easy, thanks to our powerful search tools.", icon: <FaCar size={24} /> },
          { number: 4, title: "Start Bidding", description: "Now that you’ve found the vehicle you want and are familiar with its details, it’s time to start bidding. Bidding is an exciting and competitive process!", icon: <FaGavel size={24} /> },
        ].map((step, index) => (
          <div key={index} style={styles.containerHowToBid}>
            <div style={styles.numberContainer}>{step.number}</div>
            <div style={styles.textBox}>
              <h4>{step.title}</h4>
              <p>{step.description}</p>
              <span>{step.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.aboutContainer}>
        <div style={styles.aboutContent}>
          <h2 className="mb-4"><strong>About Us</strong></h2>
          <p>
            We are passionate about connecting car enthusiasts with their dream vehicles. Our platform 
            is designed to provide a transparent, secure, and exciting auction experience for buyers 
            and sellers alike. With years of experience in the automotive marketplace, we understand 
            the thrill of finding the perfect vehicle and the importance of a trustworthy platform.
          </p>
          <p>
            Our mission is to simplify the car buying process by offering a wide selection of vehicles, 
            robust verification processes, and a user-friendly bidding system. Whether you're a collector, 
            a first-time buyer, or searching for a specific model, we're here to make your automotive 
            dreams a reality.
          </p>
        </div>
      </div>

      <div style={styles.teamContainer}>
        <div style={styles.teamContent}>
          <h2><strong>Meet Our Innovative Team</strong></h2>
          <p>
            Behind our vehicle auction platform is a dedicated team of professionals 
            who are passionate about revolutionizing the way people buy and sell vehicles. 
            Our diverse team brings together expertise from automotive, technology, 
            design, and customer experience domains.
          </p>
          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} style={styles.teamMember}>
                <h4>{member.name}</h4>
                <h5 className="text-muted">{member.role}</h5>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
