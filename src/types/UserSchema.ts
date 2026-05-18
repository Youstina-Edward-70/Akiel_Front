import { z } from 'zod';

const addressSchema = z.object({
    governorate: z.string().default(""),
    city: z.string().default(""),
    street: z.string().default(""),
    details: z.string().default(""),
});

export const favoriteSchema = z.object({
    _id: z.string(),
    user: z.string(),
    restaurant: z.object({
        _id: z.string(),
        name: z.string().optional(),
        coverPhoto: z.object({
            url: z.string(),
            publicId: z.string(),
        }).optional(),
        rating: z.number().optional(),
        delivery: z.boolean().optional(),
        priceRange: z.string().optional(),
    }).or(z.string()),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

export const reviewSchema = z.object({
    _id: z.string().optional(),
    restaurant: z.string(),
    Content: z.string().min(3, "Comment is too short"),
    rating: z.number().min(0).max(5),
    createdAt: z.string(),
    user: z.object({
        _id: z.string(),
        name: z.string(),
        profile: z.string().optional(),
    }),
});

export const userSchema = z.object({
    _id: z.string().optional(),
    id: z.string().optional(),

    fullname: z.string()
        .min(2, "Name must be at least 2 characters")
        .trim(),

    email: z.string()
        .email("Invalid email format")
        .trim(),

    phone: z.string()
        .min(11, "Phone number must be at least 11 digits")
        .trim(),

    profile_pic: z.object({
        url: z.string(),
        publicId: z.string(),
        _id: z.string().optional(),
    }).nullable().default(null),

    role: z.enum(['user', 'admin', 'owner'])
        .default('user'),

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

// Admin Users Schemas
export const adminUserSummarySchema = z.object({
    _id: z.string(),
    fullname: z.string(),
    email: z.string(),
    role: z.enum(['user', 'admin', 'owner']),
    profile_pic: z.object({
        url: z.string(),
        publicId: z.string(),
        _id: z.string().optional(),
    }).nullable().optional(),
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
        profile_pic: z.object({
            url: z.string(),
            publicId: z.string(),
            _id: z.string().optional(),
        }).nullable().optional(),
        phone: z.string().optional().nullable(),
        address: addressSchema.optional(),
        createdAt: z.string().optional(),
    }),
});

export const editUserSchema = z.object({
    fullname: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
    role: z.enum(["admin", "owner", "user"]),
    address: z.object({
        details: z.string().optional(),
        street: z.string().optional(),
        city: z.string().optional(),
        governorate: z.string().optional(),
    }).optional(),
});

// Login schema
export interface LoginResponse {
    user: Omit<User, 'Token'>;
    Token: string;
    message?: string;
}

export const LoginSchema = z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    remember: z.boolean().optional(),
});

// Signup schema
export const SignupSchema = z.object({
    fullname: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().regex(/^(?:\+20|0020)?0?1[0125]\d{8}$/, "Phone number must be a valid Egyptian number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

// Forget Password Schema
export const ForgetSchema = z.object({
    email: z.string().email("Invalid email format"),
});

// Reset Password Schema
export const ResetPasswordSchema = z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().min(6, "OTP must be at least 6 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type User = z.infer<typeof userSchema>;
export type Address = z.infer<typeof addressSchema>;
export type Favorite = z.infer<typeof favoriteSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type AdminUserSummary = z.infer<typeof adminUserSummarySchema>;
export type SingleUserData = z.infer<typeof singleUserResponseSchema>["Data"];
export type EditUserFormData = z.infer<typeof editUserSchema>;

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type SignupFormValues = z.infer<typeof SignupSchema>;
export type ForgetFormValues = z.infer<typeof ForgetSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
