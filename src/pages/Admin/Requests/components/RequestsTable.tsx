import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoEyeOutline } from "react-icons/io5";
import type { RequestSummary } from "../../../../types/RestaurantSchema";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/formatters";

interface RequestsTableProps {
    requests: RequestSummary[];
    maxLimit: number;
    isPending: boolean;
    onApprove: (id: string) => void;
    onRejectClick: (req: RequestSummary) => void;
}

export const RequestsTable = ({ requests, maxLimit, isPending, onApprove, onRejectClick }: RequestsTableProps) => {

    return (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-50">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-200">
                    <thead className="bg-gray-50">
                        <tr className="text-gray-400 text-[11px] uppercase tracking-[0.15em] font-bold">
                            <th className="px-8 py-6">Restaurant Name</th>
                            <th className="px-6 py-6">Owner</th>
                            <th className="px-6 py-6">Date Submitted</th>
                            <th className="px-6 py-6 text-center">Rejection Count</th>
                            <th className="px-8 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {requests.map((req) => {
                            const reqCover = req.coverPhoto instanceof File
                                ? "/images/default-rest.svg"
                                : req.coverPhoto?.url || "/images/default-rest.svg";
                            
                                return (
                                <tr key={req._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={reqCover}
                                                alt={req.name}
                                                className="w-12 h-12 rounded-2xl object-cover shadow-sm shrink-0 border border-gray-100"
                                            />
                                            <span className="font-bold text-text-primary text-sm">{req.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-text-secondary">{req.Owner.fullname}</td>
                                    <td className="px-6 py-5 text-sm text-text-secondary">{formatDate(req.createdAt)}</td>
                                    <td className="px-6 py-5 text-sm text-center">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${req.rejectionCount >= maxLimit-1 ? 'bg-red-50 text-red-500' : req.rejectionCount > 0 ? 'bg-orange-50 text-orange-500' : 'bg-gray-50 text-gray-400'}`}>
                                            {req.rejectionCount} / {maxLimit}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex justify-end gap-3">
                                            <button
                                                onClick={() => onApprove(req._id)}
                                                disabled={isPending}
                                                className="p-2 text-green-500 hover:bg-green-50 rounded-xl transition-all active:scale-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                                                title="Approve Restaurant"
                                            >
                                                <IoCheckmarkCircleOutline size={22} />
                                            </button>
                                            <button
                                                onClick={() => onRejectClick(req)}
                                                disabled={isPending}
                                                className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all active:scale-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                                                title="Reject Restaurant"
                                            >
                                                <IoCloseCircleOutline size={22} />
                                            </button>
                                            <Link
                                                to={`/admin/requests/${req._id}`}
                                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all inline-flex items-center justify-center"
                                                title="View Full Details"
                                            >
                                                <IoEyeOutline size={22} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};