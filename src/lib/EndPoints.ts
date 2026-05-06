const BASE_URL = "https://all-restaurants-in-one.vercel.app"; // Backend URL

export const API_ENDPOINTS = {
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
        PROFILE: `${BASE_URL}/auth/profile`,
        UPDATE_PROFILE: `${BASE_URL}/user/update`,
        REVIEWS: {
            GET_MY_REVIEWS: `${BASE_URL}/reviews/my-reviews`, // GET
            ADD_OR_UPDATE_REVIEW: (restaurantId: string) => `${BASE_URL}/reviews/add-review/${restaurantId}`, // POST
            DELETE_REVIEW: (restaurantId: string) =>
                `/reviews/delete-review/${restaurantId}`, // DELETE
        },
        FAVORITES: {
            TOGGLE: (id: string) => `${BASE_URL}/favorites/${id}`, // POST / DELETE (add to or remove rest from favorite list)
            GET_MY_FAVORITES: `${BASE_URL}/favorites`, // GET
        },
    },

    // --- Owner Dashboard ---
    OWNER: {
        MY_RESTAURANT: `${BASE_URL}/user/my/dashboard`, // GET
        CREATE_RESTAURANT: `${BASE_URL}/owner/restaurants`, // POST
        UPDATE_RESTAURANT: (id: string) => `${BASE_URL}restaurant-data/main-data/${id}`, // PUT
        DELETE_RESTAURANT: (id:string) => `${BASE_URL}restaurants/${id}`, // DELETE

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
        SETTINGS: `${BASE_URL}/admin/settings`,
        USERS: `${BASE_URL}/admin/users`,
        ALL_RESTAURANTS: `${BASE_URL}/admin/restaurants`,
        // REVIEWS_MODERATION: `${BASE_URL}/admin/reviews`,
        // SYSTEM_STATS: `${BASE_URL}/admin/system-stats`,
    },

    // --- Auth ---
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`, // POST
        REGISTER: `${BASE_URL}/auth/register`, // POST
        RESET_PASSWORD: `${BASE_URL}/auth/reset-password`, // POST
        FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`, // POST
        LOGOUT: `${BASE_URL}/auth/logout`,
    }
};