import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/api";
import {API_ENDPOINTS} from "../../lib/api";
import { Navigate } from "react-router-dom";

const MyRestaurant = (id: string) => {
const { data } = useQuery({
    queryKey: ['my-restaurant'],
    queryFn: async () => {
        axiosInstance.get(`/restaur
        ants/owner/${data._id}`) // endpoint for fetch owner Restaurant
    },
});

if (data) return <Navigate to={"/my-restaurant"} />;

    return (
        <div>MyRestaurant</div>
    )
}

export default MyRestaurant