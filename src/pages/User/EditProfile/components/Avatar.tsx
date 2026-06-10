import { IoAlertCircleOutline, IoCameraOutline, IoCloudUploadOutline } from 'react-icons/io5';
import Button from '../../../../ui/Button'

interface AvatarProps {
    avatarUrl?: string;
    fullname?: string;
    role?: string;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleTriggerFileInput: () => void;
    isUploading: boolean;
    uploadError: string | null;
};

const Avatar = ({
    avatarUrl,
    fullname,
    role,
    fileInputRef,
    handleAvatarChange,
    handleTriggerFileInput,
    isUploading,
    uploadError,
}: AvatarProps) => {
    return (
        <div className="flex flex-col items-center text-center space-y-3">
            <div className="relative group">
                <img
                    src={avatarUrl}
                    alt={fullname}
                    className={`w-24 h-24 md:w-30 md:h-30 rounded-full object-cover border-2 border-gray-100 shadow-xl shrink-0 transition-opacity ${isUploading ? 'opacity-50' : 'opacity-100'}`}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={isUploading}
                />

                <Button
                    type="button"
                    onClick={handleTriggerFileInput}
                    disabled={isUploading}
                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full flex items-center justify-center"
                >
                    {isUploading ? (
                        <IoCloudUploadOutline className="text-sm animate-bounce" />
                    ) : (
                        <IoCameraOutline className="text-sm" />
                    )}
                </Button>
            </div>

            {uploadError && (
                <p className="text-xs text-danger font-medium bg-red-50 px-3 py-1 rounded-full flex items-center gap-1">
                    <IoAlertCircleOutline /> {uploadError}
                </p>
            )}

            <div>
                <h2 className="text-2xl font-black text-text-primary">
                    {fullname}
                </h2>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-0.5">
                    {role}
                </p>
            </div>
        </div>
    );
}

export default Avatar
