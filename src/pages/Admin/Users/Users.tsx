import { useUsersData } from "./hooks/useUsersData";
import { UsersHeader } from "./components/UsersHeader";
import { UsersTable } from "./components/UsersTable";
import UsersTableSkeleton from "./components/UsersTableSkeleton";
import EmptyState from "../../../ui/EmptyState";
import { Pagination } from "../../../features/search/Pagination";
import Search from "../../../features/search/Search";
import ConfirmPopUp from "../../../ui/ConfirmPopUp";
import { IoPeopleOutline } from "react-icons/io5";

const Users = () => {
    const {
        users,
        totalPages,
        totalUsers,
        isLoading,
        isError,
        isDeleting,
        refetch,
        userToDelete,
        showDeleteModal,
        handleDeleteClick,
        confirmDelete,
        closeModals,
    } = useUsersData();

    return (
        <div className="space-y-8 relative">
            <UsersHeader total={totalUsers} isLoading={isLoading} />

            {/* Search */}
            <Search
                placeholder="Search for users..."
                pageParamName="page"
            />

            {isLoading ? (
                <UsersTableSkeleton />
            ) : isError ? (
                <div className="flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-50 p-20 gap-4 text-center">
                    <p className="text-text-primary font-bold text-lg">Failed to load users</p>
                    <p className="text-text-secondary text-sm">Please check your connection and try again.</p>
                    <button
                        onClick={() => refetch()}
                        className="mt-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            ) : users.length === 0 ? (
                <EmptyState
                    icon={IoPeopleOutline}
                    message="No users found"
                    subtitle="Try a different search term"
                />
            ) : (
                <>
                    <UsersTable
                        users={users}
                        isDeleting={isDeleting}
                        onDeleteClick={handleDeleteClick}
                    />
                    <Pagination totalPages={totalPages} />
                </>
            )}

            <ConfirmPopUp
                isOpen={showDeleteModal}
                onClose={closeModals}
                onConfirm={confirmDelete}
                title="Delete User"
                message={`Are you sure you want to delete "${userToDelete?.fullname}"? This action cannot be undone.`}
                isLoading={isDeleting}
                variant="danger"
            />
        </div>
    );
};

export default Users;
