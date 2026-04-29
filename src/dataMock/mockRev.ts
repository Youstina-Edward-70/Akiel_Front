import type {Review} from "../types/UserSchema"

export const MOCK_REVIEWS : Review[] = [
    {
        _id: "rev_123",
        restaurant: "1",
        Content: "Authentic taste and generous portions. The fried onions are perfectly crispy and the tomato sauce has just the right amount of spice. Highly recommended for anyone visiting Nasr City.",
        rating: 5,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        user: {
            _id: "u1",
            fullname: "Ahmed Hassan",
            profile_pic: "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=random",
        },
    },
    {
        _id: "rev_124",
        restaurant: "1",
        Content: "The interior is beautiful and very traditional. We tried the Hawawshi and it was delicious. Service was a bit slow due to the crowd, but the food made up for it.",
        rating: 4,
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        user: {
            _id: "u2",
            fullname: "Sarah Mansour",
            profile_pic: "",
        },
    },
    {
        _id: "rev_125",
        restaurant: "1",
        Content: "Authentic taste and generous portions. The fried onions are perfectly crispy and the tomato sauce has just the right amount of spice. Highly recommended for anyone visiting Nasr City.",
        rating: 3,
        createdAt: new Date(Date.now() - 902800000).toISOString(),
        user: {
            _id: "u1",
            fullname: "Mem Chou",
            profile_pic: "",
        },
    }
];