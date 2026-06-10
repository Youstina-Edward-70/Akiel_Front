import { useEditProfile } from "./useEditProfile";
import Button from "../../../ui/Button";

import ErrorEditProfile from "./components/ErrorEditProfile";
import SkeletonEditProfile from "./components/SkeletonEditProfile";

import Avatar from "./components/Avatar";
import BasicInfo from "./components/BasicInfo";
import AddressDetails from "./components/AddressDetails";

const EditProfile = () => {
    const {
        user,
        isLoading,
        error,

        avatarUrl,
        fileInputRef,
        handleAvatarChange,
        handleTriggerFileInput,
        isUploading,
        uploadError,

        form,
        isPending,
        onSubmit,
        navigate
    } = useEditProfile();

    const { register, formState: { errors } } = form;

    if (isLoading) {
        return <SkeletonEditProfile />
    }

    if (error) {
        return <ErrorEditProfile error={error} navigate={() => navigate(-1)} />
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-start">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Avatar */}
                <Avatar
                    avatarUrl={avatarUrl}
                    fullname={user?.fullname}
                    role={user?.role}
                    fileInputRef={fileInputRef}
                    handleAvatarChange={handleAvatarChange}
                    handleTriggerFileInput={handleTriggerFileInput}
                    isUploading={isUploading}
                    uploadError={uploadError}
                />

                <form onSubmit={onSubmit} className="space-y-6">

                    {/* Basic Information */}
                    <BasicInfo register={register} errors={errors} />

                    {/* Address Details */}
                    <AddressDetails register={register} errors={errors} />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            onClick={() => navigate(-1)}
                            variant="outline"
                            className="flex-1 px-12 py-4 rounded-full bg-white"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-12 py-4 rounded-full"
                        >
                            <span>{isPending ? "Saving..." : "Save Changes"}</span>
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default EditProfile
