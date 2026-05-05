import { useEditDish } from "./hooks/useEditDish";
import DishCard from "./DishCard";
import Button from "../../../ui/Button";
import EditDishSkeleton from "./ui/EditDishSkeleton";

const EditDishPage = () => {
    const { existingDish, isLoading, isPending, form, updateDish, navigate } = useEditDish();
    const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

    if (isLoading) return <EditDishSkeleton />;

    return (
        <form onSubmit={handleSubmit((data) => updateDish(data))} className="min-h-screen bg-surface px-4 py-10 md:px-8">
            <div className="mx-auto max-w-6xl space-y-8 px-4 md:px-8">
                <h1 className="text-2xl font-bold text-text-primary">Edit Menu Item</h1>

                <DishCard
                    index={0}
                    title={`Editing: ${existingDish?.dishName || "Dish"}`}
                    register={register}
                    errors={errors.dishes?.[0]}
                    remove={() => { }}
                    setValue={setValue}
                    watch={watch}
                    canDelete={false}
                    isSaving={isPending}
                />

                <div className="flex justify-end w-full md:w-auto gap-4">
                    <Button type="button" variant="normal"
                        onClick={() => navigate(-1)}
                        className="w-full md:w-auto border border-gray-200 rounded-full px-12 py-4 text-base font-bold shadow-lg shadow-text-muted/10">
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}
                        className="w-full md:w-auto rounded-full px-12 py-4 text-base font-bold shadow-lg shadow-primary/20">
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default EditDishPage;