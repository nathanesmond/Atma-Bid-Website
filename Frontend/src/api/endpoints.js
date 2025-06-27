export const ENDPOINTS = {
    GET_ALL_CAR_CATALOGS: "/car-catalogs",
    CREATE_CAR_CATALOGS: "/car-catalogs",
    SHOW_CAR_CATALOG: (id) => `/car-catalogs/${id}`,
    UPDATE_CAR_CATALOG: (id) => `/car-catalogs/${id}`,
    DELETE_CAR_CATALOG: (id) => `/car-catalogs/${id}`,

    GET_ALL_CAR: "/cars",
    CREATE_CAR: "/cars",
    SHOW_CAR: (id) => `/cars/${id}`,
    UPDATE_CAR: (id) => `/cars/${id}`,
    DELETE_CAR: (id) => `/cars/${id}`,

    GET_ALL_AUCTION: "/auctions",
    CREATE_AUCTION: "/auctions",
    SHOW_AUCTION: (id) => `/auctions/${id}`,
    UPDATE_AUCTION: (id) => `/auctions/${id}`,
    DELETE_AUCTION: (id) => `/auctions/${id}`,

    REGISTER: "/register",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    LOGOUT: "/logout",

    ADMIN_GET_ALL_USER: "/getAllUser",
    ADMIN_GET_ALL_AUCTION: "/getAllAuction",
    ADMIN_UPDATE_AUCTION: (id) => `/updateAuction/${id}`,
    ADMIN_UPDATE_USER_STATUS: (id) => `/updateUserStatus/${id}`,
    ADMIN_DELETE_USER: (id) => `/deleteUser/${id}`,

    GET_ALL_UPCOMING: "/auctions/upcoming",

    CREATE_BID: "/bids",

    GET_PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    CHANGE_PASSWORD: "/user/change-password",
};
