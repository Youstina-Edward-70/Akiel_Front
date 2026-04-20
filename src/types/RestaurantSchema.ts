import { z } from 'zod';
import {
  CuisineTypes,
  MenuCategories,
  PriceRanges,
  RestaurantStatuses,
  LIMITS,
} from "./constants.ts";

const addressSchema = z.object({
  governorate: z.string().min(1, "Governorate is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  details: z.string().optional().default(""),
});

const menuItemSchema = z.object({
  _id: z.string().optional(),
  dishName: z.string().min(1, "Dish name is required"),
  price: z.number().min(0, "Price must be positive"),
  description: z.string().nullable().default(null),
  image: z.string().url("Invalid dish image URL"),
  category: z.enum(MenuCategories),
});

const openingHoursSchema = z.object({
  _id: z.string().optional(),
  day: z.string(),
  opens: z.string().nullable().optional(),
  closes: z.string().nullable().optional(),
  isClosed: z.boolean().default(false),
}).refine((data) => {
  if (!data.isClosed) {
    return data.opens && data.closes;
  }
  return true;
}, {
  message: "Opens and closes time are required when restaurant is open",
  path: ["opens"]
});

export const restaurantSchema = z.object({
  _id: z.string(),
  name: z.string()
    .min(LIMITS.NAME_MIN, `Name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(LIMITS.NAME_MAX, `Name cannot exceed ${LIMITS.NAME_MAX} characters`),

  coverPhoto: z.object({
      url: z.string().url(),
      publicId: z.string()
    }).optional().nullable(),
  rating: z.number().min(0).max(5).default(0),
  delivery: z.boolean().default(false),
  priceRange: z.enum(PriceRanges),
  cuisineType: z.array(z.enum(CuisineTypes))
    .min(1, "Select at least one cuisine type")
    .max(LIMITS.CUISINE_TYPES, `Max ${LIMITS.CUISINE_TYPES} cuisine types allowed`),

  reviewsCount: z.number().default(0),
  status: z.enum(RestaurantStatuses).default('pending'),

  isFavorite: z.boolean().default(false),
  isOpen: z.boolean().default(false),
  serverTime: z.string().optional(),

  email: z.string().email("Invalid email address"),
  description: z.string()
    .min(LIMITS.DESCRIPTION_MIN, `Description must be at least ${LIMITS.DESCRIPTION_MIN} characters`)
    .max(LIMITS.DESCRIPTION_MAX, `Description cannot exceed ${LIMITS.DESCRIPTION_MAX} characters`),

  phoneNumber: z.string().min(10, "Invalid phone number"),
  facebookLink: z.string().url("Invalid Facebook URL").optional,
  whatsappNumber: z.string().min(10).nullable().optional(),

  menu: z.array(menuItemSchema)
    .max(LIMITS.MENU_ITEMS, `Max ${LIMITS.MENU_ITEMS} menu items allowed`)
    .default([]),

  gallery: z.array(z.string().url())
    .max(LIMITS.GALLERY_PHOTOS, `Max ${LIMITS.GALLERY_PHOTOS} photos allowed`)
    .default([]),

  address: z.array(addressSchema)
    .min(1, "At least one address/branch is required")
    .max(LIMITS.BRANCHES, `Max ${LIMITS.BRANCHES} branches allowed`),

  openingHours: z.array(openingHoursSchema).length(7, "Must provide hours for all 7 days"),

  Owner: z.string(),
  rejectionReason: z.string().optional(),
  createdAt: z.string().or(z.date()).optional(),
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export type OpeningHour = z.infer<typeof openingHoursSchema>;
export type MenuItem = z.infer<typeof menuItemSchema>;
export type Address = z.infer<typeof addressSchema>;

export interface RestaurantCardProps {
  _id: string;
  name: string;
  coverPhoto: { url: string; publicId: string } | null;
  rating: number;
  cuisineType: string[];
  priceRange: string;
  openingHours: OpeningHour[];
  delivery: boolean;
}