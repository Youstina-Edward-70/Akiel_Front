import { IoArrowBackOutline } from "react-icons/io5";
import { useSingleUser } from "./hooks/useSingleUser";
import Button from "../../../ui/Button";
import { SingleUserSkeleton } from "./components/oneUser/SingleUserSkeleton";
import { ErrorState } from "../ui/ErrorState";
import { UserAvatar } from "./components/oneUser/UserAvatar";
import { UserBasicInfoFields } from "./components/oneUser/UserBasicInfoFields";
import { UserAddressFields } from "./components/oneUser/UserAddressFields";

const EditSingleUser = () => {
    const { user, isLoading, error, form, isPending, onSubmit, goBack } = useSingleUser();

    const { register, control, formState: { errors } } = form;

    if (isLoading) return <SingleUserSkeleton />;
    if (error || !user) return <ErrorState onGoBack={goBack} errorInWhat="User" message="Failed to load user details." />;

    return (
        <div className="space-y-6 px-4 md:px-0">
            <UserAvatar user={user} />

            <form onSubmit={onSubmit}>
                <div className="bg-white rounded-2xl border border-gray-50 shadow-sm p-6 md:p-8 space-y-6">
                    <h2 className="text-lg font-black text-text-primary flex items-center gap-2 border-b border-gray-50 pb-3">
                        <span className="w-1 h-5 bg-primary rounded-full" />
                        Edit User Profile
                    </h2>

                    <UserBasicInfoFields register={register} errors={errors} control={control} />
                    <UserAddressFields register={register} />
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 md:p-5 rounded-2xl border border-gray-50 shadow-sm gap-4 mt-6">
                    <Button
                        type="button"
                        onClick={goBack}
                        variant="normal"
                        className="w-full sm:w-auto gap-2 py-2 text-sm font-bold text-text-secondary hover:text-text-primary duration-300"
                    >
                        <IoArrowBackOutline size={18} /> Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={isPending}
                        variant="primary"
                        className="w-full sm:w-auto gap-2 px-8 py-2.5 rounded-full text-sm"
                    >
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditSingleUser;
