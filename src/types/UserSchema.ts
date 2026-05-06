import { z } from 'zod';

const addressSchema = z.object({
    governorate: z.string().optional().default(""),
    city: z.string().optional().default(""),
    street: z.string().optional().default(""),
    details: z.string().optional().default(""),
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
    rating: z.number().min(1).max(5),
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

    profile_pic: z.string()
        .nullable(),

    role: z.enum(['user', 'admin', 'owner'])
        .default('user'),

    favoritesCount: z.number().default(0),
    reviewsCount: z.number().default(0),
    isRestaurantOwner: z.boolean().default(false),

    address: addressSchema.optional(),

    Token: z.string().optional(),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

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

export const SignupSchema = z.object({
    fullname: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const ForgetSchema = z.object({
    email: z.string().email("Invalid email format"),
});

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
export type LoginFormValues = z.infer<typeof LoginSchema>;
export type SignupFormValues = z.infer<typeof SignupSchema>;
export type ForgetFormValues = z.infer<typeof ForgetSchema>;
export type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;
