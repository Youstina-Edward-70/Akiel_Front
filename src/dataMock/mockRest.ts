import type { Restaurant, RestaurantCardProps } from "../types/RestaurantSchema";


export const restaurantsCard: RestaurantCardProps[] = [
    {
        _id: '1',
        name: 'El Prince',
        coverPhoto: { _id: "cp-1", url: "/images/default-rest.svg" },
        rating: 4.8,
        cuisineType: ['Grills', 'Egyptian'],
        priceRange: 'medium',
        delivery: true,
        openingHours: [
            { day: 'monday', opens: '12:00', closes: '23:00', isClosed: false },
            { day: 'tuesday', opens: '12:00', closes: '23:00', isClosed: false },
            { day: 'wednesday', opens: '12:00', closes: '23:00', isClosed: false },
            { day: 'thursday', opens: '12:00', closes: '02:00', isClosed: false },
            { day: 'friday', opens: '13:00', closes: '02:00', isClosed: false },
            { day: 'saturday', opens: '12:00', closes: '23:00', isClosed: false },
            { day: 'sunday', opens: '12:00', closes: '23:00', isClosed: false },
        ]
    },
    {
        _id: '2',
        name: "Zack's Burgers",
        coverPhoto: { _id: "cp-2", url: "" },
        rating: 4.5,
        cuisineType: ['Burgers', 'Fast Food'],
        priceRange: 'low',
        delivery: true,
        openingHours: [
            { day: 'monday', opens: '10:00', closes: '00:00', isClosed: false },
            { day: 'tuesday', opens: '10:00', closes: '00:00', isClosed: false },
            { day: 'wednesday', opens: '10:00', closes: '00:00', isClosed: false },
            { day: 'thursday', opens: '10:00', closes: '01:00', isClosed: false },
            { day: 'friday', opens: '10:00', closes: '01:00', isClosed: false },
            { day: 'saturday', opens: '10:00', closes: '00:00', isClosed: false },
            { day: 'sunday', opens: null, closes: null, isClosed: true },
        ]
    },
    {
        _id: '3',
        name: 'Buffalo Burger',
        coverPhoto: { _id: "cp-3", url: "/images/default-rest.svg" },
        rating: 4.2,
        cuisineType: ['Burgers', 'American'],
        priceRange: 'high',
        delivery: false,
        openingHours: [
            { day: 'monday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'tuesday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'wednesday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'thursday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'friday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'saturday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'sunday', opens: '09:00', closes: '23:00', isClosed: false },
        ]
    },
    {
        _id: '4',
        name: 'Falafel King',
        coverPhoto: { _id: "cp-4", url: "/images/default-rest.svg" },
        rating: 4.2,
        cuisineType: ['Burgers', 'American'],
        priceRange: 'high',
        delivery: false,
        openingHours: [
            { day: 'monday', opens: '23:00', closes: '9:00', isClosed: false },
            { day: 'tuesday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'wednesday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'thursday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'friday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'saturday', opens: '09:00', closes: '23:00', isClosed: false },
            { day: 'sunday', opens: '09:00', closes: '23:00', isClosed: false },
        ]
    }
];

export const MOCK_RESTAURANTS = [
    {
        _id: "1",
        name: "El Prince",
        email: "elprince@gmail.com",
        coverPhoto: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop",
        rating: 4.8,
        delivery: true,
        priceRange: "medium",
        reviewsCount: 20,
        facebookLink: "fb.com/elprince",
        cuisineType: ["Egyptian", "FastFood"],
        phoneNumber: "01012345678",
        whatsappNumber: "01012345678",

        // Description
        description:
"Experience the true essence of Egyptian hospitalityat El Prince, a culinary landmark dedicated to serving authentic, soul-warming flavors. Famous for its traditional cooking techniques and vibrant atmosphere, El Prince is the go-to destination for anyone seeking the best of Egyptian street-style delicacies and home-cooked comfort. From our signature Oxtail Tagines to our perfectly seasoned Mombar, every dish is crafted using fresh, local ingredients and our secret blend of spices. Whether you are dining in or ordering to your doorstep, we promise a meal that feels like home.",

        // Menu
        menu: [
            {
                _id: "m1",
                dishName: "Oxtail Tagine",
                price: 350,
                description: "Slow-baked in the oven with pearl onions and colorful bell peppers.",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
                category: "Food"
            },
            {
                _id: "m2",
                dishName: "Meat Foil",
                price: 280,
                description: "Premium local beef with seasonal vegetables and the special 'Prince' seasoning.",
                image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=2070&auto=format&fit=crop",
                category: "Drinks"
            },
            {
                _id: "m3",
                dishName: "Mombar",
                price: 120,
                description: "Hand-stuffed Egyptian sausages filled with a savory mix of rice and herbs.",
                image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop",
                category: "Desserts"
            },
            {
                _id: "m4",
                dishName: "Oxtail Tagine",
                price: 350,
                description: "Slow-baked in the oven with pearl onions and colorful bell peppers.",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
                category: "Food"
            },
            {
                _id: "m5",
                dishName: "Meat Foil",
                price: 280,
                description: "Premium local beef with seasonal vegetables and the special 'Prince' seasoning.",
                image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=2070&auto=format&fit=crop",
                category: "Drinks"
            },
            {
                _id: "m6",
                dishName: "Mombar",
                price: 120,
                description: "Hand-stuffed Egyptian sausages filled with a savory mix of rice and herbs.",
                image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop",
                category: "Desserts"
            },
            {
                _id: "m7",
                dishName: "Oxtail Tagine",
                price: 350,
                description: "Slow-baked in the oven with pearl onions and colorful bell peppers.",
                image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
                category: "Food"
            },
            {
                _id: "m8",
                dishName: "Meat Foil",
                price: 280,
                description: "Premium local beef with seasonal vegetables and the special 'Prince' seasoning.",
                image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=2070&auto=format&fit=crop",
                category: "Drinks"
            },
            {
                _id: "m9",
                dishName: "Mombar",
                price: 120,
                description: "Hand-stuffed Egyptian sausages filled with a savory mix of rice and herbs.",
                image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=2070&auto=format&fit=crop",
                category: "Desserts"
            }
        ],

        // Photos
        gallery: [
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1935&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1935&auto=format&fit=crop"
        ],

        // Addresses
        address: 
[
{
"governorate": "Cairo",
"city": "Imbaba",
"street": "Talaat Harb St.",
"details": "Near the old prince"
}
],

        openingHours:
            [
                { "day": "monday", "opens": "12:00", "closes": "23:00", "isClosed": false },
                { "day": "tuesday", "opens": "12:00", "closes": "23:00", "isClosed": false },
                { "day": "wednesday", "opens": "12:00", "closes": "23:00", "isClosed": false },
                { "day": "thursday", "opens": "2:00", "closes": "12:00", "isClosed": false },
                { "day": "friday", "opens": "3:00", "closes": "23:00", "isClosed": false },
                { "day": "saturday", "opens": "12:00", "closes": "23:00", "isClosed": false },
                { "day": "sunday", "opens": "12:00", "closes": "23:00", "isClosed": false }
            ],

        Owner: "user_123",
        status: "approved",
        createdAt: new Date("2024-01-01")
    }
] as unknown as Restaurant[];