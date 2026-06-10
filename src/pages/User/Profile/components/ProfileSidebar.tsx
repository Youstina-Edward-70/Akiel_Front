import { IoLogOutOutline, IoTrashOutline } from "react-icons/io5";
import { ActionCard } from "./ActionCard";
import Button from "../../../../ui/Button";

interface ProfileSidebarProps {
    renderButtons: () => React.ReactNode;
    onLogout: () => void;
    onDelete: () => void;
}

export const ProfileSidebar = ({ renderButtons, onLogout, onDelete }: ProfileSidebarProps) => (
    <div className="space-y-4">
        {renderButtons()}
        <ActionCard title="Logout" subtitle="Securely sign out" icon={IoLogOutOutline} onClick={onLogout} color="text-text-primary" bg="bg-gray-100" />
        <Button variant="danger" className="w-full flex items-center justify-center gap-2 py-5 rounded-2xl" onClick={onDelete}>
            <IoTrashOutline size={18} /> Delete Account
        </Button>
    </div>
);