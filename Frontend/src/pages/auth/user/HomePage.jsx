import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import './Home.css';
import Video from '../../../assets/videos/vid1.mp4';
import Video2 from '../../../assets/videos/vid2.mp4';
import Image1 from '../../../assets/images/bids1.jpg';
import Image2 from '../../../assets/images/bids2.jpg';
import Image3 from '../../../assets/images/bids3.webp';
import Image4 from '../../../assets/images/car3.jpg';

import { FaMagnifyingGlass } from "react-icons/fa6";
import { RiAuctionLine } from "react-icons/ri";
import { GoChevronRight } from "react-icons/go";
import { GoLinkExternal } from "react-icons/go";
import { GetAllCatalog } from '../../../clients/apiCatalog';

const Home = () => {

    const [cars, setCars] = useState([]); // State to store cars data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to handle errors
    const [searchQuery, setSearchQuery] = useState(''); // State for the search query
    const [filteredCars, setFilteredCars] = useState([]); // State to store the filtered cars
    const [debounceTimeout, setDebounceTimeout] = useState(null); // For debouncing the search

    const [carouselItems] = useState([
        {
            id: 1,
            image: Image1,
            title: 'Toyota Highlander (2017)',
            description: `Last fully redesigned for the 2014 model year, the Toyota Highlander received styling
                        and drivetrain updates for 2017, including a new grille and an available V-6 engine.`,
            detailLink: '/detail',
        },
        {
            id: 2,
            image: Image2,
            title: 'Audi Sport quattro concept (2013)',
            description: `quattro is Audi and Audi is quattro – the brand and the technology are indelibly linked.
                        In celebration of the 30th birthday of the Sport quattro, Audi will present its
                        legitimate successor at the 2013 IAA in Frankfurt am Main. The Audi
                        Sport quattro concept show car continues the grand quattro tradition, with a stunning
                        coupe design and plug-in hybrid drive with a system output of 515 kW (700 hp).`,
            detailLink: '/detail',
        },
        {
            id: 3,
            image: Image3,
            title: 'Peterbilt 379 (2018)',
            description: `Serving as the successor to the 359, the 379 was a conventional-cab truck configured
                        primarily for highway use, serving as the flagship of the Peterbilt model line. During
                        much of its production, the 379 was popular among owner-operator drivers.`,
            detailLink: '/detail',
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await GetAllCatalog();
                console.log(response.data);
                const auctionData = response.data.data.map(item => item.auction);
                const processedData = auctionData.map((auction) => {
                    const auctionEnd = new Date(`${auction.auction_date}T${auction.end_time}`);
                    const now = new Date();
                    const timeDifference = auctionEnd - now;
                    const daysLeft = Math.max(0, Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
                    const hoursLeft = Math.max(0, Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

                    return {
                        id_auction: auction.id,
                        id: auction.car.id,
                        nama: auction.car.brand,
                        kilometers: auction.car.odometer,
                        listedDate: auction.auction_date,
                        harga: auction.starting_price,
                        timeLeft: `${daysLeft}d ${hoursLeft}h`,
                        transmission: auction.car.transmission,
                        category: auction.car.category,
                        image: auction.car?.image || "default.jpg",
                    };
                });

                console.log("Final processed data:", processedData);
                setCars(processedData); // Set the processed data to state
            } catch (err) {
                console.error("Error details:", err);
                setError(`Failed to fetch data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle input change for search
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Debounce the search functionality
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        setDebounceTimeout(
            setTimeout(() => {
                filterCars(query);
            }, 300) // Delay of 300ms
        );
    };

    // Filter cars based on the search query
    const filterCars = (query) => {
        if (!query) {
            setFilteredCars([]);
            return;
        }

        const filtered = cars.filter((car) =>
            car.nama.toLowerCase().includes(query.toLowerCase()) ||
            car.category.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredCars(filtered);
    };
    return (
        <div>
            <head>
                <title>Home</title>
            </head>
            <div className="page-home container-main">
                {/* Video background and landing section tes*/}
                <div className="page-home container-landingP">
                    <video className="page-home videoBackground" autoPlay loop muted playsInline>
                        <source className="page-home videoBackgroundSource" src={Video} type="video/mp4" />
                    </video>
                    <div className="page-home backgroundLanding">
                        <h1 className="page-home TitleTextLanding" id="fadein1">Find Your Dream Car Today</h1>
                        <div className="page-home searchBar">
                            <form action="">
                                <div className="page-home search" id="fadein2">
                                    <FaMagnifyingGlass />
                                    <input
                                        className="page-home search-input"
                                        type="text"
                                        placeholder="Describe what you're looking for..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </form>

                            {/* Display search suggestions or filtered results */}
                            {searchQuery && (
                                <div className="page-home search-results">
                                    {filteredCars.length > 0 ? (
                                        filteredCars.map((car) => (
                                            <div key={car.id} className="search-result-item">
                                                <Link to={`/car/${car.id}`} className="search-result-link">
                                                    <div className="search-result-content">
                                                        <span className="search-result-name">{car.nama} - {car.category}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-results">No cars found matching your search.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="page-home buttonLanding" id="fadein3">
                            <button className="page-home btnA">
                                <a className="page-home btnAlink" href="/catalog">Start Bidding</a>
                            </button>
                            <button
                                onClick={() => document.getElementById('howToBid').scrollIntoView()}
                                className="page-home btnB"
                            >
                                <a className="page-navbar button-nav" href="/information">
                                    How to Bid
                                </a>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="page-home container-carouselz">
                    <div className="page-home carousel-header-container">
                        <div className="page-home carousel-header">
                            <h1>
                                <RiAuctionLine /><br /> Hottest Bids
                            </h1>
                        </div>
                    </div>
                    <div id="myCarousel" className="page-home carousel slide" data-bs-ride="carousel">
                        <ol className="page-home carousel-indicators">
                            {carouselItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    data-bs-target="#myCarousel"
                                    data-bs-slide-to={index}
                                    className={`page-home ${index === 0 ? 'active' : ''}`}
                                ></li>
                            ))}
                        </ol>

                        <div className="page-home carousel-inner">
                            {carouselItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`page-home carousel-item ${index === 0 ? 'active' : ''}`}
                                >
                                    <div
                                        className="page-home overlay-image A"
                                        style={{ backgroundImage: `url(${item.image})` }}
                                    ></div>
                                    <div className="page-home container p-4" style={{ marginLeft: "300px", marginRight: "200px", marginBottom: "100px" }}>
                                        <h1 className="page-home">{item.title}</h1>
                                        <p className="page-home">{item.description}</p>
                                        <a
                                            href="/catalog"
                                            className="page-home btn btn-lg btn-success"
                                            style={{ borderRadius: '4px', padding: '8px', marginTop: '10px', }}
                                        >
                                            Bid Now
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="page-home carousel-control-prev"
                            type="button"
                            data-bs-target="#myCarousel"
                            data-bs-slide="prev"
                        >
                            <span className="page-home carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="page-home visually-hidden">Previous</span>
                        </button>
                        <button
                            className="page-home carousel-control-next"
                            type="button"
                            data-bs-target="#myCarousel"
                            data-bs-slide="next"
                        >
                            <span className="page-home carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="page-home visually-hidden">Next</span>
                        </button>
                    </div>
                </div>


                {/* Featured Cars Section */}
                <div className="page-home d-flex justify-content-between align-items-center mb-1 mt-5 px-5">
                    <h1><strong>Featured Cars</strong></h1>
                    <Link to="/catalog" className="page-home mb-0" style={{ textDecoration: 'none', color: 'black' }}>
                        See more <GoChevronRight />
                    </Link>
                </div>
                <div
                    className="page-home row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4"
                    style={{
                        minHeight: "400px",
                        marginTop: "20px",
                        marginBottom: "20px",
                        marginLeft: "40px",
                        paddingRight: "20px",
                        paddingLeft: "20px",
                        gap: "20px",
                    }}
                >
                    {/* Loading and error states */}
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}

                    {/* Feature cards display */}
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="page-home col card-item"
                            data-category={car.category}
                            style={{ maxWidth: "300px" }}
                        >
                            <div className="page-home card h-80 shadow-sm w-100">
                                <img
                                    src={car.image}
                                    alt={car.nama}
                                    className="page-home card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="page-home card-body d-flex flex-column p-3">
                                    <h5 className="page-home card-title fw-bold mb-3">{car.nama}</h5>
                                    <div className="page-home mb-3">
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted small">Kilometers:</span>
                                            <span className="small">{car.kilometers}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted small">Transmission:</span>
                                            <span className="small">{car.transmission}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="text-muted small">Listed on:</span>
                                            <span className="small">{car.listedDate}</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <span className="text-muted small d-block">Current Bid</span>
                                            <h6 className="fw-bold">Rp. {car.harga}</h6>
                                        </div>
                                        <div>
                                            <span className="text-muted small d-block">Time Left</span>
                                            <h6 className="fw-bold">{car.timeLeft}</h6>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/detail/${car.id}`}
                                        className="btn btn-primary w-100 mt-auto p-2"
                                        style={{ backgroundColor: "black" }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>




                {/* About Us Section */}
                <div className="page-home container-about">
                    <video className="page-home videoBackgroundBot" autoPlay loop muted playsInline>
                        <source className="page-home videoBackgroundSource" src={Video2} type="video/mp4" />
                    </video>
                    <div className="page-home container-aboutCard">
                        <div className="page-home image-about" style={{ backgroundImage: `url(${Image4})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                        <div className="page-home text-about">
                            <h1>About Us.</h1>
                            <p>
                                Our mission is to provide a safe and enjoyable bidding experience, offering a diverse selection of vehicles—from standard to luxury and electric cars—at competitive prices. At Atma Autobid, we are committed to ensuring customer satisfaction through innovative technology and dedicated support. Join us today and find your dream car!
                            </p>
                            <a href="https://www.instagram.com/kevintannms/" className="page-home btn btn-lg btn-secondary aboutButton" style={{ borderRadius: '4px', padding: '5px', marginTop: '0px' }}>
                                Contact Us <GoLinkExternal />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
