import Link from "next/link";
import Image from "next/image";

export function UserNavbar() {
    return (
        <header className="sticky top-0 z-40 w-full bg-slate-50 border-b border-gray-100 shadow-sm">
            <div className="flex items-center justify-between h-20 px-6 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    {/* Ensure public/fullLogo.svg exists, or change the src */}
                    <Image src="/fullLogo.svg" alt="JobHunt Logo" width={140} height={60} />
                </Link>
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium font-sans">Home</Link>
                    <Link href="/jobs" className="text-blue-600 font-medium font-sans">Find Jobs</Link>
                    <Link href="/about" className="text-gray-600 hover:text-blue-600 font-medium font-sans">About Us</Link>
                    <Link href="/why-us" className="text-gray-600 hover:text-blue-600 font-medium font-sans">Why Us</Link>
                    <Link href="/contact" className="text-gray-600 hover:text-blue-600 font-medium font-sans">Contact Us</Link>
                </nav>
                <div>
                    <Link href="/apply" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors">
                        Apply Now
                    </Link>
                </div>
            </div>
        </header>
    );
}
