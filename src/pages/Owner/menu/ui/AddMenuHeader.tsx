import { IoAdd, IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import Button from "../../../../ui/Button";
import { MenuSchema } from "../../../../types/RestaurantSchema";
import { z } from "zod";

type DishInput = z.input<typeof MenuSchema>["dishes"][number];

interface AddMenuHeaderProps {
    onAdd: (data: DishInput) => void;
    isPending: boolean;
}

const AddMenuHeader = ({ onAdd, isPending }: AddMenuHeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="mb-8 flex items-center justify-between">
            <Button
                type="button"
                variant="normal"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary"
            >
                <IoArrowBackOutline size={16} />
                Back to Menu
            </Button>

            <Button
                type="button"
                onClick={() => onAdd({
                    id: nanoid(),
                    dishName: "",
                    price: "",
                    description: "",
                    category: "",
                    image: null,
                })}
                className="rounded-full px-6 py-3 text-sm font-bold"
                disabled={isPending}
            >
                <IoAdd size={20} className="mr-1" />
                Add New Dish
            </Button>
        </div>
    );
};

export default AddMenuHeader;