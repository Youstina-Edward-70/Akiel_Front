import { IoTrashOutline } from "react-icons/io5";
import Button from "../../../../../ui/Button";

interface DangerZoneProps {
    onDeleteClick: () => void;
}

export const DangerZone = ({ onDeleteClick }: DangerZoneProps) => {
    return (
        <section className="pt-12 border-t border-red-50">
            <div className="bg-red-50/50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-red-100">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-red-600">Danger Zone</h3>
                    <p className="text-red-400 font-medium mt-1">
                        Once you delete a restaurant, there is no going back. Please be certain.
                    </p>
                </div>
                <Button
                    variant="danger"
                    onClick={onDeleteClick}
                    className="px-8 py-4 rounded-2xl text-sm"
                >
                    <IoTrashOutline className="text-xl" />
                    Delete Restaurant
                </Button>
            </div>
        </section>
    );
};