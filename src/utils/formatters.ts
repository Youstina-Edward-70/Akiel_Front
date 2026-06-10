import type { Address, OpeningHour } from "../types/RestaurantSchema";

export const formatTime = (timeStr: string | null | undefined): string => {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
};


export const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString('en-GB', {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
    });
};


export const formatAddress = (address?: Address): string => {
    if (!address) return "Not provided";
    const parts = [
        address.details,
        address.street,
        address.city,
        address.governorate
    ].filter(Boolean);

    return parts.length > 0 ? parts.join(", ") : "Not provided";
};

export const checkIfOpen = (openingHours: OpeningHour[]): boolean => {
    if (!openingHours || openingHours.length === 0) return false;

    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const todaySchedule = openingHours.find(
        (h) => (h.day as string).toLowerCase() === currentDay
    );

    if (!todaySchedule || todaySchedule.isClosed || !todaySchedule.opens || !todaySchedule.closes) {
        return false;
    }

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const parseTimeToMinutes = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const openMinutes = parseTimeToMinutes(todaySchedule.opens);
    const closeMinutes = parseTimeToMinutes(todaySchedule.closes);

    if (closeMinutes < openMinutes) {
        return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
    }

    return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
};

