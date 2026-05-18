import { z } from "zod";

export const settingsSchema = z.object({
    lowMax: z
        .number({ message: "Minimum price must be a number" })
        .min(0, "Price cannot be negative"),
    mediumMax: z
        .number({ message: "Average price must be a number" })
        .min(0, "Price cannot be negative"),
    maxRejectionLimit: z
        .number({ message: "Rejections count must be a number" })
        .min(1, "Must allow at least 1 rejection"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;