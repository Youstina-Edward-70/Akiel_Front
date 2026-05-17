export interface RestaurantDetails {
    _id?: string;
    id?: string;
    name: string;
    image?: string;
    rating?: number | string;
}

export interface ReviewSubmitPayload {
    restaurantId: string;
    rating: number;
    content: string;
}
