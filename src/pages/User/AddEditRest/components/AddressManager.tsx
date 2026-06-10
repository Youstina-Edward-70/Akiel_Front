import { useFieldArray, type Control, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { FiPlus, FiX } from "react-icons/fi";
import type { RestaurantFormInput } from "../../../../types/RestaurantSchema";
import { LIMITS } from "../../../../types/constants";

type AddressField = RestaurantFormInput["address"][number];

interface Props {
    control: Control<RestaurantFormInput>;
    register: UseFormRegister<RestaurantFormInput>;
    errors: FieldErrors<RestaurantFormInput>;
}

const AddressManager = ({ control, register, errors }: Props) => {
    const { fields, append, remove } = useFieldArray<RestaurantFormInput, "address">({ control, name: "address" });

    const addressError = errors.address;
    const rootArrayError = Array.isArray(addressError)
        ? (addressError as { root?: { message?: string } }).root ?? null
        : addressError;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <label className="block text-sm font-semibold text-text-primary">Address (Branches)</label>
                    <p className="text-xs text-text-muted mt-0.5">Add at least one branch for the restaurant.</p>
                </div>
                {fields.length < LIMITS.BRANCHES && (
                    <button
                        type="button"
                        onClick={() => append({ details: "", street: "", city: "", governorate: "" })}
                        className="p-1.5 bg-primary text-white rounded-full hover:bg-primary-hover shadow-sm cursor-pointer transition-colors"
                    >
                        <FiPlus size={16} />
                    </button>
                )}
            </div>

            {rootArrayError && (
                <p className="text-danger text-xs bg-danger/10 p-3 rounded-xl border border-danger/20">
                    {rootArrayError.message as string}
                </p>
            )}

            {fields.map((field, index) => {
                const addressErrors = Array.isArray(errors.address)
                    ? (errors.address[index] as FieldErrors<AddressField> | undefined)
                    : undefined;

                return (
                    <div key={field.id} className="p-5 border border-border-light rounded-xl bg-surface relative space-y-4">
                        <div className="flex justify-between items-center border-b border-border-light/50 pb-2">
                            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                                Branch "{index + 1}"
                            </span>

                            {fields.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-1 text-text-muted hover:text-danger rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                    title="Remove branch"
                                >
                                    <FiX size={18} />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-1">Details</label>
                                <input
                                    type="text"
                                    placeholder="Enter additional details"
                                    {...register(`address.${index}.details`)}
                                    className="w-full px-3 py-2.5 bg-background border border-border-light rounded-lg text-sm focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-1">Street</label>
                                <input
                                    type="text"
                                    placeholder="Enter street name"
                                    {...register(`address.${index}.street`)}
                                    className={`w-full px-3 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:border-primary ${addressErrors?.street ? "border-danger focus:border-danger" : "border-border-light"
                                        }`}
                                />
                                {addressErrors?.street && (
                                    <p className="text-danger text-xs font-bold mt-1 pl-1">{addressErrors.street.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-1">City</label>
                                <input
                                    type="text"
                                    placeholder="Enter city"
                                    {...register(`address.${index}.city`)}
                                    className={`w-full px-3 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:border-primary ${addressErrors?.city ? "border-danger focus:border-danger" : "border-border-light"
                                        }`}
                                />
                                {addressErrors?.city && (
                                    <p className="text-danger text-xs font-bold mt-1 pl-1">{addressErrors.city.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-text-secondary mb-1">Governorate</label>
                                <input
                                    type="text"
                                    placeholder="Enter governorate"
                                    {...register(`address.${index}.governorate`)}
                                    className={`w-full px-3 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:border-primary ${addressErrors?.governorate ? "border-danger focus:border-danger" : "border-border-light"
                                        }`}
                                />
                                {addressErrors?.governorate && (
                                    <p className="text-danger text-xs font-bold mt-1 pl-1">{addressErrors.governorate.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AddressManager;