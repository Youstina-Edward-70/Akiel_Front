import type { UseFormRegister, Path } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import type { RestaurantFormInput } from "../../../../types/RestaurantSchema";

interface Props {
    index: number;
    register: UseFormRegister<RestaurantFormInput>;
    issues?: Record<string, { message?: string }>;
    remove: () => void;
    canDelete: boolean;
}

const AddressCard = ({ index, register, issues, remove, canDelete }: Props) => (
    <div className="relative bg-background p-5 rounded-2xl border border-border-light shadow-sm">
        {canDelete && (
            <button type="button" onClick={remove} className="absolute top-4 right-4 text-text-muted hover:text-danger bg-surface hover:bg-danger/10 p-2 rounded-full transition">
                <FaTrash size={12} />
            </button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
                <input 
                    {...register(`address.${index}.governorate` as Path<RestaurantFormInput>)} 
                    placeholder="Governorate" 
                    className={`w-full bg-surface border rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary ${issues?.governorate ? 'border-danger' : 'border-border-light'}`} 
                />
                {issues?.governorate && <p className="text-danger text-[10px] mt-1">{issues.governorate.message}</p>}
            </div>
            <div>
                <input 
                    {...register(`address.${index}.city` as Path<RestaurantFormInput>)} 
                    placeholder="City / District" 
                    className={`w-full bg-surface border rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary ${issues?.city ? 'border-danger' : 'border-border-light'}`} 
                />
                {issues?.city && <p className="text-danger text-[10px] mt-1">{issues.city.message}</p>}
            </div>
            <div>
                <input 
                    {...register(`address.${index}.street` as Path<RestaurantFormInput>)} 
                    placeholder="Street Name" 
                    className={`w-full bg-surface border rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary ${issues?.street ? 'border-danger' : 'border-border-light'}`} 
                />
                {issues?.street && <p className="text-danger text-[10px] mt-1">{issues.street.message}</p>}
            </div>
            <input 
                {...register(`address.${index}.details` as Path<RestaurantFormInput>)} 
                placeholder="Details (Building, Floor...)" 
                className="w-full bg-surface border border-border-light rounded-xl p-3 outline-none focus:border-primary font-semibold text-text-primary" 
            />
        </div>
    </div>
);

export default AddressCard;