import Link from "next/link";
import { SettingsIcon, UserIcon } from "lucide-react";
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";
import { cn } from "@/lib/utils";

const routes = [
    {
        label: "Home",
        href: "/",
        icon: GoHome,
        activeIcon: GoHomeFill,
        isActive: true,
    },
    {
        label: "My Devices",
        href: "/devices",
        icon: GoCheckCircle,
        activeIcon: GoCheckCircleFill,
        isActive: false,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activeIcon: SettingsIcon,
        isActive: false,
    },
    {
        label: "Members",
        href: "/Members",
        icon: UserIcon,
        activeIcon: UserIcon,
        isActive: false,
    },
];

export const Navigation = () => {
    return (
        <ul className="flex flex-col">
            {routes.map((item) => {
                const isActive = false;
                const Icon = isActive ? item.activeIcon : item.icon;

                return (
                    <li key={item.href}>
                        <Link href={item.href} className="flex items-center gap-2">
                            <div className={cn(
                                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500"
                                , isActive && "bg-white-200 shadow-sm hover:opacity-100 text-primary")}>
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};