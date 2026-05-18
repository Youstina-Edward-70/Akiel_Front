const UsersTableSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <tbody className="divide-y divide-gray-50">
                {[...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                        <td className="px-8 py-5">
                            <div className="w-10 h-10 bg-gray-100 rounded-full" />
                        </td>
                        <td className="px-6 py-5">
                            <div className="h-4 w-32 bg-gray-100 rounded-lg" />
                        </td>
                        <td className="px-6 py-5">
                            <div className="h-4 w-44 bg-gray-100 rounded-lg" />
                        </td>
                        <td className="px-6 py-5 flex justify-center">
                            <div className="h-6 w-16 bg-gray-100 rounded-full" />
                        </td>
                        <td className="px-8 py-5">
                            <div className="h-8 w-20 bg-gray-100 rounded-xl ml-auto" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default UsersTableSkeleton;
