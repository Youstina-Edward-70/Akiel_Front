const BASE_URL = "https://all-restaurants-in-one.vercel.app"; // Backend URL

export const API_ENDPOINTS = {
    // --- Contact ---
    CONTACT: {
        SEND_MESSAGE: `${BASE_URL}/contact`, // POST
    },

    // --- Home Page ---
    RESTAURANTS: {
        LIST: `${BASE_URL}/restaurants`,
        POPULAR: `${BASE_URL}/restaurants?Top=4`,
    },

    // --- Restaurant Details ---
    DETAILS: {
        // Take Restaurant ID
        // Reading
        GET_BY_ID: (id: string) => `${BASE_URL}/restaurants/${id}`, // GET
        GET_FULL_DETAILS: (id: string) =>
            `${BASE_URL}/restaurants/${id}/details?select=menu&select=reviews&select=gallery`, // GET
    },

    // --- User Data ---
    USER: {
        PROFILE: (userId: string) => `${BASE_URL}/user/getUserProfile/${userId}`, // GET
        EDIT_PROFILE: (userId: string) => `${BASE_URL}/user/editUserProfile/${userId}`, // PATCH
        UPLOAD_PHOTO: `${BASE_URL}/user/uploadProfilePhoto`, // PATCH
        DELETE_PHOTO: (userId: string) => `${BASE_URL}/user/deleteProfilePhoto/${userId}`, // DELETE
        DELETE_ACCOUNT: (userId: string) => `${BASE_URL}/user/deleteAccount/${userId}`, // DELETE
        
        REVIEWS: {
            GET_MY_REVIEWS: `${BASE_URL}/reviews/my-reviews`, // GET
            ADD_OR_UPDATE_REVIEW: (restaurantId: string) => `${BASE_URL}/reviews/add-review/${restaurantId}`, // POST
            DELETE_REVIEW: (restaurantId: string) =>
                `/reviews/delete-review/${restaurantId}`, // DELETE
        },

        FAVORITES: {
            GET_MY_FAVORITES: `${BASE_URL}/favorites`, // GET
            TOGGLE: (id: string) => `${BASE_URL}/favorites/${id}`, // POST / DELETE (add to or remove rest from favorite list)
        },
    },

    // --- Owner Dashboard ---
    OWNER: {
        MY_RESTAURANT: `${BASE_URL}/user/my/dashboard`, // GET
        MY_NOTIFICATIONS: `${BASE_URL}/notifications`, // GET
        CREATE_RESTAURANT: `${BASE_URL}/restaurants`, // POST
        UPDATE_RESTAURANT: (id: string) => `${BASE_URL}/restaurant-data/main-data/${id}`, // PUT
        DELETE_RESTAURANT: (id: string) => `${BASE_URL}/restaurants/${id}`, // DELETE

        // Cover Photo Actions
        COVER: {
            UPLOAD_OR_UPDATE_COVER: (restId: string) => `${BASE_URL}/restaurant-data/coverImage/${restId}`, // POST
            DELETE_COVER: (restId: string) => `${BASE_URL}/restaurant-data/coverImage/${restId}`, // DELETE
        },

        // Menu Actions
        MENU: {
            ADD_DISH: (restId: string) => `${BASE_URL}/restaurant-data/menu/${restId}`, // POST
            GET_DISH: (restId: string, itemId: string) => `${BASE_URL}/restaurant-data/menu/${restId}/${itemId}`, // GET
            UPDATE_DISH: (restId: string, itemId: string) => `${BASE_URL}/restaurant-data/menu/${restId}/${itemId}`, // PUT
            DELETE_DISH: (restId: string, itemId: string) => `${BASE_URL}/restaurant-data/menu/${restId}/${itemId}` // DELETE
        },

        // Photos Actions
        PHOTOS: {
            UPLOAD_PHOTO: (restId: string) => `${BASE_URL}/restaurant-data/gallery/${restId}`, // POST
            DELETE_PHOTO: (restId: string, photoId: string) => `${BASE_URL}/restaurant-data/gallery/${restId}/${photoId}`, // DELETE
        },
    },

    // --- Admin Dashboard ---
    ADMIN: {
        REQUESTS: {
            GET_ALL_REQUESTS: `${BASE_URL}/admin/requests`, // GET
            GET_ONE_REQUEST: (requestId: string) => `${BASE_URL}/admin/requests/${requestId}`, // GET
            ACCEPT_OR_REGECT_RESTAURANT: (requestId: string) => `${BASE_URL}/admin/requests/${requestId}/decision`, // POST
        },
        USERS: {
            GET_ALL_USERS: `${BASE_URL}/user/getAllUsers`, // GET
            GET_ONE_USER: (userId: string) => `${BASE_URL}/user/getUserProfile/${userId}`, // GET
            EDIT_USER: (userId: string) => `${BASE_URL}/user/editUserProfile/${userId}`, // PATCH
            DELETE_USER: (userId: string) => `${BASE_URL}/user/deleteAccount/${userId}`, // DELETE
        },
        SETTIGNS: {
            GET_SETTINGS: `${BASE_URL}/admin/settings`, // GET
            EDIT_SETTINGS: `${BASE_URL}/admin/settings`, // PUT
        }
    },

    // --- Auth ---
    AUTH: {
        REGISTER: `${BASE_URL}/auth/register`, // POST
        LOGIN: `${BASE_URL}/auth/login`, // POST
        FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`, // POST
        VERIFY_OTP: `${BASE_URL}/auth/verify-otp`, // POST
        RESET_PASSWORD: `${BASE_URL}/auth/reset-password`, // PATCH
        CHANGE_PASSWORD: `${BASE_URL}/user/changePassword`, // PATCH
    }
};