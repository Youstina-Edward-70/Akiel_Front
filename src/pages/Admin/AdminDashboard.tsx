import { Outlet } from "react-router-dom";
import Sidebar from "./ui/Sidebar";

export default function AdminDashboard() {
    return (
        <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-surface">
            <aside className="w-full md:w-72 flex-none border-b md:border-r border-gray-100 bg-white">                <Sidebar />
            </aside>

            <main className="flex-1 overflow-y-auto p-4 md:p-10">
                <Outlet />
            </main>
        </div>
    );
}