import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IoAddOutline } from "react-icons/io5";
import useRestaurantPhotos from "../../../hooks/useRestaurantPhotos";
import PhotoCard from "../../../ui/PhotoCard";
import ConfirmPopUp from "../../../../../ui/ConfirmPopUp";
import EmptyState from "../../../../../ui/EmptyState";
import { MdImageNotSupported } from "react-icons/md";
import Button from "../../../../../ui/Button";
import type { Image } from "../../../../../types/RestaurantSchema";

type RemoteImage = Exclude<Image, File | null | undefined>;

const RestaurantPhotos = ({ restaurantId, isOwner }: { restaurantId: string; isOwner: boolean }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [photoToDelete, setPhotoToDelete] = useState<RemoteImage | null>(null);

    const { photos, isLoading, uploadPhoto, deletePhoto, isDeleting } = useRestaurantPhotos(restaurantId);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const filesArray = Array.from(selectedFiles);
            uploadPhoto(filesArray);
            e.target.value = "";
        }
    };

    return (
        <div className="space-y-8">
            {/* Hidden Input */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                multiple
            />

            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-1.5 h-8 bg-primary rounded-full" />
                    <h2 className="text-2xl font-black text-text-primary tracking-tight">
                        Restaurant Photos
                    </h2>
                </div>

                {/* Add New Photo Button */}
                {isOwner && (
                    <Button
                        variant="primary"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="group p-4 rounded-full shadow-2xl flex items-center gap-0 hover:gap-2 transition-all duration-300"
                    >
                        <IoAddOutline className="text-3xl" />
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
                            Add New Photo
                        </span>
                    </Button>
                )}
            </div>

            {/* Photos Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                    {[...Array(3)].map((_, i) =>
                        <div key={i} className="h-64 bg-gray-100 rounded-3xl" />
                    )}
                </div>
            ) : photos.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {photos.filter((img): img is RemoteImage => !!img && !(img instanceof File)).map((img, index) => (
                            <PhotoCard
                                key={img._id}
                                img={img}
                                index={index}
                                isOwner={isOwner}
                                onDelete={() => setPhotoToDelete(img)}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                // Empty State
                <EmptyState
                    icon={MdImageNotSupported}
                    message="No photos shared yet."
                    subtitle={isOwner ? "Gallery is empty. Why not upload the first photo?" : "This restaurant hasn't shared any photos yet."}
                />
            )}

            {/* Delete Pop Up */}
            <ConfirmPopUp
                isOpen={!!photoToDelete}
                onClose={() => setPhotoToDelete(null)}
                onConfirm={() => photoToDelete &&
                    deletePhoto(photoToDelete._id, {
                        onSuccess: () => setPhotoToDelete(null)
                    })}
                isLoading={isDeleting}
                title="Delete Photo"
                message="Are you sure you want to delete this photo? This action cannot be undone."
                variant="danger"
            />
        </div>
    );
};

export default RestaurantPhotos;