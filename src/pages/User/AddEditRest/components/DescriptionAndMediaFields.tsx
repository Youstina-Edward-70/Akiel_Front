import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { RestaurantFormInput } from "../../../../types/RestaurantSchema";

interface Props {
    register: UseFormRegister<RestaurantFormInput>;
    errors: FieldErrors<RestaurantFormInput>;
    isEditMode: boolean;
}

const DescriptionAndMediaFields = ({ register, errors, isEditMode }: Props) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                <h2 className="text-xl font-heading font-bold text-text-primary">Description & Contact Info</h2>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Description</label>
                <textarea
                    rows={4}
                    placeholder="Tell us what makes your restaurant special..."
                    {...register("description")}
                    className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:border-primary text-sm resize-none transition-colors ${errors.description ? "border-danger focus:border-danger" : "border-border-light"
                        }`}
                />
                {errors.description && <p className="text-danger text-xs font-bold mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">Phone Number</label>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        {...register("phoneNumber")}
                        className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${errors.phoneNumber ? "border-danger focus:border-danger" : "border-border-light"
                            }`}
                    />
                    {errors.phoneNumber && <p className="text-danger text-xs font-bold mt-1">{errors.phoneNumber.message}</p>}
                </div>

                {!isEditMode &&
                    <div>
                        <label className="block text-sm font-semibold text-text-primary mb-2">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            {...register("email")}
                            className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${errors.email ? "border-danger focus:border-danger" : "border-border-light"
                                }`}
                        />
                        {errors.email && <p className="text-danger text-xs font-bold mt-1">{errors.email.message}</p>}
                    </div>
                }
                <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                        Whatsapp Number <span className="text-xs font-normal text-text-muted">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Whatsapp number"
                        {...register("whatsappNumber")}
                        className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${errors.whatsappNumber ? "border-danger focus:border-danger" : "border-border-light"
                            }`}
                    />
                    {errors.whatsappNumber && <p className="text-danger text-xs font-bold mt-1">{errors.whatsappNumber.message}</p>}
                </div>

                <div className={`${isEditMode ? "col-span-2" : ""}`}>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                        Facebook Link <span className="text-xs font-normal text-text-muted">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Facebook page URL"
                        {...register("facebookLink")}
                        className={`w-full px-4 py-3 bg-surface border rounded-xl focus:outline-none focus:border-primary text-sm transition-colors ${errors.facebookLink ? "border-danger focus:border-danger" : "border-border-light"
                            }`}
                    />
                    {errors.facebookLink && <p className="text-danger text-xs font-bold mt-1">{errors.facebookLink.message}</p>}
                </div>
            </div>
        </div>
    );
};

export default DescriptionAndMediaFields;