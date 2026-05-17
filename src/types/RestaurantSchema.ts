import { z } from 'zod';
import {
  CuisineTypes,
  MenuCategories,
  PriceRanges,
  RestaurantStatuses,
  LIMITS,
} from "./constants";

const imageSchema = z.union([
  z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
      message: "Must select image only (JPG, PNG, etc...)",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Image size must be less than 5MB",
    }),
  z.object({
    url: z.string().url(),
    _id: z.string()
  })
]).nullable().refine(val => val !== null, "Image is required.");

const addressSchema = z.object({
  governorate: z.string().min(1, "Governorate is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  details: z.string().optional().default(""),
});

export const DishSchema = z.object({
  _id: z.string().optional(),
  id: z.string().optional(),
  dishName: z.string().min(1, "Dish name is required"),
  price: z.string()
    .min(1, "Price is required")
    .refine((val) => {
      const num = Number(val);
      if (isNaN(num) || num <= 0) return false;
      const decimalPart = val.split('.')[1];
      if (decimalPart) {
        return ["25", "5", "50"].includes(decimalPart);
      }
      return true;
    }, {
      message: "Price must be positive.",
    }),
  description: z.string().min(2, "Description must be at least 2 characters."),
  category: z.enum(MenuCategories).refine((val) => val !== "", {
  message: "Category must be selected",
}),
  image: imageSchema,
});

export interface DishIssues {
  name?: string;
  price?: string;
  description?: string;
  category?: string;
  image?: string;
}

export const MenuSchema = z.object({
  dishes: z.array(DishSchema)
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

const cuisineNames = CuisineTypes.map(c => c.name) as [string, ...string[]];

export const restaurantSchema = z.object({
  _id: z.string(),
  name: z.string()
    .min(LIMITS.NAME_MIN, `Name must be at least ${LIMITS.NAME_MIN} characters`)
    .max(LIMITS.NAME_MAX, `Name cannot exceed ${LIMITS.NAME_MAX} characters`),

  coverPhoto: imageSchema,
  rating: z.number().min(0).max(5).default(0),
  delivery: z.boolean().default(false),
  priceRange: z.enum(PriceRanges),
  cuisineType: z.array(z.enum(cuisineNames))
    .min(1, "Select at least one cuisine type")
    .max(LIMITS.CUISINE_TYPES, `Max ${LIMITS.CUISINE_TYPES} cuisine types allowed`),

  reviewsCount: z.number().default(0),
  status: z.enum(RestaurantStatuses).default('pending'),

  isFavorite: z.boolean().default(false),
  isOpen: z.boolean().default(false),
  serverTime: z.string().optional(),

  email: z.string().email("Invalid email address"),
  description: z.string()
    .min(LIMITS.DESCRIPTION_MIN, `Description must be at least ${LIMITS.DESCRIPTION_MIN} characters`),

  phoneNumber: z.string().min(10, "Invalid phone number"),
  facebookLink: z.string().url("Invalid Facebook URL").optional(),
  whatsappNumber: z.string().min(10).nullable().optional(),

  menu: z.array(DishSchema)
    .max(LIMITS.MENU_ITEMS, `Max ${LIMITS.MENU_ITEMS} menu items allowed`)
    .default([]),

  gallery: z.array(imageSchema)
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
export type MenuFormValues = z.infer<typeof MenuSchema>;
export type Dish = z.infer<typeof DishSchema>;
export type DishFieldValue = string | File | Image | null | undefined;
export type Address = z.infer<typeof addressSchema>;
export type Image = z.infer<typeof imageSchema>;

export const RestaurantFormSchema = z.object({
  name: z.string().min(LIMITS.NAME_MIN, `Name must be at least ${LIMITS.NAME_MIN} characters`),
  description: z.string().min(LIMITS.DESCRIPTION_MIN, `Description must be at least ${LIMITS.DESCRIPTION_MIN} characters`),
  phoneNumber: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  email: z.string().email("Invalid email address"),
  delivery: z.boolean().default(false),
  address: z.array(addressSchema).min(1, "At least one address is required"),
  openingHours: z.array(z.object({
      day: z.string(),
      opens: z.string().optional().nullable(),
      closes: z.string().optional().nullable(),
      isClosed: z.boolean().default(false)
  })).optional()
});

export type RestaurantFormInput = z.input<typeof RestaurantFormSchema>;