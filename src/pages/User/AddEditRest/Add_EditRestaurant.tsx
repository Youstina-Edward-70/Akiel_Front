import { useNavigate } from "react-router-dom";
import Button from "../../../ui/Button";
import FormSkeleton from "./components/FormSkeleton";
import BasicInfoFields from "./components/BasicInfoFields";
import CuisineSelector from "./components/CuisineSelector";
import AddressManager from "./components/AddressManager";
import DescriptionAndMediaFields from "./components/DescriptionAndMediaFields";
import OpeningHoursSection from "./components/OpeningHoursSection";
import { useRestaurantForm } from "./useRestaurantForm";

const AddEditRestaurant = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        errors,
        control,
        watch,
        setValue,
        isSubmitting,
        onSubmit,
        isEditMode,
        selectedCuisines,
        watchOpeningHours,
        selectedDays,
        handleCuisineToggle,
        handleDayToggle,
        isLoadingDetails
    } = useRestaurantForm();

    return (
        <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto bg-background rounded-2xl shadow-sm p-8 pt-16">

                <div className="text-center pb-10 mb-10 border-b border-border-light">
                    <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                        {isEditMode ? "Edit Your Restaurant" : "Add Your New Restaurant"}
                    </h1>
                    <p className="text-text-secondary">
                        {isEditMode
                            ? "Update the details below to edit your restaurant's information. After review, the changes will go live."
                            : "Fill in the details below to add a restaurant to our directory. After review, it will go live."
                        }
                    </p>
                </div>

                {isLoadingDetails ? (
                    <FormSkeleton />
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                        {/* Basic Info Section */}
                        <BasicInfoFields
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                            isEditMode={isEditMode}
                        />

                        {/* Cuisine Selector */}
                        <div>
                            <CuisineSelector selectedCuisines={selectedCuisines} toggleCuisine={handleCuisineToggle} formIssues={errors} />
                        </div>

                        {/* Addresses Management */}
                        <AddressManager control={control} register={register} errors={errors} />

                        <hr className="border-border-light" />

                        {/* Description & Contact Media */}
                        <DescriptionAndMediaFields register={register} errors={errors} isEditMode={isEditMode} />

                        <hr className="border-border-light" />

                        {/* Opening Hours Section */}
                        <OpeningHoursSection
                            register={register}
                            errors={errors}
                            watchOpeningHours={watchOpeningHours}
                            selectedDays={selectedDays}
                            handleDayToggle={handleDayToggle}
                        />

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <Button type="button" variant="outline" className="py-3.5 rounded-xl font-bold text-sm" onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" isLoading={isSubmitting} disabled={isSubmitting} className="py-3.5 rounded-xl font-bold text-sm">
                                {isEditMode ? "Save Changes" : "Submit Restaurant"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddEditRestaurant;