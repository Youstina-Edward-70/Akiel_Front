const RequestsTableSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-50">
                {[...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                        <td className="px-8 py-6"><div className="h-12 w-12 bg-gray-100 rounded-2xl"></div></td>
                        <td className="px-6 py-6"><div className="h-4 w-32 bg-gray-100 rounded-lg"></div></td>
                        <td className="px-6 py-6"><div className="h-4 w-24 bg-gray-100 rounded-lg"></div></td>
                        <td className="px-6 py-6"><div className="h-4 w-10 bg-gray-100 rounded-lg mx-auto"></div></td>
                        <td className="px-8 py-6"><div className="h-10 w-28 bg-gray-100 rounded-full ml-auto"></div></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default RequestsTableSkeleton;