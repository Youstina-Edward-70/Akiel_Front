import { z } from 'zod';
import { apiImageSchema, fileUploadSchema, type RestaurantCardProps } from './RestaurantSchema';

// Address Schema
const addressSchema = z.object({
    governorate: z.string().default(""),
    city: z.string().default(""),
    street: z.string().default(""),
    details: z.string().default(""),
});

// Favorite & Review Schemas
export const favoriteSchema = z.object({
    _id: z.string(),
    user: z.string(),
    restaurant: z.object({
        _id: z.string(),
        name: z.string().optional(),
        coverPhoto: apiImageSchema,
        rating: z.number().optional(),
        delivery: z.boolean().optional(),
        priceRange: z.string().optional(),
    }).or(z.string()),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export interface FavoriteItem {
    _id: string;
    restaurant: RestaurantCardProps;
    user: string;
    createdAt: string;
    updatedAt: string;
}

export const reviewSchema = z.object({
    _id: z.string().optional(),
    restaurant: z.string(),
    Content: z.string(),
    rating: z.number(),
    createdAt: z.string(),
    user: z.object({
        _id: z.string(),
        name: z.string(),
        profile: apiImageSchema,
    }),
});

export const reviewUserSchema = z.object({
    _id: z.string().optional(),
    restaurant: z.object({
        _id: z.string(),
        name: z.string(),
        coverPhoto: apiImageSchema,
        rating: z.number(),
    }),
    Content: z.string(),
    rating: z.number(),
    createdAt: z.string(),
});

export const reviewFormSchema = z.object({
    Content: z.string().min(3, "Comment is too short"),
    rating: z.number().min(1, "Please select at least 1 star").max(5),
});

// Main User Schema
export const userSchema = z.object({
    _id: z.string().optional(),
    id: z.string().optional(),

    fullname: z.string()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .trim(),

    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email format")
        .trim(),

    phone: z.string()
        .min(1, "Phone number is required")
        .min(11, "Phone number must be at least 11 digits")
        .trim(),

    profile_pic: apiImageSchema,

    role: z.enum(['user', 'admin', 'owner']).default('user'),

    favoritesCount: z.number().default(0),
    reviewsCount: z.number().default(0),
    isRestaurantOwner: z.boolean().default(false),

    address: addressSchema.default({
        details: "",
        street: "",
        city: "",
        governorate: ""
    }),

    Token: z.string().optional(),

    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

// Admin / Dashboard Schemas
export const adminUserSummarySchema = z.object({
    _id: z.string(),
    fullname: z.string(),
    email: z.string(),
    role: z.enum(['user', 'admin', 'owner']),
    profile_pic: apiImageSchema,
    phone: z.string().optional().nullable(),
    createdAt: z.string().optional(),
});

export const allUsersResponseSchema = z.object({
    message: z.string().optional(),
    data: z.array(adminUserSummarySchema),
    meta: z.object({
        pagesCount: z.number(),
        totalInDatabase: z.number(),
    }).optional(),
});

export const singleUserResponseSchema = z.object({
    message: z.string().optional(),
    Data: z.object({
        _id: z.string(),
        fullname: z.string(),
        email: z.string(),
        role: z.enum(['user', 'admin', 'owner']),
        profile_pic: apiImageSchema,
        phone: z.string().optional().nullable(),
        address: addressSchema.optional(),
        createdAt: z.string().optional(),
    }),
});

// Client Form Schema
export const updateAccountSchema = z.object({
    fullname: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),

    phone: z.string()
        .regex(/^(?:\+20|0020)?0?1[0125]\d{8}$/, "Phone number must be a valid Egyptian number")
        .optional()
        .or(z.literal("")),

    profile_pic: fileUploadSchema.or(apiImageSchema).optional(),

    address: z.object({
        details: z.string().optional(),
        street: z.string().optional(),
        city: z.string().optional(),
        governorate: z.string().optional(),
    }).optional(),
});

export const editUserSchema = updateAccountSchema.extend({
    role: z.enum(["admin", "owner", "user"]),
});

// Auth Schemas (Login / Register / Passwords)
export const LoginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format").trim(),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    remember: z.boolean().optional(),
});

export const RegisterSchema = z.object({
    fullname: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z.string().min(1, "Phone number is required").regex(/^(?:\+20|0020)?0?1[0125]\d{8}$/, "Phone number must be a valid Egyptian number"),
    password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const ForgetSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
});

export const ResetPasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
        .string()
        .min(8, { message: "Confirm password must be at least 8 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const ChangePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, { message: "Current password is required" }),
    newPassword: z
        .string()
        .min(8, { message: "New password must be at least 8 characters long" }),
    confirmPassword: z
        .string()
        .min(8, { message: "Please confirm your new password" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

// Types Export
export type User = z.infer<typeof userSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Favorite = z.infer<typeof favoriteSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type ReviewUser = z.infer<typeof reviewUserSchema>;
export type ReviewFormData = z.infer<typeof reviewFormSchema>;
export type AdminUserSummary = z.infer<typeof adminUserSummarySchema>;
export type SingleUserData = z.infer<typeof singleUserResponseSchema>["Data"];
export type UpdateAccountFormData = z.infer<typeof updateAccountSchema>;
export type EditUserFormData = z.infer<typeof editUserSchema>;

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type ForgetFormValues = z.infer<typeof ForgetSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;