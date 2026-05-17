import { NavLink } from "react-router-dom";
import { IoClipboardOutline, IoPeopleOutline, IoSettingsOutline } from "react-icons/io5";
import clsx from "clsx";

const links = [
    { name: 'Requests', href: '/admin/requests', icon: IoClipboardOutline },
    { name: 'Users', href: '/admin/users', icon: IoPeopleOutline },
    { name: 'Settings', href: '/admin/settings', icon: IoSettingsOutline },
];

export default function NavLinks() {
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <NavLink
                        key={link.name}
                        to={link.href}
                        className={({ isActive }) => clsx(
                            "flex h-14 grow items-center justify-center gap-2 rounded-xl p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 transition-all duration-300",
                            {
                                "bg-primary/10 text-primary font-bold": isActive,
                                "text-text-secondary hover:bg-gray-100": !isActive,
                            }
                        )}
                    >
                        <LinkIcon size={22} className="shrink-0" />
                        <p className="hidden md:block">{link.name}</p>
                    </NavLink>
                );
            })}
        </>
    );
}