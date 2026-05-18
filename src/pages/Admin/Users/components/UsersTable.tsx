import { IoTrashOutline, IoCreateOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import type { AdminUserSummary } from "../../../../types/UserSchema";

interface UsersTableProps {
    users: AdminUserSummary[];
    isDeleting: boolean;
    onDeleteClick: (user: AdminUserSummary) => void;
}

const roleStyles: Record<string, string> = {
    admin: "bg-primary/10 text-primary",
    owner: "bg-orange-50 text-orange-500",
    user: "bg-indigo-50 text-indigo-500",
};

export const UsersTable = ({ users, isDeleting, onDeleteClick }: UsersTableProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-50">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-150">
                    <thead className="bg-gray-50">
                        <tr className="text-gray-400 text-[11px] uppercase tracking-[0.15em] font-bold">
                            <th className="px-8 py-6">Avatar</th>
                            <th className="px-6 py-6">Name</th>
                            <th className="px-6 py-6">Email</th>
                            <th className="px-6 py-6 text-center">Role</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <img
                                        src={user.profile_pic?.url ?? `https://ui-avatars.com/api/?name=${user.fullname}`}
                                        alt={user.fullname}
                                        className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
                                    />
                                </td>
                                <td className="px-6 py-5 font-bold text-text-primary text-sm">{user.fullname}</td>
                                <td className="px-6 py-5 text-sm text-text-secondary">{user.email}</td>
                                <td className="px-6 py-5 text-center">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize ${roleStyles[user.role] || roleStyles.user}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex justify-end gap-3">
                                        <Link
                                            to={`/admin/users/${user._id}`}
                                            className="p-2 text-secondary hover:bg-secondary/10 rounded-xl transition-all inline-flex items-center justify-center"
                                            title="Edit User"
                                        >
                                            <IoCreateOutline size={20} />
                                        </Link>
                                        <button
                                            onClick={() => onDeleteClick(user)}
                                            disabled={isDeleting}
                                            className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all active:scale-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                                            title="Delete User"
                                        >
                                            <IoTrashOutline size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
