import { useState, useRef, useEffect } from "react";
import { useController, type Control } from "react-hook-form";
import { IoChevronDownOutline, IoShieldCheckmarkOutline, IoStorefrontOutline, IoPersonOutline } from "react-icons/io5";
import type { EditUserFormData } from "../../../../../types/UserSchema";

type Role = "user" | "owner" | "admin";

const roleConfig: Record<Role, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
    user: {
        label: "User",
        icon: <IoPersonOutline size={16} />,
        color: "text-indigo-500",
        bg: "bg-indigo-50",
    },
    owner: {
        label: "Owner",
        icon: <IoStorefrontOutline size={16} />,
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    admin: {
        label: "Admin",
        icon: <IoShieldCheckmarkOutline size={16} />,
        color: "text-primary",
        bg: "bg-primary/10",
    },
};

interface RoleSelectProps {
    control: Control<EditUserFormData>;
}

export const RoleSelect = ({ control }: RoleSelectProps) => {
    const { field } = useController({ name: "role", control });
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const selected = roleConfig[field.value as Role] || roleConfig.user;

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className="space-y-1.5 relative md:col-span-1" ref={ref}>
            <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Role</label>

            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-primary/40 text-sm transition-all flex items-center justify-between"
            >
                <span className={`flex items-center gap-2 font-medium  ${selected.color}`}>
                    {selected.icon}
                    {selected.label}
                </span>
                <IoChevronDownOutline
                    size={15}
                    className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 z-20 w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    {(Object.entries(roleConfig) as [Role, typeof roleConfig[Role]][]).map(([key, config]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => {
                                field.onChange(key);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-50 ${field.value === key ? `${config.color} ${config.bg}` : "text-text-secondary"}`}
                        >
                            <span className={`p-1.5 rounded-lg ${config.bg} ${config.color}`}>
                                {config.icon}
                            </span>
                            {config.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
