"use client";

import { useState } from "react";
import Link from "next/link";
import {
    LayoutTemplate,
    Briefcase,
    ChevronDown,
    Image as ImageIcon,
    Search,
    FileEdit,
    Bell,
    UserCircle,
} from "lucide-react";

type NavItem = {
    label: string;
    href?: string;
    icon: React.ReactNode;
    children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
    {
        label: "Slider",
        href: "/admin/slider",
        icon: <LayoutTemplate size={18} />,
    },
    {
        label: "Job Managements",
        icon: <Briefcase size={18} />,
        children: [
            { label: "All Jobs", href: "/admin/jobs" },
            { label: "Add Job", href: "/admin/jobs/add" },
            { label: "Categories", href: "/admin/jobs/categories" },
        ],
    },
    {
        label: "Media",
        icon: <ImageIcon size={18} />,
        children: [
            { label: "All Media", href: "/admin/media" },
            { label: "Upload", href: "/admin/media/upload" },
        ],
    },
];

function NavDropdown({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-1.5 rounded-md hover:bg-blue-50"
            >
                {item.icon}
                {item.label}
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-lg shadow-lg z-50 py-1">
                    {item.children?.map((child) => (
                        <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            {child.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

function AdminNavbar() {
    const [search, setSearch] = useState("");

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Logo */}
                <Link href="/admin" className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-col leading-none">
                        <span className="text-2xl font-extrabold text-blue-700 tracking-tight font-sans">
                            <span className="inline-flex items-center gap-0.5">
                                <svg
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="text-blue-600"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                jobhunt
                            </span>
                        </span>
                        <span className="text-[10px] text-gray-400 leading-tight tracking-wide">
                            Powered By Reboot AI
                        </span>
                    </div>
                </Link>

                {/* Nav Links */}
                <nav className="flex items-center gap-1 ml-8">
                    {navItems.map((item) =>
                        item.children ? (
                            <NavDropdown key={item.label} item={item} />
                        ) : (
                            <Link
                                key={item.label}
                                href={item.href!}
                                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors px-2 py-1.5 rounded-md hover:bg-blue-50"
                            >
                                {item.icon}
                                {item.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-3 ml-auto">
                    {/* Search */}
                    <div className="relative hidden md:flex items-center">
                        <Search
                            size={15}
                            className="absolute left-3 text-gray-400 pointer-events-none"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                            className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-44 transition-all"
                        />
                    </div>

                    {/* Icon Buttons */}
                    <button
                        aria-label="Drafts"
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <FileEdit size={20} />
                    </button>

                    <button
                        aria-label="Notifications"
                        className="relative p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>

                    <button
                        aria-label="Profile"
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <UserCircle size={22} />
                    </button>
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
            <AdminNavbar />
            <main className="p-6">{children}</main>
        </div>
    );
}
