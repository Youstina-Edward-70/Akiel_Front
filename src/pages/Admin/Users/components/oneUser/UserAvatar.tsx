import type { SingleUserData } from "../../../../../types/UserSchema";

interface UserAvatarProps {
    user: SingleUserData;
}

const getAvatarUrl = (user: SingleUserData): string => {
    const pic = user.profile_pic;
    const fallback = `https://ui-avatars.com/api/?name=${user.fullname}`;
    if (!pic) return fallback;
    if (typeof pic === "object" && "url" in pic && pic.url) return pic.url;
    return fallback;
};

export const UserAvatar = ({ user }: UserAvatarProps) => (
    <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-gray-50 shadow-sm">
        <img
            src={getAvatarUrl(user)}
            alt={user.fullname}
            className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm shrink-0"
        />
        <div>
            <h1 className="text-xl font-black text-text-primary">{user.fullname}</h1>
            <p className="text-sm text-text-secondary">{user.email}</p>
        </div>
    </div>
);
