import { type OpeningHour } from "../../../../types/RestaurantSchema";

export const checkIfOpen = (openingHours: OpeningHour[]) => {
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