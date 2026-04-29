import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import DishCard from "./DishCard";
import { useAddMenu } from "./hooks/useAddMenu";

import AddMenuHeader from "./ui/AddMenuHeader";
import AddMenuFooter from "./ui/AddMenuFooter";

const AddMenuPage = () => {
    const { id: restaurantId } = useParams();

    const {
        register, fields, prepend, remove, handleSubmit,
        formState: { errors }, setValue, watch, saveMenu, isPending
    } = useAddMenu(restaurantId);

    return (
        <form onSubmit={handleSubmit((data) => saveMenu(data))} className="relative min-h-screen bg-surface pt-8 md:pt-10">
            <div className="mx-auto max-w-6xl px-4 md:px-8">

                {/* Header Section */}
                <AddMenuHeader onAdd={prepend} isPending={isPending} />

                {/* Dishes List */}
                <div className="space-y-6 pb-20">
                    <AnimatePresence initial={false}>
                        {fields.map((field, index) => (
                            <motion.div
                                key={field.id}
                                layout
                                initial={{ opacity: 0, y: -18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.2 }}
                            >
                                <DishCard
                                    index={index}
                                    register={register}
                                    errors={errors.dishes?.[index]}
                                    remove={() => remove(index)}
                                    setValue={setValue}
                                    watch={watch}
                                    canDelete={fields.length > 1}
                                    isSaving={isPending}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Footer / Save Button */}
            <AddMenuFooter totalItems={fields.length} isPending={isPending} />
        </form>
    );
};

export default AddMenuPage;