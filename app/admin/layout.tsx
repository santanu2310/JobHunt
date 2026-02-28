"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NotificationProvider } from "./_components/notification";
import Image from "next/image";
import { logout } from "@/actions/auth";


type NavItem = {
    label: string;
    href: string;
    icon: React.ReactNode;
};

const navItems: NavItem[] = [
    {
        label: "Slider",
        href: "/admin/slider",
        icon: <i className="text-lg ri-flip-horizontal-fill"></i>
    },
    {
        label: "Job Managements",
        href: "/admin/jobs",
        icon: <i className="text-lg ri-certificate-2-line"></i>,
    },
    {
        label: "Media",
        href: "/admin/media",
        icon: <i className="text-lg ri-layout-fill"></i>,
    },
];


function AdminNavbar() {
    const [search, setSearch] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-18 px-6">
                {/* Logo */}
                <Link href="/admin" className="flex items-center gap-2 shrink-0">
                    <Image src="/fullLogo.svg" alt="Logo" width={140} height={60} />
                </Link>

                {/* Nav Links */}
                <nav className="flex items-center gap-1 ml-8">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-1.5 text-sm font-medium transition-colors px-2 py-1.5 rounded-md ${isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                                    }`}
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-3 ml-auto">
                    {/* Search */}
                    <div className="relative hidden md:flex items-center mr-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            className="pr-9 pl-4 py-2 text-sm border text-gray-800 border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-sm transition-all"
                        />
                        <i className="ri-search-line absolute right-3 text-gray-400 pointer-events-none"></i>
                    </div>

                    {/* Icon Buttons */}
                    <button
                        aria-label="Drafts"
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 14H11C11.2833 14 11.5208 13.9042 11.7125 13.7125C11.9042 13.5208 12 13.2833 12 13C12 12.7167 11.9042 12.4792 11.7125 12.2875C11.5208 12.0958 11.2833 12 11 12H5C4.71667 12 4.47917 12.0958 4.2875 12.2875C4.09583 12.4792 4 12.7167 4 13C4 13.2833 4.09583 13.5208 4.2875 13.7125C4.47917 13.9042 4.71667 14 5 14ZM5 11H15C15.2833 11 15.5208 10.9042 15.7125 10.7125C15.9042 10.5208 16 10.2833 16 10C16 9.71667 15.9042 9.47917 15.7125 9.2875C15.5208 9.09583 15.2833 9 15 9H5C4.71667 9 4.47917 9.09583 4.2875 9.2875C4.09583 9.47917 4 9.71667 4 10C4 10.2833 4.09583 10.5208 4.2875 10.7125C4.47917 10.9042 4.71667 11 5 11ZM5 8H13C13.2833 8 13.5208 7.90417 13.7125 7.7125C13.9042 7.52083 14 7.28333 14 7C14 6.71667 13.9042 6.47917 13.7125 6.2875C13.5208 6.09583 13.2833 6 13 6H5C4.71667 6 4.47917 6.09583 4.2875 6.2875C4.09583 6.47917 4 6.71667 4 7C4 7.28333 4.09583 7.52083 4.2875 7.7125C4.47917 7.90417 4.71667 8 5 8ZM4 18L1.7 20.3C1.38333 20.6167 1.02083 20.6875 0.6125 20.5125C0.204167 20.3375 0 20.025 0 19.575V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H11C11.2833 2 11.5208 2.09583 11.7125 2.2875C11.9042 2.47917 12 2.71667 12 3C12 3.28333 11.9042 3.52083 11.7125 3.7125C11.5208 3.90417 11.2833 4 11 4H2V17.125L3.15 16H18V9C18 8.71667 18.0958 8.47917 18.2875 8.2875C18.4792 8.09583 18.7167 8 19 8C19.2833 8 19.5208 8.09583 19.7125 8.2875C19.9042 8.47917 20 8.71667 20 9V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H4ZM17 6C16.1667 6 15.4583 5.70833 14.875 5.125C14.2917 4.54167 14 3.83333 14 3C14 2.16667 14.2917 1.45833 14.875 0.875C15.4583 0.291667 16.1667 0 17 0C17.8333 0 18.5417 0.291667 19.125 0.875C19.7083 1.45833 20 2.16667 20 3C20 3.83333 19.7083 4.54167 19.125 5.125C18.5417 5.70833 17.8333 6 17 6Z" fill="#333333" />
                            <path d="M20 3C20 4.65685 18.6569 6 17 6C15.3431 6 14 4.65685 14 3C14 1.34315 15.3431 0 17 0C18.6569 0 20 1.34315 20 3Z" fill="#E10000" />
                        </svg>

                    </button>

                    <button
                        aria-label="Notifications"
                        className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        {/* <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" /> */}
                        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 20C7.45 20 6.97917 19.8042 6.5875 19.4125C6.19583 19.0208 6 18.55 6 18H10C10 18.55 9.80417 19.0208 9.4125 19.4125C9.02083 19.8042 8.55 20 8 20ZM1 17C0.716667 17 0.479167 16.9042 0.2875 16.7125C0.0958333 16.5208 0 16.2833 0 16C0 15.7167 0.0958333 15.4792 0.2875 15.2875C0.479167 15.0958 0.716667 15 1 15H2V8C2 6.61667 2.41667 5.3875 3.25 4.3125C4.08333 3.2375 5.16667 2.53333 6.5 2.2V1.5C6.5 1.08333 6.64583 0.729167 6.9375 0.4375C7.22917 0.145833 7.58333 0 8 0C8.41667 0 8.77083 0.145833 9.0625 0.4375C9.35417 0.729167 9.5 1.08333 9.5 1.5V1.825C9.31667 2.19167 9.18333 2.56667 9.1 2.95C9.01667 3.33333 8.98333 3.725 9 4.125C8.83333 4.09167 8.67083 4.0625 8.5125 4.0375C8.35417 4.0125 8.18333 4 8 4C6.9 4 5.95833 4.39167 5.175 5.175C4.39167 5.95833 4 6.9 4 8V15H12V8.575C12.3 8.70833 12.6208 8.8125 12.9625 8.8875C13.3042 8.9625 13.65 9 14 9V15H15C15.2833 15 15.5208 15.0958 15.7125 15.2875C15.9042 15.4792 16 15.7167 16 16C16 16.2833 15.9042 16.5208 15.7125 16.7125C15.5208 16.9042 15.2833 17 15 17H1ZM14 7C13.1667 7 12.4583 6.70833 11.875 6.125C11.2917 5.54167 11 4.83333 11 4C11 3.16667 11.2917 2.45833 11.875 1.875C12.4583 1.29167 13.1667 1 14 1C14.8333 1 15.5417 1.29167 16.125 1.875C16.7083 2.45833 17 3.16667 17 4C17 4.83333 16.7083 5.54167 16.125 6.125C15.5417 6.70833 14.8333 7 14 7Z" fill="#333333" />
                            <path d="M17 4C17 5.65685 15.6569 7 14 7C12.3431 7 11 5.65685 11 4C11 2.34315 12.3431 1 14 1C15.6569 1 17 2.34315 17 4Z" fill="#E10000" />
                        </svg>

                    </button>

                    <div className="relative group">
                        <button
                            aria-label="Profile"
                            className="p-2 rounded-full flex items-center hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            {/* <UserCircle size={22} /> */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.85 15.1C4.7 14.45 5.65 13.9375 6.7 13.5625C7.75 13.1875 8.85 13 10 13C11.15 13 12.25 13.1875 13.3 13.5625C14.35 13.9375 15.3 14.45 16.15 15.1C16.7333 14.4167 17.1875 13.6417 17.5125 12.775C17.8375 11.9083 18 10.9833 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 10.9833 2.1625 11.9083 2.4875 12.775C2.8125 13.6417 3.26667 14.4167 3.85 15.1ZM10 11C9.01667 11 8.1875 10.6625 7.5125 9.9875C6.8375 9.3125 6.5 8.48333 6.5 7.5C6.5 6.51667 6.8375 5.6875 7.5125 5.0125C8.1875 4.3375 9.01667 4 10 4C10.9833 4 11.8125 4.3375 12.4875 5.0125C13.1625 5.6875 13.5 6.51667 13.5 7.5C13.5 8.48333 13.1625 9.3125 12.4875 9.9875C11.8125 10.6625 10.9833 11 10 11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z" fill="#333333" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 top-full pt-1 w-40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <div className="bg-white border border-gray-100 rounded-lg shadow-lg py-1">
                                <button
                                    onClick={async () => {
                                        await logout();
                                        router.push("/login");
                                    }}
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                                >
                                    <i className="ri-logout-box-r-line mr-2 text-lg"></i>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <NotificationProvider>
                <AdminNavbar />
                <main className="p-6">{children}</main>
            </NotificationProvider>
        </div>
    );
}
